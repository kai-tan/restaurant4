import ShopActionTypes from './shop.types'

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils'


export const fetchFoodsStart = () => ({
    type: ShopActionTypes.FETCH_FOODS_START
})

export const fetchFoodsSuccess = foodsMap => ({
    type: ShopActionTypes.FETCH_FOODS_SUCCESS,
    payload: foodsMap
})

export const fetchFoodsFailure = errorMessage => ({
    type: ShopActionTypes.FETCH_FOODS_SUCCESS,
    payload: errorMessage
})

export const fetchFoodsStartAsync = () => {
    return dispatch => {
        const collectionRef = firestore.collection('collections'); 
        dispatch(fetchFoodsStart());

        collectionRef.get().then(snapshot => {
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot)
            dispatch(fetchFoodsSuccess(collectionsMap))
        }).catch(error => dispatch(fetchFoodsFailure(error.message)))
    }
}


