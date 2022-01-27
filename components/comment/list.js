import distanceToNow from '../../lib/dateRelative'
import { useAuth0 } from '@auth0/auth0-react'
import CommentReply from '../../public/images/comment-reply.svg'
import Image from 'next/image'

function CommentList({ comments, onDelete }) {
  const { user } = useAuth0()

  return (
    <div className="space-y-6 mt-10">
      {comments &&
        comments.map((comment) => {
          const isAuthor = user && user.sub === comment.user.sub
          const isAdmin =
            user && user.email === process.env.NEXT_PUBLIC_AUTH0_ADMIN_EMAIL

          return (
            <div
              key={comment.created_at}
              className="flex space-x-4 w-full border-b"
            >
              <div className="flex-shrink-0">
                <img
                  src={comment.user.picture}
                  alt={comment.user.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </div>

              <div className="max-w-xl w-full grow">
                <div className="flex space-x-2">
                  <b>{comment.user.name}</b>
                  <time className="text-gray-400">
                    {distanceToNow(comment.created_at)}
                  </time>
                  {(isAdmin || isAuthor) && (
                    <button
                      className="text-gray-400 hover:text-red-500"
                      onClick={() => onDelete(comment)}
                      aria-label="Close"
                    >
                      x
                    </button>
                  )}
                </div>

                <p className="break-words">{comment.text}</p>
                <button className="">
                  {/* <Image
                    src={commentReply}
                    width={25}
                    height={25}
                    alt="reply to comment icon"
                    className="hover:fill-purple-500"
                  /> */}
                  <CommentReply
                    width={20}
                    height={20}
                    className="fill-black hover:fill-purple-500 hover:bg-gray-200 rounded-md"
                  />
                </button>
              </div>
            </div>
          )
        })}
    </div>
  )
}

export default CommentList
