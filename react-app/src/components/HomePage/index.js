import React, { useEffect, useState } from 'react'
import { loadAllVideosThunk } from '../../store/videos'
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import VideoCard from '../VideoCard';
import './HomePage.css'


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
            <div className='home-side-bar-socials'>
            {sessionUser && <p className='user-videos-link'><Link className='target-your-videos' to={`/users/${sessionUser?.id}`}>Your videos</Link></p>}
            <div>
            <p>Connect with me!</p>
            <div className='github-icon-wrapper'>
            <a className='github-a-tag' href='https://github.com/spencerwilf' target='_blank'>
                      <i id='github-logo' className="fa-brands fa-github"/>
            <p className='home-social-media-icons'>Github</p>
            </a>
            </div>
                  <div className='github-icon-wrapper'>
                      <a className='github-a-tag' href='https://www.linkedin.com/in/spencer-wilfahrt-1a4604156/' target='_blank'>
                          <i id='github-logo' className="fa-brands fa-linkedin"></i>
                          <p className='home-social-media-icons'>LinkedIn</p>
                      </a>
                  </div>
            </div>
    </div>
    </div>
  )
}

export default HomePage
