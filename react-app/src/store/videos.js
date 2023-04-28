const LOAD_ALL_VIDEOS = 'videos/LOAD_ALL_VIDEOS'
const LOAD_ONE_VIDEO = 'videos/LOAD_ONE_VIDEO'
const LOAD_USER_VIDEOS = 'videos/LOAD_USER_VIDEOS'
const CREATE_VIDEO = 'videos/CREATE_VIDEO'
const UPDATE_VIDEO = 'videos/UPDATE_VIDEO'
const DELETE_VIDEO = 'videos/DELETE_VIDEO'
const CLEAR_VIDEOS = 'videos/CLEAR_VIDEOS'
const LIKE_VIDEO = 'videos/LIKE_VIDEO'
const UNLIKE_VIDEO = 'videos/UNLIKE_VIDEO'
const GET_LIKES = 'videos/GET_LIKES'


const loadAllVideos = (payload) => {
    return {
        type: LOAD_ALL_VIDEOS,
        payload
    }
}


const loadOneVideo = (payload) => {
    return {
        type: LOAD_ONE_VIDEO,
        payload
    }
}


const loadUserVideos = (payload) => {
    return {
        type: LOAD_USER_VIDEOS,
        payload
    }
}


const createVideo = (payload) => {
    return {
        type: CREATE_VIDEO,
        payload
    }
}


const updateVideo = (payload) => {
    return {
        type: UPDATE_VIDEO,
        payload
    }
}




const deleteVideo = (videoId) => {
    return {
        type: DELETE_VIDEO,
        videoId
    }
}


const clearVideos = () => {
    return {
        type: CLEAR_VIDEOS
    }
}


const likeVideo = (payload) => {
    return {
        type: LIKE_VIDEO,
        payload
    }
}


const unlikeVideo = (userId, videoId) => {
    return {
        type: UNLIKE_VIDEO,
        payload: {userId, videoId}
    }
}


const getLikes = (payload) => {
    return {
        type: GET_LIKES,
        payload
    }
}



export const loadAllVideosThunk = () => async dispatch => {
    const res = await fetch(`/api/videos`)
    if (res.ok) {
        const videos = await res.json()
        dispatch(loadAllVideos(videos))
    }
}


export const loadOneVideoThunk = (videoId) => async dispatch => {
    const res = await fetch(`/api/videos/${videoId}`)
    if (res.ok) {
        const video = await res.json()
        dispatch(loadOneVideo(video))
    }
}



export const loadUserVideosThunk = () => async dispatch => {
    const res = await fetch(`/api/videos/current`)
    if (res.ok) {
        const videos = await res.json()
        dispatch(loadUserVideos(videos))
    }
}



export const createVideoThunk = (video) => async dispatch => {
    const res = await fetch(`/api/videos`, {
        method: 'POST',
        body: video
    })
    if (res.ok) {
        const video = await res.json()
        dispatch(createVideo(video))
        return video
    }
}


export const likeVideoThunk = (video) => async dispatch => {
    const res = await fetch(`/api/videos/${video.id}/likes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(video)
    })
    if (res.ok) {
        const video = await res.json()
        dispatch(likeVideo(video))
        return video
    }
}


export const unlikeVideoThunk = (userId, videoId) => async dispatch => {
    
    const res = await fetch(`/api/videos/${videoId}/likes`, {
        method: 'DELETE',
    })
    if (res.ok) {
        dispatch(unlikeVideo(userId, videoId))
    }
}


export const getVideoLikesThunk = (videoId) => async dispatch => {
    const res = await fetch(`/api/videos/${videoId}/likes`)
    if (res.ok) {
        const likes = await res.json()
        dispatch(getLikes(likes))
    }
}



export const updateVideoThunk = (video) => async dispatch => {
    const res = await fetch(`/api/videos/${video.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(video)
    })
    if (res.ok) {
        const video = await res.json()
        dispatch(updateVideo(video))
    }
}





export const deleteVideoThunk = (videoId) => async dispatch => {
    const res = await fetch(`/api/videos/${videoId}`, {
        method: 'DELETE',
    })
    if (res.ok) {
        dispatch(deleteVideo(videoId))
    }
}



export const clearVideosThunk = () => async dispatch => {
    dispatch(clearVideos())
}



const initialState = {
    allVideos: {},
    oneVideo: {},
    userVideos: {},
    videoLikes: {}
}


const videoReducer = (state = initialState, action) => {
    let newState;
    switch(action.type) {
        case LOAD_ALL_VIDEOS:
            newState = {...state, allVideos: {}}
            Object.values(action.payload).forEach(ele => newState.allVideos[ele.id] = ele)
            return newState
        case LOAD_ONE_VIDEO:
            return {...state, oneVideo: {...action.payload}}
        case LOAD_USER_VIDEOS:
            newState = {...state, userVideos: {}}
            Object.values(action.payload).forEach(ele => newState.userVideos[ele.id] = ele)
            return newState
        case CREATE_VIDEO:
            newState = { ...state, userVideos: { ...state.userVideos }}
            newState.userVideos[action.payload.id] = action.payload
            return newState
        case UPDATE_VIDEO:
            newState = {...state, userVideos: {...state.userVideos}}
            newState.userVideos[action.payload.id] = action.payload
            return newState
        case DELETE_VIDEO:
            newState = {...state, allVideos: {...state.allVideos}, userVideos: {...state.userVideos}}
            delete newState.allVideos[action.videoId]
            delete newState.userVideos[action.videoId]
            return newState
        case CLEAR_VIDEOS:
            return {...state, oneVideo: {}, allVideos: {}}
        case GET_LIKES:
            // return {...state, videoLikes: {...action.payload}}
            newState = {...state, videoLikes: {}}
            Object.values(action.payload).forEach(ele => newState.videoLikes[ele.user_id] = ele)
            return newState
        case LIKE_VIDEO:
            newState = {...state, videoLikes: {...state.videoLikes}}
            newState.videoLikes[action.payload.user_id] = action.payload
            return newState
        case UNLIKE_VIDEO:
            console.log(action.payload)
            newState = { ...state, videoLikes: { ...state.videoLikes } }
            delete newState.videoLikes[action.payload.userId]
            return newState
        default:
            return state
    }

}


export default videoReducer
