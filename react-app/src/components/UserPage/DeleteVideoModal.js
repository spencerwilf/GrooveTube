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



  return (
      <div>
          <form onSubmit={onSubmit}>
              <h2>Delete Video?</h2>
              <button type='submit'>Confirm</button>
              {/* <button onClick={handleClose}>Exit</button> */}
          </form>
      </div>
  )
}

export default DeleteVideoModal