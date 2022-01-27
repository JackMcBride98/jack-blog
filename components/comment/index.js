import CommentForm from './form'
import CommentList from './list'
import useComments from '../../hooks/useComment'
import { useState, useRef } from 'react'

function Comment() {
  const { text, setText, replyID, setReplyID, comments, onSubmit, onDelete } =
    useComments()
  const textareaRef = useRef()

  return (
    <div className="mt-4 pb-6">
      <CommentForm
        onSubmit={onSubmit}
        text={text}
        setText={setText}
        replyID={replyID}
        setReplyID={setReplyID}
        textareaRef={textareaRef}
      />
      <CommentList
        comments={comments}
        onDelete={onDelete}
        setReplyID={setReplyID}
        replyID={replyID}
        textareaRef={textareaRef}
      />
    </div>
  )
}

export default Comment
