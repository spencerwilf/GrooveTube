import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { loadUserVideosThunk } from '../../store/videos'
import OpenModalButton from '../OpenModalButton'
import UploadModal from './UploadModal'


const UserPage = () => {
    const sessionUser = useSelector(state => state.session.user)
    const {userId} = useParams()
    const dispatch = useDispatch()



    useEffect(() => {
        dispatch(loadUserVideosThunk(userId))
    }, [dispatch, userId])


    const uploadClick = () => {

    }


  return (
    <div className='main-user-page-container'>
        {sessionUser?.id == userId && (
            <div>
            <h3>Upload a video!</h3>
            <h5>Start sharing your story and connecting with viewers. Videos you upload will show up here.</h5>
            <OpenModalButton
            modalComponent={<UploadModal sessionUser={sessionUser}/>}
            buttonText='Upload'
            />
            </div>
        )}
    </div>
  )
}

export default UserPage