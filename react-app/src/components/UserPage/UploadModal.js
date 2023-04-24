import React, { useEffect, useState } from 'react'
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
    const [mediaLoading, setMediaLoading] = useState(false)
    const [hasSubmitted, setHasSubmitted] = useState(false)


    // function validFiles(file) {
    //   const valid = /\.(gif|png|jpg|jpeg|mp4)$/i
    //   return valid.test(file)
    // }


  useEffect(() => {
    let errors = {}
    if (!video) errors.video = 'Video upload is required.'
    // if (validFiles(video) === false) errors.video = 'Please upload an mp4 file.'
    if (!thumbnail) errors.thumbnail = 'Thumbnail upload is required.'
    // if (validFiles(thumbnail) === false) errors.thumbnail = 'Please upload a png, jpeg, jpg or png file.'
    if (!title) errors.title = 'Video title is required.'
    setErrors(errors)
  }, [video, title, thumbnail, mediaLoading])

    const submitVideo = async (e) => {
        e.preventDefault()
        setHasSubmitted(true)
        if (Object.values(errors).length) return alert('Please fix errors before submitting.')

        const formData = new FormData()
        formData.append('video', video)
        formData.append('title', title)
        formData.append('category', category)
        formData.append('description', description)
        formData.append('thumbnail', thumbnail)



        const res = dispatch(createVideoThunk(formData))
        setMediaLoading(true)
        if (res.ok) {
          setHasSubmitted(false)
          setMediaLoading(false)
          await closeModal()
        }
    }

  return (
    <div className='upload-video-wrapper'>
      {mediaLoading && <h1>Video Uploading...</h1>}
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
          {hasSubmitted && errors.title && <p>{errors.title}</p>}
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
            {hasSubmitted && errors.video && <p>{errors.video}</p>}
            <label>Thumbnail File</label>
            <input
            type='file'
            onChange={(e) => setThumbnail(e.target.files[0])}
            accept='image/*'
            />
            {hasSubmitted && errors.thumbnail && <p>{errors.thumbnail}</p>}
          <button type='submit'>Submit</button>
          </form>
    </div>

  )
}

export default UploadModal
