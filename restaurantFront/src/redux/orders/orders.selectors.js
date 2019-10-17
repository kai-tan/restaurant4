import { createSelector } from 'reselect'

const selectOrder = state => state.order

export const selectOrders = createSelector(
    [selectOrder],
    order => order.orders
)

export const selectIsFetching = createSelector(
    [selectOrder],
    order => order.isFetching
)

export const selectFoodsForInitFetch = createSelector(
    [selectOrder],
    foods => foods ? Object.keys(foods).map(key => foods[key]) : []
)