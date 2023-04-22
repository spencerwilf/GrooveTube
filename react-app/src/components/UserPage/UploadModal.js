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


    const submitVideo = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('video', video)
        formData.append('title', title)
        formData.append('category', category)
        formData.append('description', description)
        formData.append('thumbnail', thumbnail)

        const res = dispatch(createVideoThunk(formData))
    }

  return (
    <div>
          <form
              encType='multipart/form-data'
              onSubmit={submitVideo}
          >

            <input
            type='file'
            onChange={(e) => setVideo(e.target.files[0])}
            accept='video/*'
            />
            <input
            type='file'
            onChange={(e) => setThumbnail(e.target.files[0])}
            accept='image/*'
            />
            <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            />
            <input
            type='text'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            />
            <input
            type='text'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            />
          <button type='submit'>Submit</button>
          </form>
    </div>

  )
}

export default UploadModal
