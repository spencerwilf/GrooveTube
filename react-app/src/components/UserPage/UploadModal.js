import React, { useEffect, useState } from 'react'
import { useModal } from '../../context/Modal'
import { useDispatch } from 'react-redux'
import { createVideoThunk } from '../../store/videos'
import UploadLoadingScreen from './UploadLoadingScreen'

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
    const [uploadScreen, setUploadScreen] = useState(true)
    // const [videoAttached, setVideoAttached] = useState(false)

    function validVideoFiles(file) {
      const valid = /\.(mp4)$/i
      return valid.test(file.name)
    }

  function validImageFiles(file) {
    const valid = /\.(gif|png|jpg|jpeg)$/i
    return valid.test(file.name)
  }

  // const thumbRender = (event) => {
  //   const uploadedFile = event.target.files[0];
  //   const reader = new FileReader();

  //   reader.onload = (event) => {
  //     setImageDataUrl(event.target.result);
  //   };

  //   reader.readAsDataURL(uploadedFile);
  // };

  useEffect(() => {
    let errors = {}
    if (!video) errors.video = 'Video upload is required.'
    
    if (video && validVideoFiles(video) === false) errors.video = 'Please upload an mp4 file.'
    if (!thumbnail) errors.thumbnail = 'Thumbnail upload is required.'
    // if (validFiles(thumbnail) === false) errors.thumbnail = 'Please upload a png, jpeg, jpg or png file.'
    if (!title.length) errors.title = 'Video title is required.'
    if (title.length > 100) errors.title = 'Title cannot be over 100 characters.'
    if (description.length > 250) errors.description = 'Description cannot be over 250 characters.'
    if (category.length > 100) errors.category = 'Category cannot be over 100 characters.'

    if (video && !errors.video) setUploadScreen(false)
    setErrors(errors)
  }, [video, title, thumbnail, mediaLoading, category.length, description.length, uploadScreen])

// console.log(video)
// console.log(video.name.split('.')[1] === 'mp4')
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


        setMediaLoading(true)
        const res = await dispatch(createVideoThunk(formData))
        await closeModal()

        if (res.ok) {
          setHasSubmitted(false)
          setMediaLoading(false)
          return
        }
    }


    if (mediaLoading) {
      return <UploadLoadingScreen/>
    }



  return (
    <div className='upload-video-wrapper'>
      <h2 className='upload-video-text-header'>Upload video</h2>
      <form
        encType='multipart/form-data'
        onSubmit={submitVideo}
        className='upload-video-form'
      >
      {uploadScreen ? (
        <div className='upload-modal-file-step-wrapper'>
          <div className='upload-video-main-input-div'>
            <i id='modal-download-logo' class="fa-solid fa-upload"></i>
            <input
            id='fileInput'
            type='file'
            onChange={(e) => setVideo(e.target.files[0])}
            accept='video/*'
            />
            <p id='select-vid-file-to-upload'>Select video file to upload</p>
              <p id='your-details-will-be-private'>Your videos will be private until you publish them.</p>
              {video && errors.video && <p id='video-upload-error'><i class="fa-solid fa-triangle-exclamation"></i>{errors.video}</p>}
            <label htmlFor="fileInput" className="custom-file-input">
              SELECT FILE
            </label>
            </div>    
          </div>
      ) : (
        <>
            <div className='upload-modal-input-wrapper'>
              <h2>Details</h2>
              {/* <span>{thumbnail && <img src={thumbnail.}/>}</span> */}
          <textarea
            type='text'
            id='upload-vid-modal-title-textarea'
            placeholder='Video Title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            />
          {hasSubmitted && errors.title && <p>{errors.title}</p>}
          <textarea
            type='text'
            id='upload-vid-modal-description-textarea'
            placeholder='Video Description (optional)'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            />
          {hasSubmitted && errors.description && <p>{errors.description}</p>}
          <input
            type='text'
            id='upload-vid-modal-category-input'
            placeholder='Video Category (optional)'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            />
          {hasSubmitted && errors.category && <p>{errors.category}</p>}
          {/* <label>Video File (mp4 only)</label>
            <input
            type='file'
            onChange={(e) => setVideo(e.target.files[0])}
            accept='video/*'
            />
            {hasSubmitted && errors.video && <p>{errors.video}</p>} */}
            <label>Thumbnail File (jpeg, jpg, png only) </label>
            <input
            type='file'
            onChange={(e) => setThumbnail(e.target.files[0])}
            accept='image/*'
            />
            {hasSubmitted && errors.thumbnail && <p>{errors.thumbnail}</p>}
          <button type='submit'>Submit</button>
          </div>
          </>
      )}
      </form>

    </div>

  )
}

export default UploadModal
