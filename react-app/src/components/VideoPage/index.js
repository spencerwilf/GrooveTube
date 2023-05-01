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
import { likeVideoThunk } from '../../store/videos'
import { unlikeVideoThunk } from '../../store/videos'
import ReactPlayer from 'react-player'
import VideoBarCard from './VideoSideBarCards'
import { getVideoLikesThunk } from '../../store/videos'
import './VideoPage.css'


const VideoPage = () => {
    const allVideos = useSelector(state => state.videos.allVideos)
    const videoLikes = useSelector(state => state.videos.videoLikes)
    const oneVideo = useSelector(state => state.videos.oneVideo)
    const userLikes = Object.keys(videoLikes)
    const videoComments = useSelector(state => state.comments.videoComments)
    const sessionUser = useSelector(state => state.session.user)
    const dispatch = useDispatch()
    const {videoId} = useParams()
    const [comment, setComment] = useState('')
    // const [likes, setLikes] = useState(oneVideo.likes)
    const [submittedComment, setSubmittedComment] = useState(false)
    const [userHasLiked, setUserHasLiked] = useState(false)
    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(true);




    // useEffect(() => {
    //    function f() {
    //         if (Object.keys(videoLikes).indexOf(`${sessionUser.id}`) !== -1) {
    //             setUserHasLiked(true)
    //         }
    //     }
    //     f()
    // }, [sessionUser.id, videoLikes])


      useEffect(() => {
        window.scrollTo(0, 0);
      }, [videoId, dispatch])

    useEffect(() => {
        dispatch(loadOneVideoThunk(videoId))
        dispatch(loadAllVideosThunk())
        dispatch(getVideoLikesThunk(videoId))
        return() => {
            dispatch(clearVideosThunk())
            dispatch(clearCommentsThunk())
        }
    }, [dispatch, videoId])


    // useEffect(() => {
    //     getVideoLikesThunk(videoId)
    // }, [dispatch, videoId, videoLikes])


    useEffect(() => {
        dispatch(getCommentsThunk(videoId))
    }, [dispatch, videoId, submittedComment])


    useEffect(() => {
        let errors = {}
        if (comment.length > 250) errors.comment = 'Comment cannot be over 250 characters.'
        setErrors(errors)
    }, [comment])

    
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

        if (comment.length >= 250) {
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
    }


    let vidsExceptCurrent;
    if (allVideos) {
        vidsExceptCurrent = Object.values(allVideos).filter(vid => {
            return vid.id !== oneVideo.id
        })
    }

    
    const likeVideo = async (e) => {
        if (userHasLiked) return
        e.preventDefault()
        await dispatch(likeVideoThunk(oneVideo))
        setUserHasLiked(true)
    }


    const unlikeVideo = async (e) => {
        e.preventDefault()
        await dispatch(unlikeVideoThunk(sessionUser.id, videoId))
        setUserHasLiked(false)
    }

  return (
    <div className='video-page-wrapper'>
        <div className='video-page-main-section-left'>
        <ReactPlayer  width= '850px' height= '490px' playing={true} controls url={oneVideo.url}/>
        <div className='below-vid-above-comments-section'>
            <div>
                    <div className='header-likes-container'>
                        <h3>{oneVideo.title}</h3>

                    </div>

            <div className='user-pfp-subscribe-container'>
<span className='video-owner-pic-and-name'>{<img className='video-page-comment-user-picture' src={oneVideo.user?.profile_picture} alt=''/>} {oneVideo.user?.username}</span>
                          <div className='likes-number-and-thumb-logo'>

                              {!userLikes?.includes(`${sessionUser?.id}`) && (
                                  <i id='unliked-comment-thumb' onClick={likeVideo} class="fa-solid fa-thumbs-up"></i>
                              )}

                              {userLikes.includes(`${sessionUser?.id}`) && (
                                  <i id='liked-comment-thumb' onClick={unlikeVideo} class="fa-solid fa-thumbs-up"></i>
                              )}

                              <p style={{ fontWeight: 'bold', fontSize: '14px' }}>{Object.values(videoLikes).length}</p>
                          </div>
            </div>
            </div>
            <div className='video-description-container'>
                      <p className='video-views-description-text'> {oneVideo?.views} {oneVideo?.views === 1 ? <span>view</span> : <span>views</span>}</p>
            <p>{oneVideo?.description}</p>
            </div>
        </div>
        <div>
            <div className='video-page-comment-section-container'>
            <span className='comments-number-header'>{videoComments && Object.values(videoComments)?.length}{videoComments && Object.values(videoComments)?.length === 1 ? <p>Comment</p> : <p>Comments</p>}</span>
                  {sessionUser ? (
                    <div className='comment-form-container'>
                        <div className='leave-comment-pfp-and-input'>
                        <img className='video-page-comment-user-picture' src={sessionUser?.profile_picture} alt=''/>
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
                        {errors.comment ? <p style={{color: 'red'}}>{errors.comment}</p> : (
                                      <button
                                          onClick={leaveComment}
                                          className='comment-submit-button'
                                          hidden={!sessionUser || !comment?.length ? true : false}
                                          disabled={comment.length <= 0 ? true : false}
                                      >Add comment
                                      </button>
                                    )}

                        </div>
                      </div>
                ) : <h3>Sign in to join the conversation!</h3>}

            </div>
            <div className='video-page-comments'>
            {sortedComments?.map(comment => (
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
                            buttonText='Edit'
                        />
                        <OpenModalButton
                            modalComponent={<DeleteCommentModal
                                comment={comment}
                                videoId={videoId}
                            />}
                            buttonText='Delete'
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
