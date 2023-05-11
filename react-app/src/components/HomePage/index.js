import React, { useEffect, useState } from 'react'
import { loadAllVideosThunk } from '../../store/videos'
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import VideoCard from '../VideoCard';
import './HomePage.css'
import SideBar from '../SideBar';


const HomePage = () => {
    const allVideos = useSelector(state => state.videos.allVideos)
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)


    useEffect(() => {
        dispatch(loadAllVideosThunk())
    }, [dispatch])

    if (!allVideos || !Object.values(allVideos).length) {
        return <h1>Loading...</h1>
    }




  return (
    <div className='home-page-wrapper'>
    <div className='all-videos-grid'>
        {Object.values(allVideos).map(video => (
            <Link to={`/videos/${video.id}`} key={video.id}>
                <VideoCard video={video}/>
            </Link>

        ))}
    </div>
    <SideBar/>
            
    </div>
  )
}

export default HomePage
