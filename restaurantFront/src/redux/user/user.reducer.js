import UserActionTypes from './user.types'

const INITIAL_STATE = {
    currentUser: null,
    error: null,
    isFetching: false,
    userRole: null,
    userDetails: null,
    message: null 
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case UserActionTypes.GOOGLE_SIGN_IN_START:
        case UserActionTypes.FACEBOOK_SIGN_IN_START:
        case UserActionTypes.EMAIL_SIGN_IN_START:
        case UserActionTypes.FETCH_USER_DETAILS_START:
        case UserActionTypes.SAVE_ALL_CHANGES_START:
        case UserActionTypes.SIGN_UP_START:
            return {
                ...state, 
                isFetching: true,
                message: null,
                error: null
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
                error: null,
                userRole: null,
                userDetails: null,

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
                error: null,
            }
        case UserActionTypes.SIGN_UP_FAILURE:
            return {
                ...state, 
                error: action.payload,
                isFetching: false

            }
        case UserActionTypes.CHECK_USER_ROLE_SUCCESS:
            return {
                ...state, 
                userDetails: action.payload,
                isFetching: false
            }
        case UserActionTypes.CHECK_USER_ROLE_FAILURE:
            return {
                ...state, 
                userDetails: null,
                isFetching: false
            }
        case UserActionTypes.SAVE_ALL_CHANGES_SUCCESS:
            return {
                ...state,
                isFetching: false,
                error: null,
                message: 'Changes updated successfully!'
            }
        case UserActionTypes.SAVE_ALL_CHANGES_FAILURE:
            return {
                ...state,
                error: action.payload,
                isFetching: false
            }
        case UserActionTypes.SET_ERROR_TO_NULL:
            return {
                ...state,
                error: null
            }
        case UserActionTypes.REMOVE_MESSAGE:
            return {
                ...state,
                message: null 
            }
        default: 
            return state;
    }
}

export default userReducer;