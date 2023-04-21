const LOAD_COMMENTS = 'comments/LOAD_COMMENTS'
// const LOAD_SINGLE_COMMENT = 'comments/LOAD_SINGLE_COMMENT'
const CREATE_COMMENT = 'comments/CREATE_COMMENT'
const DELETE_COMMENT = 'comments/DELETE_COMMENT'
const UPDATE_COMMENT = 'comments/UPDATE_COMMENT'
const CLEAR_COMMENTS = 'comments/CLEAR_COMMENTS'


const loadComments = payload => {
    return {
        type: LOAD_COMMENTS,
        payload
    }
}


// const loadSingleComment = payload => {
//     return {
//         type: LOAD_SINGLE_COMMENT,
//         payload
//     }
// }


const createComment = payload => {
    return {
        type: CREATE_COMMENT,
        payload
    }
}


const deleteComment = commentId => {
    return {
        type: DELETE_COMMENT, 
        commentId
    }
}


const updateComment = payload => {
    return {
        type: UPDATE_COMMENT,
        payload
    }
}


const clearComments = () => {
    return {
        type: CLEAR_COMMENTS,
    }
}


export const getCommentsThunk = (videoId) => async dispatch => {
    const res = await fetch(`/api/videos/${videoId}/comments`)
    if (res.ok) {
        const data = await res.json()
        dispatch(loadComments(data))
        return data
    }
}


export const createCommentThunk = (comment, videoId) => async dispatch => {
    const res = await fetch(`/api/videos/${videoId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(comment)
    })
    if (res.ok) {
        const comment = await res.json()
        dispatch(createComment(comment))
        return comment
    }
}


export const deleteCommentThunk = (commentId) => async dispatch => {
    const res = await fetch(`/api/comments/${commentId}`, {
        method: 'DELETE',
    })
    if (res.ok) {
        dispatch(deleteComment(commentId))
    }
}


export const updateCommentThunk = (comment) => async dispatch => {
    const res = await fetch(`/api/comments/${comment.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(comment)
    })
    if (res.ok) {
        const updatedComment = res.json()
        dispatch(updateComment(updatedComment))
    }
}


export const clearCommentsThunk = () => async dispatch => {
    dispatch(clearComments())
}


const initialState = {
    videoComments: {},
    singleComment: {}
}


const commentsReducer = (state = initialState, action) => {
    let newState;
    switch(action.type) {
        case LOAD_COMMENTS:
            return {...state, videoComments: {...action.payload}}
        case CREATE_COMMENT:
            return {...state, videoComments: {...state.videoComments, ...action.payload}}
        case DELETE_COMMENT:
            newState = {...state}
            delete newState.videoComments[action.commentId]
            return newState
        case UPDATE_COMMENT:
            newState = {...state, videoComments: {...state.videoComments}}
            newState.videoComments[action.payload.id] = action.payload
            return newState
        default:
            return state
    }
}

export default commentsReducer