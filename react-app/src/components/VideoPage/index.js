import React, { useEffect, useState } from 'react'
import { loadOneVideoThunk } from '../../store/videos'
import { getCommentsThunk } from '../../store/comments'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { clearVideosThunk } from '../../store/videos'
import { createCommentThunk } from '../../store/comments'
import OpenModalButton from '../OpenModalButton'
import EditCommentModal from './EditCommentModal'
import DeleteCommentModal from './DeleteCommentModal'

const VideoPage = () => {
    const oneVideo = useSelector(state => state.videos.oneVideo)
    const videoComments = useSelector(state => state.comments.videoComments)
    const sessionUser = useSelector(state => state.session.user)
    const dispatch = useDispatch()
    const {videoId} = useParams()
    const [comment, setComment] = useState('')
    const [errors, setErrors] = useState({})


    useEffect(() => {
        
    }, [errors])


    useEffect(() => {
        dispatch(loadOneVideoThunk(videoId))
        dispatch(getCommentsThunk(videoId))
    }, [dispatch, videoId, comment])


    if (!oneVideo || !videoComments) {
        return <h1>Loading...</h1>
    }


    const leaveComment = async (e) => {
        e.preventDefault()

        const payload = {
            content: comment
        }

        const res = await dispatch(createCommentThunk(payload, videoId))
        setComment('')
    }




  return (
    <div>
        <h1>{oneVideo.title}</h1>
        <img src={oneVideo.thumbnail} alt=''/>
        <div>
            <div>
                <h3>Comments</h3>
                  {sessionUser ? (
                      <form onSubmit={leaveComment}>
                          <input
                              placeholder='Leave a comment'
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                          />
                          <button type='submit'>Add comment</button>
                      </form>
                ) : <h3>Sign in to Leave a comment!</h3>}
               
            </div>
            {Object.values(videoComments).map(comment => (
                <div key={comment?.id}>
                    <div className='comment-user-info'>
                    <img src={comment?.user?.profile_picture} alt=''/>
                    {comment?.user?.username}
                    </div>
                    <div>
                    {comment.content}
                    </div>
                    {comment?.user_id == sessionUser?.id && (
                        <div>
                        <OpenModalButton
                            modalComponent={<EditCommentModal 
                                comment={comment} 
                                videoId={videoId} 
                            />}
                            buttonText='Edit Comment'
                        />
                        <OpenModalButton
                            modalComponent={<DeleteCommentModal 
                                comment={comment} 
                                videoId={videoId} 
                            />}
                            buttonText='Delete Comment'
                        />
                        </div>
                    )}
                </div>
            ))}
        </div>
    </div>
  )
}

export default VideoPage