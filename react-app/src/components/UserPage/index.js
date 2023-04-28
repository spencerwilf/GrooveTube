import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { loadUserVideosThunk } from '../../store/videos'
import OpenModalButton from '../OpenModalButton'
import UploadModal from './UploadModal'
import VideoCard from '../VideoCard'
import EditVideoModal from './EditVideoModal'
import DeleteVideoModal from './DeleteVideoModal'
import { getUserLikesThunk } from '../../store/session'
import './UserPage.css'


const UserPage = () => {
    const sessionUser = useSelector(state => state.session.user)
    const userVideos = useSelector(state => state.videos.userVideos)
    const userLikes = useSelector(state => state.session.userLikes)
    const {userId} = useParams()
    const dispatch = useDispatch()
    const [videos, setVideos] = useState([])
    const [isLikes, setIsLikes] = useState(false)


    useEffect(() => {
        dispatch(loadUserVideosThunk(userId))
        dispatch(getUserLikesThunk())
    }, [dispatch, userId, videos])


    if (!userVideos) {
      return <h1>Loading</h1>
    }


    const handleVideos = () => {
      setIsLikes(false)
    }

    const handleLikes = () => {
      setIsLikes(true)
    }


  return (
    <div className='main-user-page-container'>
        {sessionUser?.id == userId && (
          <>
          <div className='user-page-account-info'>
            <div className='user-pfp-image-and-upload-button-name'>
              <div><img className='user-page-profile-photo' src={sessionUser?.profile_picture} alt=''/></div>
            <div className='user-page-username-and-name'>
              <div>{`${sessionUser.first_name} ${sessionUser.last_name}`}</div>
              <div>@{sessionUser.username}</div>
            <div id='modal-open-user-button'>
                            <OpenModalButton
                            modalComponent={<UploadModal videos={videos}/>}
                            buttonText='Upload video'
                            />
                            </div>
            </div>
            </div>

            <div className='likes-and-my-videos-row'>
              <div className={!isLikes ? 'select-my-videos-active' : 'select-my-videos-inactive'} onClick={handleVideos}>Your videos</div>
              <div className={isLikes ? 'select-my-videos-active' : 'select-my-videos-inactive'} onClick={handleLikes}>Your likes</div>
            </div>

          </div>
          

          <div className='lower-user-page-upload'>
          {!isLikes && userVideos && Object.values(userVideos).length < 1 && (
              <>
                <div><img className='upload-video-clipart' src='https://www.gstatic.com/youtube/img/channels/empty_channel_illustration.svg' alt='' /></div>
                <div className='upload-header-and-text'>
                  <p className='upload-video-text'>Upload a video to get started</p>
                  <p className='initial-upload-text'>Start sharing your story and connecting with viewers. Videos you upload will show up here.</p>
                </div>
                <div id='modal-open-user-button'>
                  <OpenModalButton
                    modalComponent={<UploadModal videos={videos} />}
                    buttonText='Upload video'
                  />
                </div>
              </>
            )}
       
          


            <div>
          
          
           {!isLikes && (
                
                  Object.values(userVideos).map(vid => (
                    <>
                      <Link to={`/videos/${vid?.id}`} key={vid?.id}>
                        <VideoCard video={vid} />
                      </Link>
                      <div className='edit-delete-modal-user-buttons-video'>
                        <OpenModalButton
                          modalComponent={<EditVideoModal video={vid} />}
                          buttonText='Edit Video'
                        />
                        <OpenModalButton
                          modalComponent={<DeleteVideoModal video={vid} />}
                          buttonText='Delete Video'
                        />
                      </div>
                    </>
                  ))
           )}

              {isLikes && (
                Object.values(userLikes).map(vid => (
                  <>
                    <Link to={`/videos/${vid.video.id}`} key={vid?.id}>
                      {console.log(vid.video)}
                      <VideoCard video={vid.video} />
                    </Link>
                  </>
                ))
              )}

            </div>
            
            {isLikes && (!userLikes || !Object.values(userLikes).length) && (
              <>
              <p>You haven't liked any videos.</p>
              </>
            )}

            </div>




            </>
        )}
    </div>
  )
}

export default UserPage
