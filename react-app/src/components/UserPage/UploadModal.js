import React, { useState } from 'react'
import { useModal } from '../../context/Modal'
import { useDispatch } from 'react-redux'
import { createVideoThunk } from '../../store/videos'

const UploadModal = () => {

    const dispatch = useDispatch()
    const {closeModal} = useModal()
    const [video, setVideo] = useState(null)
    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')
    const [thumbnail, setThumbnail] = useState(null)
    const [errors, setErrors] = useState({})




    const submitVideo = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('video', video)
        formData.append('title', title)
        formData.append('category', category)
        formData.append('description', description)
        formData.append('thumbnail', thumbnail)

        dispatch(createVideoThunk(formData))
        await closeModal()
    }

  return (
    <div className='upload-video-wrapper'>
          <form
              encType='multipart/form-data'
              onSubmit={submitVideo}
              className='upload-video-form'
          >

          <input
            type='text'
            placeholder='Video Title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            />

          <input
            type='text'
            placeholder='Video Description (optional)'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            />

          <input
            type='text'
            placeholder='Video Category (optional)'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            />
          <label>Video File</label>
            <input
            type='file'
            onChange={(e) => setVideo(e.target.files[0])}
            accept='video/*'
            />
            <label>Thumbnail File</label>
            <input
            type='file'
            onChange={(e) => setThumbnail(e.target.files[0])}
            accept='image/*'
            />
          <button type='submit'>Submit</button>
          </form>
    </div>

  )
}

export default UploadModal
