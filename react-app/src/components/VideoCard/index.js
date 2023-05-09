import React, {useState} from 'react'
import './VideoCard.css'
import ReactPlayer from 'react-player';
import TimeAgo from 'react-timeago';

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
            <div  >
              <ReactPlayer className='home-video-thumbnail' url={video?.url} playing={true} width="330px !important"
                height="200px !important"
                style={{ width: '330px', objectFit:'cover', height:'200px,', position: 'absolute', top: 0, left: 0 }} />
            </div>
            <img style={{backgroundColor: 'black'}} className='home-video-thumbnail' src={video?.thumbnail} alt=''/>
            
        </div>
        <div className='home-video-card-lower'>
            <img className='home-user-profile-picture' src={video?.user?.profile_picture} alt=''/>
                <div className='home-video-card-lower-information'>
                <span className='card-video-title'>{video?.title}</span>
                <span className='card-video-username'>{video?.user?.username}</span>
                <span className='card-video-views'>{video?.views} {video?.views === 1 ? <span>view</span> : <span>views</span>}
                &#183;
                <span><TimeAgo date={video?.created_at} minPeriod='60' /></span>
                </span>
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
                <span style={{display:'flex', gap:'3px'}} className='card-video-views'>{video?.views} {video?.views === 1 ? <span>view</span> : <span>views</span>}
                  &#183;
                  <span><TimeAgo date={video?.created_at} minPeriod='60' /></span>
                </span>
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
