import React from 'react'
import './VideoPage.css'

const VideoBarCard = ({video}) => {

    if (!video) {
        return <h1>Loading...</h1>
    }

  return (
    <div className='video-page-side-vid-container'>
        <div className='side-video-thumbnail'>
            <img className='side-video-thumbnail' src={video?.thumbnail} alt=''/>
        </div>
        <div className='side-video-card-right'>
                <div className='side-video-card-lower-information'>
                <span className='side-card-video-title'>{video?.title}</span>
                <span className='side-card-video-username'>{video?.user?.username}</span>
                <span className='side-card-video-views'>{video?.views} {video?.views === 1 ? <span>view</span> : <span>views</span>}</span>
                </div>
            </div>
          <div>
        </div>
    </div>
  )
}

export default VideoBarCard
