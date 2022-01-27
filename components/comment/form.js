import { useAuth0 } from '@auth0/auth0-react'

function CommentForm({
  text,
  setText,
  onSubmit,
  replyID,
  setReplyID,
  textareaRef,
}) {
  const { isAuthenticated, logout, loginWithPopup } = useAuth0()

  return (
    <form onSubmit={onSubmit}>
      <div ref={textareaRef} className="flex mb-1">
        <p className="p-2">{replyID ? 'Replying to ' + replyID.name : ''}</p>
        {replyID ? (
          <button
            type="button"
            className="py-1 px-1 bg-white hover:bg-gray-300 text-slate-300 hover:text-black rounded"
            onClick={() => setReplyID(null)}
          >
            (Cancel)
          </button>
        ) : (
          ''
        )}
      </div>

      <textarea
        className="flex w-full max-h-40 p-3 rounded resize-y bg-gray-200 text-gray-900 placeholder-gray-500"
        rows="2"
        placeholder={
          isAuthenticated
            ? 'What are your thoughts?'
            : 'Please login to leave a comment'
        }
        onChange={(e) => setText(e.target.value)}
        value={text}
        disabled={!isAuthenticated}
      />

      <div className="flex items-center mt-4">
        {isAuthenticated ? (
          <div className="flex items-center space-x-6">
            <button className="py-2 px-4 rounded bg-purple-600 text-white disabled:opacity-40 hover:bg-purple-700">
              Send
            </button>
            <button
              className="text-black bg-gray-200 hover:bg-gray-300 py-2 px-4 rounded"
              onClick={() => logout()}
            >
              Log out
            </button>
          </div>
        ) : (
          <button
            type="button"
            className="py-2 px-4 rounded bg-purple-600 text-white disabled:opacity-40 hover:bg-purple-700"
            onClick={() => loginWithPopup()}
          >
            Log In
          </button>
        )}
      </div>
    </form>
  )
}

export default CommentForm
