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
        <form className='edit-comment-form' onSubmit={updateComment}>
          <div>
            <h2 className='edit-comment-modal-header'>Edit Comment</h2>
            <textarea
            className='edit-comment-textarea'
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
            />
        </div>
            <button type='submit'>Save</button>
        </form>
    </div>
  )
}

export default EditCommentModal
