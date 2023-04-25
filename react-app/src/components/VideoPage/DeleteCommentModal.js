import React, {useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { useModal } from '../../context/Modal'
import { useState } from 'react'
import { deleteCommentThunk } from '../../store/comments'
import { getSingleCommentThunk } from '../../store/comments'

const DeleteCommentModal = ({comment, videoId }) => {
    const dispatch = useDispatch()
    const { closeModal } = useModal()

    useEffect(() => {
        dispatch(getSingleCommentThunk(comment.id))
    }, [dispatch, videoId, comment.id])


    const deleteComment = async (e) => {
        e.preventDefault()
        await dispatch(deleteCommentThunk(comment.id))
        await closeModal()
    }
    

    const handleClose = async (e) => {
        e.preventDefault()
        await closeModal()
    }


    return (
        <div className='delete-comment-modal-wrapper'>
            <form className='delete-comment-modal-form' onSubmit={deleteComment}>
                <h2>Delete Comment?</h2>
                <div className='delete-comment-modal-buttons'>
                <button type='submit'>Confirm</button>
                <button onClick={handleClose}>Exit</button>
                </div>
            </form>
        </div>
    )
}

export default DeleteCommentModal