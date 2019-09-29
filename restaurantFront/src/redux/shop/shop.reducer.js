import ShopActionTypes from './shop.types'

const INITIAL_STATE = {
    foods: null,
    isFetching: false,
    errorMessage: undefined
}

const shopReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case ShopActionTypes.FETCH_FOODS_START:
            return {
                ...state, 
                isFetching: true
            }
        case ShopActionTypes.FETCH_FOODS_SUCCESS:
            return {
                ...state,
                isFetching: false, 
                foods: action.payload
            }
        case ShopActionTypes.FETCH_FOODS_FAILURE:
            return {
                ...state, 
                isFetching: false, 
                errorMessage: action.payload
            }
        default: 
            return state;
    }
}

export default shopReducer; 