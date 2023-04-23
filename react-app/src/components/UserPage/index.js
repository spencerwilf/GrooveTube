import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { loadUserVideosThunk } from '../../store/videos'
import OpenModalButton from '../OpenModalButton'
import UploadModal from './UploadModal'
import VideoCard from '../VideoCard'
import EditVideoModal from './EditVideoModal'
import DeleteVideoModal from './DeleteVideoModal'
import './UserPage.css'


const UserPage = () => {
    const sessionUser = useSelector(state => state.session.user)
    const userVideos = useSelector(state => state.videos.userVideos)
    const {userId} = useParams()
    const dispatch = useDispatch()
    const [videos, setVideos] = useState([])


    useEffect(() => {
        dispatch(loadUserVideosThunk(userId))
    }, [dispatch, userId, videos])


    if (!userVideos) {
      return <h1>Loading</h1>
    }


  return (
    <div className='main-user-page-container'>
        {sessionUser.id == userId && (
          <>
          <div className='user-page-account-info'>
            <div><img className='user-page-profile-photo' src={sessionUser?.profile_picture} alt=''/></div>
            <div className='user-page-username-and-name'>
            <div>{`${sessionUser.first_name} ${sessionUser.last_name}`}</div>
            <div>@{sessionUser.username}</div>
            </div>
          </div>
            <div className='lower-user-page-upload'>
            <div><img className='upload-video-clipart' src='https://www.gstatic.com/youtube/img/channels/empty_channel_illustration.svg' alt=''/></div>
            <p>Upload a video!</p>
            <p>Start sharing your story and connecting with viewers. Videos you upload will show up here.</p>
            <div id='modal-open-user-button'>
            <OpenModalButton
            modalComponent={<UploadModal videos={videos}/>}
            buttonText='Upload'
            />
            </div>
            <div>
              {Object.values(userVideos).map(vid => (
                <>
                <Link to={`/videos/${vid?.id}`} key={vid?.id}>
                  <VideoCard video={vid}/>
                </Link>
                <OpenModalButton
                modalComponent={<EditVideoModal video={vid}/>}
                buttonText='Edit Video'
                />
                <OpenModalButton
                modalComponent={<DeleteVideoModal video={vid} />}
                buttonText='Delete Video'
                  />
                </>
              ))}
            </div>
            </div>
            </>
        )}
    </div>
  )
}

export default UserPage
