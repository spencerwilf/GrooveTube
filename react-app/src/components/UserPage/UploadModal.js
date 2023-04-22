import React, { useState } from 'react'
import { useModal } from '../../context/Modal'
import { useDispatch } from 'react-redux'
import { createVideoThunk } from '../../store/videos'

const UploadModal = ({sessionUser}) => {

    const dispatch = useDispatch()
    const {closeModal} = useModal()
    const [video, setVideo] = useState()
    const [title, setTitle] = useState()
    const [description, setDescription] = useState()
    const [thumbnail, setThumbnail] = useState()


    const submitVideo = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('url', video)
        formData.append('title', title)
        formData.append('user_id', sessionUser?.id)
        formData.append('description', description)
        formData.append('thumbnail', thumbnail)

        dispatch(createVideoThunk(formData))
    }

  return (
    <div>
          <form
              encType='multipart/form-data'
              onSubmit={submitVideo}
          >
            <input
            placeholder='Title'
            />
            <input
            placeholder='Description'
            />
            <input
            placeholder='video'
            type='file'
            onChange={(e) => setThumbnail(e.target.files[0])}
            accept='image/*'
            />
            <input
            placeholder='thumbnail'
            type='file'
            onChange={(e) => setVideo(e.target.files[1])}
            accept='video/*'
            />
            <button type='submit'>Submit</button>
            
          </form>
    </div>

  )
}

export default UploadModal