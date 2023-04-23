import React, { useDebugValue, useEffect, useState } from 'react'
import { useModal } from '../../context/Modal'
import { useDispatch, useSelector } from 'react-redux'
import { updateCommentThunk } from '../../store/comments'
import { getSingleCommentThunk } from '../../store/comments'

const EditCommentModal = ({comment, videoId}) => {
 const dispatch = useDispatch()
 const [commentContent, setCommentContent] = useState(comment.content)
 const {closeModal} = useModal()

// let videoComments = comments.filter(comment => comment.video_id == videoId)

 useEffect(()  => {
    dispatch(getSingleCommentThunk(comment.id))
 }, [dispatch, videoId, comment.id])


const updateComment = async (e) => {
    e.preventDefault()

    const payload = {
        id: comment.id,
        content: commentContent
    }

    comment.content = commentContent

    await dispatch(updateCommentThunk(payload))
    await closeModal()
}


  return (
    <div>
        <form onSubmit={updateComment}>
            <h2>Edit Comment</h2>
            <input
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
            />
            <button type='submit'>Save</button>
        </form>
    </div>
  )
}

export default EditCommentModal
