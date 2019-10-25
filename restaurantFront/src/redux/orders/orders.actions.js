import OrdersActionTypes from './orders.types'
import axios from 'axios';

import { firestore, convertCollectionsSnapshotToMapOrder, functions } from '../../firebase/firebase.utils'

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

            const collectionsMap = convertCollectionsSnapshotToMapOrder(snapshot)
            dispatch(fetchOrdersSuccess(collectionsMap))
        }).catch(error => dispatch(fetchOrdersFailure(error.message)))
    }
}

export const fetchAdminPendingOrdersStart = () => ({
    type: OrdersActionTypes.FETCH_ADMIN_PENDING_ORDERS_START
})

export const fetchAdminPendingOrdersSuccess = ordersMap => ({
    type: OrdersActionTypes.FETCH_ADMIN_PENDING_ORDERS_SUCCESS,
    payload: ordersMap
})

export const fetchAdminPendingOrdersFailure = errorMessage => ({
    type: OrdersActionTypes.FETCH_ADMIN_PENDING_ORDERS_FAILURE,
    payload: errorMessage
})

export const fetchAdminPendingOrdersAsync = () => {
    return dispatch => {
        const collectionRef = firestore.collection('orders'); 
        dispatch(fetchAdminPendingOrdersStart());

        collectionRef.where('status', '==', 'Pending').get().then(snapshot => {
            console.log(snapshot); 
            const collectionsMap = convertCollectionsSnapshotToMapOrder(snapshot)
            dispatch(fetchAdminPendingOrdersSuccess(collectionsMap))
        }).catch(error => dispatch(fetchAdminPendingOrdersFailure(error.message)))
    }
}


export const SetOrderStatusStart = () => ({
    type: OrdersActionTypes.SET_ORDER_STATUS_START
})

export const SetOrderStatusSuccess = () => ({
    type: OrdersActionTypes.SET_ORDER_STATUS_SUCCESS
})

export const SetOrderStatusFailure = errorMessage => ({
    type: OrdersActionTypes.SET_ORDER_STATUS_FAILURE,
    payload: errorMessage
})

export const SetOrderStatusAsync = (orderId, orderStatus ) => {
    return dispatch => {
        const collectionRef = firestore.collection('orders'); 
        dispatch(SetOrderStatusStart());

        collectionRef.doc(orderId).update({
            status: orderStatus
        }).then(snapshot => {
            console.log(snapshot);
            dispatch(SetOrderStatusSuccess()) 
        }).catch(error => dispatch(SetOrderStatusFailure(error.message)))
    }
}

export const AdminDeleteOrderStart = () => ({
    type: OrdersActionTypes.ADMIN_DELETE_ORDER_START
})

export const AdminDeleteOrderSuccess = () => ({
    type: OrdersActionTypes.ADMIN_DELETE_ORDER_SUCCESS
})

export const AdminDeleteOrderFailure = errorMessage => ({
    type: OrdersActionTypes.ADMIN_DELETE_ORDER_FAILURE,
    payload: errorMessage
})

export const AdminDeleteOrderAsync = (id) => {
    return dispatch => {
        const collectionRef = firestore.collection('orders'); 
        dispatch(AdminDeleteOrderStart());
        console.log(id);
        collectionRef.doc(id).delete().then(snapshot => {
            console.log(snapshot);
            dispatch(AdminDeleteOrderSuccess()) 
        }).catch(error => dispatch(AdminDeleteOrderFailure(error.message)))
    }
}

export const AddAdminStart = () => ({
    type: OrdersActionTypes.ADD_ADMIN_START
})

export const AddAdminSuccess = () => ({
    type: OrdersActionTypes.ADD_ADMIN_SUCCESS
})

export const AddAdminFailure = errorMessage => ({
    type: OrdersActionTypes.ADD_ADMIN_FAILURE,
    payload: errorMessage
})

export const AddAdminAsync = (adminEmail) => {
    return dispatch => {
        dispatch(AddAdminStart());
        console.log(adminEmail);
        axios({ 
            method: 'post', 
            url: 'http://localhost:5001/restaurant-45eb0/europe-west1/api/addadmin', 
            data: JSON.stringify(adminEmail),
            headers: { 
                'Content-Type': 'application/json'
            }
        }).then((result => {
            console.log(result); 
            dispatch(AddAdminSuccess())
        })).catch(error => dispatch(AddAdminFailure(error.message)))
    }
}