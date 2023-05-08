import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, Link } from 'react-router-dom/cjs/react-router-dom.min'
import { loadSearchVideosThunk } from '../../store/videos'
import VideoCard from '../VideoCard'
import './Search.css'

const SearchResults = () => {
    const {search} = useLocation()
    const dispatch = useDispatch()
    const videos = useSelector(state => state.videos.allVideos)
    const query = new URLSearchParams(search).get('query')
    
    useEffect(() => {
        dispatch(loadSearchVideosThunk(query))
    }, [dispatch, query])

    let videoArr;
    if (videos) {
        videoArr = Object.values(videos)
    }



  return (
    <div className='video-search-page'>
        {videoArr.length ? (
            <>
            {videoArr.map(video => (
                <Link to={`videos/${video.id}`} key={video.id}>
                <VideoCard  video={video}/>
                </Link>
            ))}
            </>
        ): <h1>No videos found!</h1>}

    </div>
  )
}

export default SearchResults