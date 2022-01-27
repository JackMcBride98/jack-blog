import distanceToNow from '../../lib/dateRelative'
import { useAuth0 } from '@auth0/auth0-react'
import CommentReply from '../../public/images/comment-reply.svg'
import Image from 'next/image'
import Comment from './comment'

function CommentList({ comments, onDelete, setReplyID, replyID, textareaRef }) {
  const { user } = useAuth0()

  return (
    <div className="pt-10">
      {comments &&
        comments
          .filter((comment) => !comment.parent)
          .map((comment) => {
            const isAuthor = user && user.sub === comment.user.sub
            const isAdmin =
              user && user.email === process.env.NEXT_PUBLIC_AUTH0_ADMIN_EMAIL

            return (
              <Comment
                comment={comment}
                replyID={replyID}
                setReplyID={setReplyID}
                textareaRef={textareaRef}
                onDelete={onDelete}
                isAuthor={isAuthor}
                isAdmin={isAdmin}
              ></Comment>
            )
          })}
    </div>
  )
}

export default CommentList
