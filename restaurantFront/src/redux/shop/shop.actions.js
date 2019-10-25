import ShopActionTypes from './shop.types'

import { firestore, convertCollectionsSnapshotToMapFood } from '../../firebase/firebase.utils'


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
            const collectionsMap = convertCollectionsSnapshotToMapFood(snapshot)
            dispatch(fetchFoodsSuccess(collectionsMap))
        }).catch(error => dispatch(fetchFoodsFailure(error.message)))
    }
}


export const fetchSingleProductStart = () => ({
    type: ShopActionTypes.FETCH_SINGLE_PRODUCT_START
})

export const fetchSingleProductSuccess = food => ({
    type: ShopActionTypes.FETCH_SINGLE_PRODUCT_SUCCESS,
    payload: food
})

export const fetchSingleProductFailure = errorMessage => ({
    type: ShopActionTypes.FETCH_SINGLE_PRODUCT_FAILURE,
    payload: errorMessage
})

export const fetchSingleProductAsync = (foodId) => {
    return dispatch => {
        const collectionRef = firestore.collection('food'); 
        dispatch(fetchSingleProductStart());

        collectionRef.doc(foodId).get().then(snapshot => {
            console.log(snapshot);
            dispatch(fetchSingleProductSuccess(snapshot.data())) 
        }).catch(error => dispatch(fetchSingleProductFailure(error.message)))
    }
}


