import distanceToNow from '../../lib/dateRelative'
import CommentReply from '../../public/images/comment-reply.svg'

function Comment({
  comment,
  comments,
  replyID,
  setReplyID,
  textareaRef,
  isAuthor,
  isAdmin,
  onDelete,
}) {
  return (
    <div className="flex flex-col">
      <div
        key={comment.created_at}
        className={
          'flex space-x-4 py-3 px-2 w-full border-b ' +
          (replyID?.id === comment.id
            ? 'bg-gray-200 transition ease-in-out duration-300'
            : '')
        }
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
                className="text-gray-400 hover:text-red-500 hover:scale-150  transition ease-out duration-300"
                onClick={() => onDelete(comment)}
                aria-label="Close"
              >
                x
              </button>
            )}
          </div>

          <p className="break-words">{comment.text}</p>
          <button
            type="button"
            onClick={() => {
              setReplyID({ id: comment.id, name: comment.user.name })
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
      {comment.replies
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
              />
            ))
        : ''}
    </div>
  )
}

export default Comment
