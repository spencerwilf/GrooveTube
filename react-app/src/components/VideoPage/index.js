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
import './VideoPage.css'

const VideoPage = () => {
    const oneVideo = useSelector(state => state.videos.oneVideo)
    const videoComments = useSelector(state => state.comments.videoComments)
    const sessionUser = useSelector(state => state.session.user)
    const dispatch = useDispatch()
    const {videoId} = useParams()
    const [comment, setComment] = useState('')
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [errors, setErrors] = useState({})


    useEffect(() => {

    }, [errors])


    useEffect(() => {
        dispatch(loadOneVideoThunk(videoId))
        dispatch(getCommentsThunk(videoId))
        return() => {
            dispatch(clearVideosThunk())
        }
    }, [dispatch, comment, videoId])


    if (!oneVideo || !videoComments) {
        return <h1>Loading...</h1>
    }


    const leaveComment = async (e) => {
        e.preventDefault()
        let errors = {}

        if (comment.length <= 0) {
            errors.comment = 'Comment must have content'
            setErrors(errors)
            return alert('Please fix errors before submitting')
        }

        if (comment.length >= 249) {
            errors.comment = 'Comment cannot be over 250 characters'
            setErrors(errors)
            return alert('Please fix errors before submitting')
        }



        const payload = {
            content: comment
        }


        setErrors({})
        await dispatch(createCommentThunk(payload, videoId))
        setComment('')
    }




  return (
    <div className='video-page-wrapper'>
        <video autoPlay controls>
            <source src={oneVideo?.url}/>
        </video>
        <div className='below-vid-above-comments-section'>
            <h3>{oneVideo.title}</h3>
            <div className='user-pfp-subscribe-container'>
            <span>{<img className='video-page-comment-user-picture' src={oneVideo.user?.profile_picture} alt=''/>} {oneVideo.user?.username}</span>
            </div>
            <p>{oneVideo?.description}</p>
        </div>
        <div>
            <div className='video-page-comment-section-container'>
                <h3>Comments</h3>
                  {sessionUser ? (
                      <form onSubmit={leaveComment}>
                          <input
                              placeholder='Leave a comment'
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                          />
                          <button
                          type='submit'
                          disabled={comment.length <= 0 ? true : false}
                          >Add comment</button>
                      </form>
                ) : <h3>Sign in to Leave a comment!</h3>}

            </div>
            <div className='video-page-comments'>
            {Object.values(videoComments).map(comment => (
                <div className='individual-comment-container' key={comment?.id}>

                    <img className='video-page-comment-user-picture' src={comment?.user?.profile_picture} alt=''/>
                    <div className='comment-bottom-section-user-and-content'>
                    <div className='comment-user-info'>
                    <span className='comment-user-name'>{`${comment?.user?.first_name} ${comment?.user?.last_name}`}</span>
                    </div>
                    <div>
                    {comment.content}
                    </div>
                    </div>
                    {comment?.user_id == sessionUser?.id && (
                        <div className='comment-delete-and-edit'>
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
    </div>
  )
}

export default VideoPage
