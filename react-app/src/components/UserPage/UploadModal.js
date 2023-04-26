import React, { useEffect, useState } from 'react'
import { useModal } from '../../context/Modal'
import { useDispatch } from 'react-redux'
import { createVideoThunk } from '../../store/videos'
import UploadLoadingScreen from './UploadLoadingScreen'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

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
    const [thumbTest, setThumbTest] = useState(null)
    const history = useHistory()
    // const [videoAttached, setVideoAttached] = useState(false)

    function validVideoFiles(file) {
      const valid = /\.(mp4)$/i
      return valid.test(file.name)
    }

  function validImageFiles(file) {
    const valid = /\.(png|jpg|jpeg)$/i
    return valid.test(file.name)
  }

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    const reader = new FileReader();
    setThumbnail(e.target.files[0]);


    reader.onload = (event) => {
      setThumbTest(event.target.result);
    };

    reader?.readAsDataURL(uploadedFile);
  };


  useEffect(() => {

    let errors = {}

    if (!video) errors.video = 'Video upload is required.'
    if (video && validVideoFiles(video) === false) errors.video = 'Please upload an mp4 file.'

    if (!thumbnail) errors.thumbnail = 'Thumbnail upload is required.'
    if (thumbnail && validImageFiles(thumbnail) === false) errors.thumbnail = 'Please upload a jpg, png or jpeg file.'
    console.log(thumbnail)
    if (!title.length) errors.title = 'Video title is required.'
    if (title.length > 100) errors.title = 'Title cannot be over 100 characters.'

    if (description.length > 250) errors.description = 'Description cannot be over 250 characters.'

    if (category.length > 100) errors.category = 'Category cannot be over 100 characters.'

    if (video && !errors.video) setUploadScreen(false)
    setErrors(errors)

  }, [video, title, thumbnail, mediaLoading, category.length, description.length, uploadScreen])


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
        history.push(`/videos/${res?.id}`)
        await closeModal()

        if (res.ok) {
          setHasSubmitted(false)
          setMediaLoading(false)
          
          
        }
    }


    if (mediaLoading) {
      return <UploadLoadingScreen/>
    }



  return (
    <div className='upload-video-wrapper'>
      {(video && <h2 className='upload-video-text-header'>Your upload: <span className='video-upload-step2-name'>{video.name}</span></h2>) || <h2 className='upload-video-text-header'>Upload video</h2>}
      {/* {!uploadScreen && (
        <p onClick={setUploadScreen(true)}>Go Back</p>
      )} */}
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
            placeholder='Title (required)'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            />
          {hasSubmitted && errors.title && <p>{errors.title}</p>}
          <textarea
            type='text'
            id='upload-vid-modal-description-textarea'
            placeholder='Description (optional)'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            />
          {hasSubmitted && errors.description && <p>{errors.description}</p>}
          <input
            type='text'
            id='upload-vid-modal-category-input'
            placeholder='Category (optional)'
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
                <div className='thumbnail-preview-flex-test'>
                  <div className='thumbnail-info-header-p-and-header'>
            <label>Thumbnail (jpeg, jpg, png only) </label>
              
                <p id='thumbnail-description-text-area'>Select or upload a picture that shows what's in your video. A good thumbnail stands out and draws viewers' attention.</p>
                  </div>
                  {thumbnail && thumbTest && <div className='thumbnail-rendered-image-preview-info'>
                                  <p id='thumbnail-preview-upload-text'>Thumbnail preview</p>
                                <img className='uploaded-thumbnail-preview' src={thumbTest} alt='' />
                                 </div>}
                </div>
            <input
            type='file'
            id='thumbnail-input'
            onChange={handleFileChange}
            accept='image/*'
            />

                <label htmlFor="thumbnail-input" className="thumbail-file-input">
                  <div className='upload-thumbnail-section'>
                  <i id='thumbnail-image-file-icon' class="fa-regular fa-file-image"></i>
                    <p id='upload-thumbnail-border-button'>Upload thumbnail</p>
                  </div>
                
                  </label>
                {thumbnail && errors.thumbnail && <p id='video-upload-error'><i class="fa-solid fa-triangle-exclamation"></i>{errors.thumbnail}</p>}
            {/* {hasSubmitted && errors.thumbnail && <p>{errors.thumbnail}</p>} */}
          <button className='final-modal-upload-video-button' type='submit'>Upload video</button>
          </div>
          </>
      )}
      </form>

    </div>

  )
}

export default UploadModal
