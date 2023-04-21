import React, { useEffect } from 'react'
import { loadAllVideosThunk } from '../../store/videos'
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import VideoCard from '../VideoCard';
import './HomePage.css'

const HomePage = () => {
    const allVideos = useSelector(state => state.videos.allVideos)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadAllVideosThunk())
    }, [dispatch])

    if (!allVideos || !Object.values(allVideos).length) {
        return <h1>Loading...</h1>
    }


  return (
    <div className='all-videos-grid'>
        {Object.values(allVideos).map(video => (
            <Link to={`/videos/${video.id}`} key={video.id}>
                <VideoCard video={video}/>
            </Link>
        ))}
    </div>
  )
}

export default HomePage