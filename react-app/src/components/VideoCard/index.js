import React, {useState} from 'react'
import './VideoCard.css'
import ReactPlayer from 'react-player';

const VideoCard = ({video}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePreview = () => {
    setIsPlaying(true);
  };

  const handleStopPreview = () => {
    setIsPlaying(false);
  };

    if (!video) {
        return <h1>Loading...</h1>
    }
  return (
    <div onMouseEnter={handlePreview} onMouseLeave={handleStopPreview} className='home-video-card-container'>
        {/* <ReactPlayer url={video?.url} playing={true}/> */}
        {isPlaying ? (
          <>
            <div className='video-thumbnail'>
            <div style={{ borderRadius: '12px', objectFit: 'cover', position: 'absolute', top: 0, left: 0 }} >
            <ReactPlayer className='home-video-thumbnail' url={video?.url} playing={true} width='330px' height='200px'/>
            </div>
            <img className='home-video-thumbnail' src={video?.thumbnail} alt=''/>
            
        </div>
        <div className='home-video-card-lower'>
            <img className='home-user-profile-picture' src={video?.user?.profile_picture} alt=''/>
                <div className='home-video-card-lower-information'>
                <span className='card-video-title'>{video?.title}</span>
                <span className='card-video-username'>{video?.user?.username}</span>
                <span className='card-video-views'>{video?.views} {video?.views === 1 ? <span>view</span> : <span>views</span>}</span>
                </div>
            </div>
          <div>
        </div>
        </>
        ) : (

          <>
            <div className='video-thumbnail'>
              {/* <ReactPlayer url={video?.url} playing={true} /> */}
              <img className='home-video-thumbnail' src={video?.thumbnail} alt='' />

            </div>
            <div className='home-video-card-lower'>
              <img className='home-user-profile-picture' src={video?.user?.profile_picture} alt='' />
              <div className='home-video-card-lower-information'>
                <span className='card-video-title'>{video?.title}</span>
                <span className='card-video-username'>{video?.user?.username}</span>
                <span className='card-video-views'>{video?.views} {video?.views === 1 ? <span>view</span> : <span>views</span>}</span>
              </div>
            </div>
            <div>
            </div>
          </>

        )}

    </div>
  )
}

export default VideoCard
