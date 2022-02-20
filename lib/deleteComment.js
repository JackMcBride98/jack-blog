import redis from './redis'
import getUser from './getUser'

//TODO: manage deleting of all replies and their replies for a comment

export default async function deleteComments(req, res) {
  const { url, comment } = req.body
  const { authorization } = req.headers

  if (!url || !comment || !authorization) {
    return res.status(400).json({ message: 'Missing parameter.' })
  }

  try {
    // verify user token
    const user = await getUser(authorization)
    if (!user) return res.status(400).json({ message: 'Invalid token.' })
    comment.user.email = user.email

    const isAdmin = process.env.NEXT_PUBLIC_AUTH0_ADMIN_EMAIL === user.email
    const isAuthor = user.sub === comment.user.sub

    if (!isAdmin && !isAuthor) {
      return res.status(400).json({ message: 'Need authorization.' })
    }

    try {
      const rawComments = await redis.lrange(url, 0, -1)
      const comments = rawComments.map((c) => {
        const comment = JSON.parse(c)
        return comment
      })
      const commentToBeDeleted = comments.filter(
        (com) => com.id === comment.id
      )[0]
      if (commentToBeDeleted.parentID) {
        const parent = comments.find(
          (com) => com.id === commentToBeDeleted.parentID
        )
        await redis.lrem(url, 0, JSON.stringify(parent))
        const indexOfReply = parent.replies.indexOf(commentToBeDeleted.id)
        if (indexOfReply > -1) {
          parent.replies.splice(indexOfReply, 1)
        }
        await redis.lpush(url, JSON.stringify(parent))
      }
      await redis.lrem(url, 0, JSON.stringify(commentToBeDeleted))
      const repliesToDelete = [...commentToBeDeleted.replies]
      while (repliesToDelete.length > 0) {
        let id = repliesToDelete.pop()
        let replyToDelete = comments.find((com) => com.id === id)
        await redis.lrem(url, 0, JSON.stringify(replyToDelete))
        if (replyToDelete.replies?.length > 0) {
          repliesToDelete.push(...replyToDelete.replies)
        }
      }
    } catch (_) {
      return res.status(400).json({ message: 'Unexpected error occurred.' })
    }
    return res.status(200).json()
  } catch (err) {
    return res.status(400)
  }
}
// {"id":"aBr0GxMM-YD4aaSfHLPlA","created_at":1643629887354,"url":"http://localhost:3000/posts/bookReview","text":"not me","user":{"name":"Jack McBride","picture":"https://lh3.googleusercontent.com/a/AATXAJy0BEOTSBjR7V7AHPb5BDq8hLiq05UOjxxhylWD=s96-c","sub":"google-oauth2|107345322892548448419","email":"jack.mcbride.sihealth@gmail.com"}},{"id":"xdIcQSka9fW20vXLFlMJd","created_at":1643629868722,"url":"http://localhost:3000/posts/bookReview","text":"its me","user":{"name":"Jack McBride","picture":"https://lh3.googleusercontent.com/a-/AOh14Gj0wybSWYmw9XqwCRedF1VFiw4JZjTzH6l4TVu8CA=s96-c","sub":"google-oauth2|116991967235619668681","email":"mcbride.jack1@gmail.com"}}
