import PaymentActionTypes from './payment.types'

const INITIAL_STATE = {
    isFetching: false,
    errorMessage: undefined 
}

const paymentReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case PaymentActionTypes.PAYMENT_START:
            return {
                ...state, 
                isFetching: true
            }
        case PaymentActionTypes.PAYMENT_SUCCESS:
            return {
                ...state,
                isFetching: false
            }
        case PaymentActionTypes.PAYMENT_FAILURE:
            return {
                ...state, 
                isFetching: false
            }
        default: 
            return state;
    }
}

export default paymentReducer; 