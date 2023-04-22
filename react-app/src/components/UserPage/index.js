import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { loadUserVideosThunk } from '../../store/videos'
import OpenModalButton from '../OpenModalButton'
import UploadModal from './UploadModal'
import VideoCard from '../VideoCard'
import EditVideoModal from './EditVideoModal'
import DeleteVideoModal from './DeleteVideoModal'


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
            <div>
            <h3>Upload a video!</h3>
            <h5>Start sharing your story and connecting with viewers. Videos you upload will show up here.</h5>
            <OpenModalButton
            modalComponent={<UploadModal videos={videos}/>}
            buttonText='Upload'
            />
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
        )}
    </div>
  )
}

export default UserPage
