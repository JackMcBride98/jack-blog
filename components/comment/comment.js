import distanceToNow from '../../lib/dateRelative'
import CommentReply from '../../public/images/comment-reply.svg'
import ReplyIcon from '../../public/images/reply-icon.svg'
import MinimiseIcon from '../../public/images/minimise-icon.svg'
import MaximiseIcon from '../../public/images/maximise-icon.svg'
import { useState } from 'react'

function Comment({
  comment,
  comments,
  replyID,
  setReplyID,
  textareaRef,
  isAuthor,
  isAdmin,
  onDelete,
  nestLevel,
}) {
  const [minimised, setMinimised] = useState(false)
  const nestMargin = [
    'ml-2 max-w-[99.2%] ',
    'ml-4 max-w-[98.6%] ',
    'ml-6 max-w-[97.8%] ',
    'ml-8 max-w-[97%] ',
  ]
  const nestWidth = [
    ' max-w-[80.2%] md:max-w-full',
    ' max-w-[75.2%] md:max-w-full',
    ' max-w-[70.2%] md:max-w-full',
    ' max-w-[65.2%] md:max-w-full',
  ]
  const nestFloor = (nestLevel <= 4 ? nestLevel : 4) - 1
  return (
    <div className="flex flex-col">
      {minimised ? (
        <div
          key={comment.created_at}
          className={
            'flex space-x-4 py-3 px-2 w-full border-b bg-gray-200 ' +
            (nestLevel && nestMargin[nestFloor])
          }
        >
          <button
            type="button"
            aria-label="Minimise"
            onClick={() => setMinimised(false)}
          >
            <MinimiseIcon
              width={20}
              height={20}
              className="fill-gray-700 mt-1 hover:scale-150  transition ease-out duration-300"
            />
          </button>
          <p className="font-light">{comment.user.name} + replies</p>
        </div>
      ) : (
        <div
          key={comment.created_at}
          className={
            'flex space-x-4 py-3 px-2 w-full border-b ' +
            (replyID?.id === comment.id
              ? 'bg-gray-200 transition ease-in-out duration-300 '
              : '') +
            (nestLevel ? nestMargin[nestFloor] : 'border-l')
          }
        >
          <div className="flex-shrink-0">
            <img
              src={comment.user.picture}
              alt={comment.user.name}
              className="rounded-full  w-7 h-7 md:w-10 md:h-10"
            />
          </div>

          <div className={'w-full grow' + nestWidth[nestFloor]}>
            <div className="flex  space-x-1 md:space-x-2 items-center">
              <b>{comment.user.name}</b>
              <time className="text-gray-400">
                {distanceToNow(comment.created_at)}
              </time>
              {nestLevel && nestLevel > 4 && (
                <ReplyIcon
                  width={20}
                  height={20}
                  className="fill-gray-400 rotate-90 scale-90"
                />
              )}
              {(isAdmin || isAuthor) && (
                <button
                  className="text-gray-400 hover:text-red-500 hover:scale-150  transition ease-out duration-300"
                  onClick={() => onDelete(comment)}
                  aria-label="Close"
                >
                  x
                </button>
              )}
              <button
                type="button"
                aria-label="Minimise"
                onClick={() => setMinimised(true)}
              >
                <MinimiseIcon
                  width={20}
                  height={20}
                  className="fill-gray-400 mt-1 hover:scale-150  transition ease-out duration-300"
                />
              </button>
            </div>

            <p className="break-words">{comment.text}</p>
            <button
              type="button"
              onClick={() => {
                setReplyID({
                  id: comment.id,
                  name: comment.user.name,
                  text: comment.text,
                })
                textareaRef.current.scrollIntoView()
              }}
            >
              <CommentReply
                width={20}
                height={20}
                className="fill-black hover:fill-purple-500 hover:bg-gray-200 hover:scale-125 rounded-md transition ease-out"
              />
            </button>
          </div>
        </div>
      )}

      {!minimised && comment.replies
        ? comment.replies
            .map((id) => comments.find((obj) => obj.id === id))
            .map((comment) => (
              <Comment
                comment={comment}
                comments={comments}
                replyID={replyID}
                setReplyID={setReplyID}
                textareaRef={textareaRef}
                onDelete={onDelete}
                isAuthor={isAuthor}
                isAdmin={isAdmin}
                key={comment.id}
                nestLevel={nestLevel ? nestLevel + 1 : 1}
              />
            ))
        : ''}
    </div>
  )
}

export default Comment
