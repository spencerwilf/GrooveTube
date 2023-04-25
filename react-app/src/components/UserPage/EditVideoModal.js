import React, { useDebugValue, useEffect, useState } from 'react'
import { useModal } from '../../context/Modal'
import { useDispatch, useSelector } from 'react-redux'
import { updateVideoThunk } from '../../store/videos'
import { loadOneVideoThunk } from '../../store/videos'

const EditVideoModal = ({video}) => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState(video.title)
  const [description, setDescription] = useState(video.description)
  const [category, setCategory] = useState(video.category)
  const {closeModal} = useModal()

  useEffect(()  => {
    dispatch(loadOneVideoThunk(video.id))
 }, [dispatch, video.id])


 const updateVideo = async (e) => {
  e.preventDefault()

  const payload = {
      id: video.id,
      title,
      description,
      category
  }

  video.title = title
  video.description = description
  video.category = category

  await dispatch(updateVideoThunk(payload))
  await closeModal()
}

  return (
    <div className='edit-video-form-modal'>
        <form className='edit-video-form' onSubmit={updateVideo}>
            <h2 id='edit-modal-form-header'>Edit Video</h2>
            <div className='edit-modal-input-and-button-wrapper'>
            <div className='edit-modal-inputs-wrapper'>
            <input
            value={title}
            placeholder='Title'
            onChange={(e) => setTitle(e.target.value)}
            />
            <input
            value={description}
            placeholder='Description'
            onChange={(e) => setDescription(e.target.value)}
            />
            <input
            value={category}
            placeholder='Category'
            onChange={(e) => setCategory(e.target.value)}
            />
        </div>
            <button className='edit-video-modal-save-button' type='submit'>Save</button>
        </div>
        </form>
    </div>
  )
}

export default EditVideoModal
