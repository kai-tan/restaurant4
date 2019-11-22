import { createSelector } from 'reselect'

const selectShop = state => state.shop

const selectFireStore = state => state.firestore

export const selectFireStoreFood = createSelector(
    [selectFireStore],
    firestore => firestore.data.food
)

export const selectFireStoreOrderFood = createSelector(
    [selectFireStore],
    firestore => firestore.ordered.food
)

export const selectFireStoreOrderFoodPublished = createSelector(
    [selectFireStore],
    firestore => firestore.ordered.food ? firestore.ordered.food.filter((item) => {
        return item.published === true; 
    }): ''
)

export const selectCreateImage = createSelector(
    [selectShop],
    shop => shop.createImage
)

export const selectSuccessMessage = createSelector(
    [selectShop],
    shop => shop.successMessage
)

export const selectSingleEditScreenId = createSelector(
    [selectShop],
    shop => shop.singleEditScreenId
)

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
