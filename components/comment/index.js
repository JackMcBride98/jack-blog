import CommentForm from './form'
import CommentList from './list'
import useComments from '../../hooks/useComment'

function Comment() {
  const { text, setText, comments, onSubmit, onDelete } = useComments()

  console.log(comments)

  return (
    <div className="mt-20 pb-6">
      <CommentForm onSubmit={onSubmit} text={text} setText={setText} />
      <CommentList comments={comments} onDelete={onDelete} />
    </div>
  )
}

export default Comment
