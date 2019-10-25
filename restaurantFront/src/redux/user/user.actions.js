import  UserActionTypes from './user.types';
import firebase from '../../firebase/firebase.utils';

export const googleSignInStart = () => ({
    type: UserActionTypes.GOOGLE_SIGN_IN_START
})

export const facebookSignInStart = () => ({
    type: UserActionTypes.FACEBOOK_SIGN_IN_START
})

export const emailSignInStart = emailAndPassword => ({
    type: UserActionTypes.EMAIL_SIGN_IN_START,
    payload: emailAndPassword
})

export const signInSuccess = (user) => ({
    type: UserActionTypes.SIGN_IN_SUCCESS,
    payload: user
})

export const signInFailure = error => ({
    type: UserActionTypes.SIGN_IN_FAILURE,
    payload: error
})

export const checkUserSession = () => ({
    type: UserActionTypes.CHECK_USER_SESSION
})

export const signOutStart = () => ({
    type: UserActionTypes.SIGN_OUT_START
})

export const signOutSuccess = () => ({
    type: UserActionTypes.SIGN_OUT_SUCCESS
})

export const signOutFailure = (error) => ({
    type: UserActionTypes.SIGN_OUT_FAILURE,
    payload: error
})

export const signUpStart = (user) => ({
    type: UserActionTypes.SIGN_UP_START, 
    payload: user
})

export const signUpSuccess = (emailAndPassword) => ({
    type: UserActionTypes.SIGN_UP_SUCCESS,
    payload: emailAndPassword
})

export const signUpFailure = (error) => ({
    type: UserActionTypes.SIGN_UP_FAILURE,
    payload: error
})

export const CheckUserRoleSuccess = (role) => ({
    type: UserActionTypes.CHECK_USER_ROLE_SUCCESS,
    payload: role
})

export const CheckUserRoleFailure = (error) => ({
    type: UserActionTypes.CHECK_USER_ROLE_FAILURE,
    payload: error
})

let unsubcribe = null; 

export const CheckUserRoleAsync = () => {
    return dispatch => {
        unsubcribe = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                user.getIdTokenResult()
                .then((idTokenResult) => {
                    // Confirm the user is an Admin.
                    if (idTokenResult.claims.moderator) {
                        // Show moderator UI. 
                        // showModeratorUI(); 
                        dispatch(CheckUserRoleSuccess('moderator'))
                        console.log('Has moderator claims')
                    } else {
                        // Show regular user UI. 
                        // showRegularUI(). 
                        dispatch(CheckUserRoleSuccess('user'))
                        console.log('No moderator claims')
                    }
                })
                .catch((error) => {
                    console.log(error); 
                    dispatch(CheckUserRoleFailure('Can\'t get Id Token'))
                })
            } else {
              // No user is signed in.
              console.log('User not signed in')
              dispatch(CheckUserRoleFailure('User not signed in'))
            }
          });
    }
}

export const unsubcribeAuth = () => {
    return dispatch => {
        unsubcribe(); 
        console.log('Listener is unsubscribe')
    }
}
