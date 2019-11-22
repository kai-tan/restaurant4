import { createSelector } from 'reselect'

const selectOrder = state => state.order

const selectFirestore = state => state.firestore


export const selectOrders = createSelector(
    [selectOrder],
    order => order.orders
)

export const selectPendingOrders = createSelector(
    [selectOrder],
    order => order.adminPendingOrders
)

export const selectAdminAdded = createSelector(
    [selectOrder],
    order => order.adminAdded
)

export const selectFirebasePendingOrders = createSelector(
    [selectFirestore],
    firestore => firestore.ordered.orders ? firestore.ordered.orders.filter((order) => {
        return order.status !== "Completed" }) : ''
)

export const selectFirebaseCompletedOrders = createSelector(
    [selectFirestore],
    firestore => firestore.ordered.orders ? firestore.ordered.orders.filter((order) => {
        return order.status === "Completed" }) : ''
)

export const selectCompletedOrders = createSelector(
    [selectOrder],
    order => order.adminCompletedOrders
)

export const selectIsFetching = createSelector(
    [selectOrder],
    order => order.isFetching
)

export const selectFoodsForInitFetch = createSelector(
    [selectOrder],
    foods => foods ? Object.keys(foods).map(key => foods[key]) : []
)