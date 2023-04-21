import React, { useState } from 'react'
import { useModal } from '../../context/Modal'
import { useDispatch } from 'react-redux'

const UploadModal = () => {

    const dispatch = useDispatch()
    const {closeModal} = useModal()
    const [video, setVideo] = useState()
    const [title, setTitle] = useState()
    const [description, setDescription] = useState()
    const [thumbnail, setThumbnail] = useState()


    const submitVideo = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('video', video)
        formData.append('title', title)
        formData.append('description', description)
        formData.append('thumbnail', thumbnail)
    }

  return (
    <div>
          <form
              encType='multipart/form-data'
          >

            <input
            type='file'
            onChange={(e) => setVideo(e.target.files[0])}
            accept='video/*'
            />
            
          </form>
    </div>

  )
}

export default UploadModal