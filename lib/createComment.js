import redis from './redis'
import { nanoid } from 'nanoid'
import getUser from './getUser'

export default async function createComments(req, res) {
  const { url, text, replyID } = req.body
  const { authorization } = req.headers

  if (!url || !text || !authorization) {
    return res.status(400).json({ message: 'Missing parameter.' })
  }

  try {
    // verify user token
    const user = await getUser(authorization)
    if (!user) return res.status(400).json({ message: 'Need authorization.' })

    const { name, picture, sub, email } = user

    if (replyID) {
      const rawComments = await redis.lrange(url, 0, -1)
      const comments = rawComments.map((c) => {
        const comment = JSON.parse(c)
        return comment
      })
      const oldParent = comments.find((comment) => comment.id === replyID.id)
      const comment = {
        id: nanoid(),
        created_at: Date.now(),
        url,
        text,
        user: { name, picture, sub, email },
        parentID: oldParent.id,
      }
      const newParent = { ...oldParent }
      if (oldParent.replies) {
        newParent.replies = [...newParent.replies, comment.id]
      } else {
        newParent.replies = [comment.id]
      }
      await redis.lrem(url, 0, JSON.stringify(oldParent))
      await redis.lpush(url, JSON.stringify(newParent))
      await redis.lpush(url, JSON.stringify(comment))
    } else {
      const comment = {
        id: nanoid(),
        created_at: Date.now(),
        url,
        text,
        user: { name, picture, sub, email },
      }

      // write data
      await redis.lpush(url, JSON.stringify(comment))
    }
    return res.status(200).json(comment)
  } catch (_) {
    return res.status(400).json({ message: 'Unexpected error occurred.' })
  }
}
