import UserActionTypes from './user.types'

const INITIAL_STATE = {
    currentUser: null,
    error: null,
    isFetching: false
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case UserActionTypes.GOOGLE_SIGN_IN_START:
        case UserActionTypes.FACEBOOK_SIGN_IN_START:
        case UserActionTypes.EMAIL_SIGN_IN_START:
            return {
                ...state, 
                isFetching: true
            }
        case UserActionTypes.SIGN_IN_SUCCESS:
            return {
                ...state, 
                currentUser: action.payload,
                error: null,
                isFetching: false
            }
        case UserActionTypes.SIGN_OUT_SUCCESS:
            return {
                ...state, 
                currentUser: null, 
                error: null
            }
        case UserActionTypes.SIGN_IN_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: action.payload
            }
        case UserActionTypes.SIGN_OUT_FAILURE:
            return {
                ...state, 
                error: action.payload
            }
        case UserActionTypes.SIGN_UP_SUCCESS:
            return {
                ...state, 
                error: null
            }
        case UserActionTypes.SIGN_UP_FAILURE:
            return {
                ...state, 
                error: action.payload
            }
        default: 
            return state;
    }
}

export default userReducer;