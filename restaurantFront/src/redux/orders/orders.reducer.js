import OrdersActionTypes from './orders.types'

const INITIAL_STATE = {
    orders: null,
    isFetching: false,
    errorMessage: undefined,
    adminPendingOrders: null, 
    adminCompletedOrders: null,
    status: 'Pending',
    adminAdded: false
}

const orderReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case OrdersActionTypes.FETCH_ORDERS_START:
            return {
                ...state, 
                isFetching: true
            }
        case OrdersActionTypes.FETCH_ORDERS_SUCCESS:
            return {
                ...state,
                isFetching: false, 
                orders: action.payload
            }
        case OrdersActionTypes.FETCH_ORDERS_FAILURE:
            return {
                ...state, 
                isFetching: false, 
                errorMessage: action.payload
            }
        case OrdersActionTypes.FETCH_ADMIN_PENDING_ORDERS_START:
            return {
                ...state, 
                isFetching: true
            }
        case OrdersActionTypes.FETCH_ADMIN_PENDING_ORDERS_SUCCESS:
            return {
                ...state,
                isFetching: false, 
                adminPendingOrders: action.payload
            }
        case OrdersActionTypes.FETCH_ADMIN_PENDING_ORDERS_FAILURE:
            return {
                ...state, 
                isFetching: false, 
                errorMessage: action.payload
            }
        case OrdersActionTypes.SET_ORDER_STATUS_START:
            return {
                ...state, 
                isFetching: true
            }
        case OrdersActionTypes.SET_ORDER_STATUS_SUCCESS:
            return {
                ...state,
                isFetching: false
            }
        case OrdersActionTypes.SET_ORDER_STATUS_FAILURE:
            return {
                ...state, 
                isFetching: false, 
                errorMessage: action.payload
            }
        case OrdersActionTypes.ADMIN_DELETE_ORDER_START:
            return {
                ...state, 
                isFetching: true
            }
        case OrdersActionTypes.ADMIN_DELETE_ORDER_SUCCESS:
            return {
                ...state,
                isFetching: false
            }
        case OrdersActionTypes.ADMIN_DELETE_ORDER_FAILURE:
            return {
                ...state, 
                isFetching: false, 
                errorMessage: action.payload
            }
        case OrdersActionTypes.ADD_ADMIN_START:
            return {
                ...state, 
                isFetching: true,
                adminAdded: false 
            }
        case OrdersActionTypes.ADD_ADMIN_SUCCESS:
            return {
                ...state,
                isFetching: false,
                adminAdded: true
            }
        case OrdersActionTypes.ADD_ADMIN_FAILURE:
            return {
                ...state, 
                isFetching: false, 
                adminAdded: false,
                errorMessage: action.payload
            }
        default: 
            return state;
    }
}

export default orderReducer; 