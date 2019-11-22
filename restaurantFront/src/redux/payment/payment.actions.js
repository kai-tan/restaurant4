import PaymentActionTypes from './payment.types'

export const paymentStart = () => ({
    type: PaymentActionTypes.PAYMENT_START
})

export const paymentSuccess = () => ({
    type: PaymentActionTypes.PAYMENT_SUCCESS
})

export const paymentFailure = () => ({
    type: PaymentActionTypes.PAYMENT_FAILURE
})

export const clearSuccessMessage = () => ({
    type: PaymentActionTypes.CLEAR_SUCCESS_MESSAGE
})
