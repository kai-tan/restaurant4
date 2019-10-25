import { createSelector } from 'reselect'

const selectShop = state => state.shop

export const selectFoods = createSelector(
    [selectShop],
    shop => shop.foods
)

export const selectIsFetching = createSelector(
    [selectShop],
    shop => shop.isFetching
)

export const selectSingleProduct = createSelector(
    [selectShop],
    shop => shop.singleProduct
)

export const selectFoodsForInitFetch = createSelector(
    [selectFoods],
    foods => foods ? Object.keys(foods).map(key => foods[key]) : []
)
