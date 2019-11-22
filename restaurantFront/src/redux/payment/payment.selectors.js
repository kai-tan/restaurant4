import { createSelector } from 'reselect'

const selectPayment = state => state.payment

export const selectIsFetching = createSelector(
    [selectPayment],
    payment => payment.isFetching
)

export const selectIsSuccessMessage = createSelector(
    [selectPayment],
    payment => payment.successMessage
)

export const selectIsErrorMessage = createSelector(
    [selectPayment],
    payment => payment.errorMessage
)
