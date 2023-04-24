import React, { useEffect, useRef, useState } from 'react'
import { loadAllVideosThunk, loadOneVideoThunk } from '../../store/videos'
import { getCommentsThunk } from '../../store/comments'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { clearVideosThunk } from '../../store/videos'
import { createCommentThunk } from '../../store/comments'
import OpenModalButton from '../OpenModalButton'
import EditCommentModal from './EditCommentModal'
import DeleteCommentModal from './DeleteCommentModal'
import { clearCommentsThunk } from '../../store/comments'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import ReactPlayer from 'react-player'
import VideoBarCard from './VideoSideBarCards'
import './VideoPage.css'

const VideoPage = () => {
    const allVideos = useSelector(state => state.videos.allVideos)
    const oneVideo = useSelector(state => state.videos.oneVideo)
    const videoComments = useSelector(state => state.comments.videoComments)
    const sessionUser = useSelector(state => state.session.user)
    const dispatch = useDispatch()
    const {videoId} = useParams()
    const [comment, setComment] = useState('')
    const [submittedComment, setSubmittedComment] = useState(false)
    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {

    }, [errors])


    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);


    useEffect(() => {
         dispatch(loadOneVideoThunk(videoId))
         dispatch(getCommentsThunk(videoId))
         dispatch(loadAllVideosThunk())
        return() => {
            dispatch(clearVideosThunk())
            // dispatch(clearCommentsThunk())
        }
    }, [dispatch, submittedComment, videoId])


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
        setSubmittedComment(!submittedComment)
    }

    let sortedComments;
    if (videoComments) {
        sortedComments = Object.values(videoComments).sort((a, b) => {
            return b.id - a.id
        })
        console.log(sortedComments)
    }


    let vidsExceptCurrent;
    if (allVideos) {
        vidsExceptCurrent = Object.values(allVideos).filter(vid => {
            return vid.id !== oneVideo.id
        })
    }

  return (
    <div className='video-page-wrapper'>
        <div className='video-page-main-section-left'>
        <ReactPlayer  width= '850px' height= '490px' playing={true} controls url={oneVideo.url}/>
        <div className='below-vid-above-comments-section'>
            <div>
            <h3>{oneVideo.title}</h3>
            <div className='user-pfp-subscribe-container'>
            <Link to={`/users/${oneVideo?.user?.id}`}><span className='video-owner-pic-and-name'>{<img className='video-page-comment-user-picture' src={oneVideo.user?.profile_picture} alt=''/>} {oneVideo.user?.username}</span></Link>
            </div>
            </div>
            <div className='video-description-container'>
            <p>{oneVideo?.description}</p>
            </div>
        </div>
        <div>
            <div className='video-page-comment-section-container'>
            <span className='comments-number-header'>{videoComments && Object.values(videoComments)?.length}{videoComments && Object.values(videoComments)?.length === 1 ? <p>Comment</p> : <p>Comments</p>}</span>
                  {sessionUser ? (
                    <div className='comment-form-container'>
                        <div className='leave-comment-pfp-and-input'>
                        <img className='video-page-comment-user-picture' src={sessionUser?.profile_picture}/>
                      <form className='comment-form' onSubmit={leaveComment}>
                          <input
                              placeholder='Leave a comment'
                              value={comment}
                              className='comment-input'
                              onChange={(e) => setComment(e.target.value)}
                          />
                      </form>
                      </div>
                      <div className='leave-comment-button-container'>
                      <button
                          onClick={leaveComment}
                          className='comment-submit-button'
                          hidden={!sessionUser || !comment?.length ? true : false}
                          disabled={comment.length <= 0 ? true : false}
                          >Add comment
                        </button>
                        </div>
                      </div>
                ) : <h3>Sign in to Leave a comment!</h3>}

            </div>
            <div className='video-page-comments'>
            {Object.values(videoComments).map(comment => (
                <div className='individual-comment-container' key={comment?.id}>
                    <div className='comment-user-info-wrapper'>
                    <img className='video-page-comment-user-picture' src={comment?.user?.profile_picture} alt=''/>
                    <div className='comment-bottom-section-user-and-content'>
                    <div className='comment-user-info'>
                    <span className='comment-user-name'>{`${comment?.user?.first_name} ${comment?.user?.last_name}`}</span>
                    </div>
                    <div>
                    {comment.content}
                    </div>
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
          <div className='video-section-scroller-right'>
            <h2 className='other-videos-header'>Other videos you may like</h2>
            {vidsExceptCurrent.map(video => (
                <Link key={video.id} to={`/videos/${video.id}`}>
                    <VideoBarCard video={video}/>
                </Link>
            ))}
          </div>
    </div>
  )
}

export default VideoPage
