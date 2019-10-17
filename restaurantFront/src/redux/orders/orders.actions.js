import OrdersActionTypes from './orders.types'

import { firestore, convertCollectionsSnapshotToMapOrder } from '../../firebase/firebase.utils'

export const fetchOrdersStart = () => ({
    type: OrdersActionTypes.FETCH_ORDERS_START
})

export const fetchOrdersSuccess = ordersMap => ({
    type: OrdersActionTypes.FETCH_ORDERS_SUCCESS,
    payload: ordersMap
})

export const fetchOrdersFailure = errorMessage => ({
    type: OrdersActionTypes.FETCH_ORDERS_FAILURE,
    payload: errorMessage
})

export const fetchOrdersStartAsync = (userId) => {
    return dispatch => {
        const collectionRef = firestore.collection('orders'); 
        dispatch(fetchOrdersStart());

        
        collectionRef.where('userId', '==', userId).orderBy('createdAt', 'desc').get().then(snapshot => {
            console.log(snapshot); 
            const collectionsMap = convertCollectionsSnapshotToMapOrder(snapshot)
            dispatch(fetchOrdersSuccess(collectionsMap))
        }).catch(error => dispatch(fetchOrdersFailure(error.message)))
    }
}
