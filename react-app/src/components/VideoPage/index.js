import React, { useEffect } from 'react'
import { loadOneVideoThunk } from '../../store/videos'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'

const VideoPage = () => {
    const oneVideo = useSelector(state => state.oneVideo)
    const dispatch = useDispatch()
    const {videoId} = useParams()

    console.log(oneVideo)

    useEffect(() => {
        dispatch(loadOneVideoThunk(videoId))
    }, [dispatch, videoId])

  return (
    <div>VideoPage</div>
  )
}

export default VideoPage