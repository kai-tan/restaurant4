import { createSelector } from 'reselect'

const selectPayment = state => state.payment

export const selectIsFetching = createSelector(
    [selectPayment],
    payment => payment.isFetching
)
