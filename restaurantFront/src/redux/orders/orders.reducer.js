import OrdersActionTypes from './orders.types'

const INITIAL_STATE = {
    orders: null,
    isFetching: false,
    errorMessage: undefined
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
        default: 
            return state;
    }
}

export default orderReducer; 