import {createSelector} from 'reselect'; 

const selectUser = state => state.user; 

const selectFirebase = state => state.firebase


export const selectCurrentUser = createSelector(
    [selectUser], 
    (user) => user.currentUser
)

export const selectIsFetching = createSelector(
    [selectUser], 
    (user) => user.isFetching
)

export const selectCurrentRole = createSelector(
    [selectUser], 
    (user) => user.userRole
)

export const selectUserDetails = createSelector(
    [selectUser], 
    (user) => user.userDetails
)

export const selectIsError = createSelector(
    [selectUser], 
    (user) => user.error
)


export const selectFirebaseProviderId = createSelector(
    [selectFirebase],
    firebase => {return firebase.auth.providerData ? firebase.auth.providerData[0].providerId : '' }
)

export const selectIsMessage = createSelector(
    [selectUser], 
    (user) => user.message
)

export const selectFirebaseUpdatedDetails = createSelector(
    [selectFirebase],
    firebase => firebase
)