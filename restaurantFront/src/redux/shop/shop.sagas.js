import { all, takeLatest, call, put } from 'redux-saga/effects'

import { firestore, convertCollectionsSnapshotToMapFood } from '../../firebase/firebase.utils'

import { fetchFoodsSuccess, fetchFoodsFailure } from './shop.actions'

import ShopActionTypes from './shop.types'

export function* fetchFoodsAsync() {
    try {

        const collectionRef = firestore.collection('food'); 
        const snapshot = yield collectionRef.get(); 
        const foodsMap = yield call(convertCollectionsSnapshotToMapFood, snapshot)
        yield put(fetchFoodsSuccess(foodsMap))
    } catch (error) {
        yield put(fetchFoodsFailure(error.message))
    }
}


export function* fetchFoodsStart() {
    yield takeLatest(ShopActionTypes.FETCH_FOODS_START, fetchFoodsAsync)
}

export function* shopSagas() {
    yield all([call(fetchFoodsStart)]); 
}