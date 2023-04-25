import React, { useDebugValue, useEffect, useState } from 'react'
import { useModal } from '../../context/Modal'
import { useDispatch, useSelector } from 'react-redux'
import { loadOneVideoThunk, deleteVideoThunk } from '../../store/videos'

const DeleteVideoModal = ({video}) => {
    const {closeModal} = useModal()
    const dispatch = useDispatch()
    

    useEffect(() => {
        dispatch(loadOneVideoThunk(video.id))
    }, [dispatch, video.id])

    const onSubmit = async (e) => {
        e.preventDefault()
        await dispatch(deleteVideoThunk(video.id))
        await closeModal()
    }

    const handleClose = async (e) => {
        e.preventDefault()
        await closeModal()
    }


  return (
      <div className='delete-comment-modal-wrapper'>
          <form className='delete-comment-modal-form' onSubmit={onSubmit}>
              <h2>Delete Video?</h2>
              <div className='delete-comment-modal-buttons'>
              <button type='submit'>Confirm</button>
              <button onClick={handleClose}>Exit</button>
              </div>
          </form>
      </div>
  )
}

export default DeleteVideoModal