import  UserActionTypes from './user.types';
import firebase from '../../firebase/firebase.utils';
import axios from 'axios'; 

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
    payload: error.message
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
                    } else {
                        // Show regular user UI. 
                        // showRegularUI(). 
                        dispatch(CheckUserRoleSuccess('user'))
                    }
                })
                .catch((error) => {
                    dispatch(CheckUserRoleFailure('Can\'t get Id Token'))
                })
            } else {
              // No user is signed in.
              dispatch(CheckUserRoleFailure('User not signed in'))
            }
          });
    }
}

export const unsubcribeAuth = () => {
    return dispatch => {
        unsubcribe(); 
    }
}

export const FetchUserDetailsStart = () => ({
    type: UserActionTypes.FETCH_USER_DETAILS_START
})

export const FetchUserDetailsSuccess = (userDetails) => ({
    type: UserActionTypes.FETCH_USER_DETAILS_SUCCESS,
    payload: userDetails
})

export const FetchUserDetailsFailure = (error) => ({
    type: UserActionTypes.FETCH_USER_DETAILS_FAILURE,
    payload: error
})

export const FetchUserDetailsAsync = () => {
    return dispatch => {

        // dispatch(FetchUserDetailsStart())
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                const userDetails = {
                displayName: user.displayName, 
                email: user.email, 
                photoURL: user.photoURL
                }
                dispatch(FetchUserDetailsSuccess(userDetails))
            } else {
              // No user is signed in.
            }  
          });
       
    }
}


    export const SaveAllChangesStart = () => ({
        type: UserActionTypes.SAVE_ALL_CHANGES_START
    })
    
    export const SaveAllChangesSuccess = () => ({
        type: UserActionTypes.SAVE_ALL_CHANGES_SUCCESS
    })
    
    export const SaveAllChangesFailure = (error) => ({
        type: UserActionTypes.SAVE_ALL_CHANGES_FAILURE,
        payload: error
    })
    
    export const SaveAllChangesAsync = (itemDetails) => {
        return dispatch => {
            
            const { displayName, emailAddress, newPassword, confirmPassword} = itemDetails; 

            dispatch(SaveAllChangesStart())
            const unsubscribe = firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                        console.log(user);
                      user.updateProfile({
                        displayName: displayName,
                      }).then(function() {
                            console.log('Update Successfully')
                            if ( user.providerData[0].providerId === 'password') {

                                var existingPassword = prompt("Please enter your password");
                                    var credentials = firebase.auth.EmailAuthProvider.credential(
                                        user.email,
                                        existingPassword
                                      );
                                      return user.reauthenticateWithCredential(credentials)
                            } 
                      }).then(function() {
                        // User re-authenticated.
                        if (user.email === emailAddress) {
                            return; 
                        }
                        return user.updateEmail(emailAddress)
                        }).then(function() {
                            if ( user.providerData[0].providerId === 'google.com' || user.providerData[0].providerId === 'facebook.com' ) {
                                return; 
                            }
                            if ( !newPassword && !confirmPassword ) {
                                return; 
                            }

                            if ( newPassword !== confirmPassword ) {
                                throw new Error('Password entered does not match. Please try again.')
                            }

                            if ( newPassword && confirmPassword && newPassword === confirmPassword) {
                                
                                console.log('this runs!')   
                                return user.updatePassword(newPassword)
                            } else {
                                throw new Error('Password entered does not match. Please try again.')
                            }
                    
                      }).then(function() {
                        // Update successful.

                        dispatch(SaveAllChangesSuccess())
                      }).catch(function(error) {
                        // An error happened.
                        console.log(error);
                        dispatch(SaveAllChangesFailure(error))
                      });

                } else {
                  // No user is signed in.
                  console.log('not signed in')
                }   
              });

            unsubscribe(); 
           
        }
    }

    export const setErrorToNull = () => ({
        type: UserActionTypes.SET_ERROR_TO_NULL
    })
    
    export const removeMessage = () => ({
        type: UserActionTypes.REMOVE_MESSAGE
    })

    