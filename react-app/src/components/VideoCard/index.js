import React from 'react'
import './VideoCard.css'

const VideoCard = ({video}) => {

    console.log(video)
    if (!video) {
        return <h1>Loading...</h1>
    }
  return (
    <div className='home-video-card-container'>
        <div className='video-thumbnail'>
            <img className='home-video-thumbnail' src={video?.thumbnail} alt=''/>
        </div>
        <div className='home-video-card-lower'>
            <img className='home-user-profile-picture' src={video?.user?.profile_picture} alt=''/>
                <div className='home-video-card-lower-information'>
                <span className='card-video-title'>{video?.title}</span>
                <span className='card-video-username'>{video?.user?.username}</span>
                <span className='card-video-views'>{video?.views} views</span>
                </div>
            </div>
          <div>
        </div>
    </div>
  )
}

export default VideoCard
