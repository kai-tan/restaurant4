import { takeLatest, put, all, call } from 'redux-saga/effects'; 

import UserActionTypes from './user.types'

import { auth, googleProvider, facebookProvider, createUserProfileDocument, getCurrentUser } from '../../firebase/firebase.utils'
import { signInSuccess, signInFailure, signOutSuccess, signOutFailure, signUpSuccess, signUpFailure } from './user.actions';

export function* getSnapshotFromUserAuth(userAuth) {
    try {
        const userRef = yield call(createUserProfileDocument, userAuth)
        const userSnapshot = yield userRef.get()
        yield put(
            signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() })
        )
    } catch(error) {
        yield put(signInFailure(error))
    }
}

export function* signInWithGoogle() {
    try {
        
        const token = yield auth.signInWithPopup(googleProvider)
        token.user.getIdToken().then((token) => {
            localStorage.setItem("token", token);
        })
        yield getSnapshotFromUserAuth(token.user)
    } catch(error) {
        yield put(
            signInFailure(error)
        )
    }
}

export function* signInWithFacebook() {
    try {
        const token = yield auth.signInWithPopup(facebookProvider)
        token.user.getIdToken().then((token) => {
            localStorage.setItem("token", token);
        })
        yield getSnapshotFromUserAuth(token.user)
    } catch(error) {
        yield put(
            signInFailure(error)
        )
    }
}

export function* signInWithEmail({payload: { email, password }}) {
    try {
        const token = yield auth.signInWithEmailAndPassword(email, password)
        
        token.user.getIdToken().then((token) => {
            localStorage.setItem("token", token);
        })
        
        yield getSnapshotFromUserAuth(token.user)
    } catch(error) {
        yield put(signInFailure(error))
    }
}

export function* isUserAuthenticated() {
    try {
        const userAuth = yield getCurrentUser()
        if (!userAuth) return;
        yield getSnapshotFromUserAuth(userAuth)
    } catch(error) {
        yield put(signInFailure(error))
    }
}

export function* signOut() {
    try {
        yield auth.signOut()
        yield put(signOutSuccess())
    } catch(error) {
        yield put(signOutFailure(error))
    }
}

export function* signUp({payload: {email, password, displayName}}) {
    try {

        const { user } = yield auth.createUserWithEmailAndPassword(email, password)

        yield user.updateProfile({ displayName: displayName })

        yield createUserProfileDocument(user, { displayName })    

        yield put(signUpSuccess({email, password}))
        
    } catch(error) {
        yield put(signUpFailure(error))
    }
}



export function* onGoogleSignInStart() {
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

export function* onFacebookSignInStart() {
    yield takeLatest(UserActionTypes.FACEBOOK_SIGN_IN_START, signInWithFacebook)
}

export function* onEmailSignInStart() {
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail)
}

export function* onCheckUserSession() {
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated)
} 

export function* onSignOutStart() {
    yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut)
}

export function* onSignUpStart() {
    yield takeLatest(UserActionTypes.SIGN_UP_START, signUp)
}

export function* onSignUpSuccess() {
    yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInWithEmail)
}

export function* userSagas() {
    yield all([call(onGoogleSignInStart), call(onEmailSignInStart), call(onFacebookSignInStart), call(onCheckUserSession), call(onSignOutStart), call(onSignUpStart), call(onSignUpSuccess)]); 
}
