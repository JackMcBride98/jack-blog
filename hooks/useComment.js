import { useState, useEffect } from 'react'
import useSWR from 'swr'
import { useAuth0 } from '@auth0/auth0-react'

export default function useComments() {
  const { getAccessTokenSilently } = useAuth0()
  const [text, setText] = useState('')
  const [replyID, setReplyID] = useState(false)
  const [url, setUrl] = useState(null)

  const fetcher = (...args) => fetch(...args).then((res) => res.json())

  const { data: comments, mutate } = useSWR(() => {
    const query = new URLSearchParams({ url })

    return `/api/comment?${query.toString()}`
  }, fetcher)

  useEffect(() => {
    const url = window.location.origin + window.location.pathname
    setUrl(url)
  }, [])

  const onSubmit = async (e) => {
    e.preventDefault()
    setReplyID(null)
    const token = await getAccessTokenSilently()

    try {
      await fetch('/api/comment', {
        method: 'POST',
        body: JSON.stringify({ url, text, replyID }),
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
      })
      setText('')
      await mutate()
    } catch (err) {
      console.log(err)
    }
  }

  const onDelete = async (comment) => {
    const token = await getAccessTokenSilently()

    try {
      await fetch('/api/comment', {
        method: 'DELETE',
        body: JSON.stringify({ url, comment }),
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
      })
      await mutate()
    } catch (err) {
      console.log(err)
    }
  }

  return { text, setText, replyID, setReplyID, comments, onSubmit, onDelete }
}
