import PaymentActionTypes from './payment.types'

const INITIAL_STATE = {
    isFetching: false,
    errorMessage: undefined, 
    successMessage: null
}

const paymentReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case PaymentActionTypes.PAYMENT_START:
            return {
                ...state, 
                isFetching: true,
                successMessage: null,
                errorMessage: null
            }
        case PaymentActionTypes.PAYMENT_SUCCESS:
            return {
                ...state,
                isFetching: false,
                successMessage: "Item(s) successfully purchased. Please go to your Purchase History to see your latest order. Thank you."
            }
        case PaymentActionTypes.PAYMENT_FAILURE:
            return {
                ...state, 
                isFetching: false,
                errorMessage: "Something went wrong."
            }
        case PaymentActionTypes.CLEAR_SUCCESS_MESSAGE:
            return {
                ...state, 
                successMessage: null,
                errorMessage: null
            }
        default: 
            return state;
    }
}

export default paymentReducer; 