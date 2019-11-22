import ShopActionTypes from './shop.types'

const INITIAL_STATE = {
    foods: null,
    isFetching: false,
    errorMessage: undefined,
    singleProduct: null,
    newProduct: null,
    image: null,
    singleEditScreenId: null,
    createImage: null,
    successMessage: false 
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
        case ShopActionTypes.FETCH_SINGLE_PRODUCT_START:
            return {
                ...state, 
                isFetching: true
            }
        case ShopActionTypes.FETCH_SINGLE_PRODUCT_SUCCESS:
            return {
                ...state,
                isFetching: false, 
                singleProduct: action.payload
            }
        case ShopActionTypes.FETCH_SINGLE_PRODUCT_FAILURE:
            return {
                ...state, 
                isFetching: false, 
                errorMessage: action.payload
            }
        case ShopActionTypes.UPDATE_SINGLE_PRODUCT_START:
            return {
                ...state, 
                isFetching: true,
                successMessage: false
            }
        case ShopActionTypes.UPDATE_SINGLE_PRODUCT_SUCCESS:
            return {
                ...state,
                isFetching: false, 
                successMessage: true
            }
        case ShopActionTypes.UPDATE_SINGLE_PRODUCT_FAILURE:
            return {
                ...state, 
                isFetching: false, 
                errorMessage: action.payload,
                successMessage: false 
            }
        case ShopActionTypes.UPDATE_SINGLE_IMAGE_START:
            return {
                ...state
            }
        case ShopActionTypes.UPDATE_SINGLE_IMAGE_SUCCESS:
            return {
                ...state,
                isFetching: false, 
                image: action.payload
            }
        case ShopActionTypes.UPDATE_SINGLE_IMAGE_FAILURE:
            return {
                ...state, 
                isFetching: false, 
                errorMessage: action.payload
            }
        case ShopActionTypes.UPDATE_SINGLE_CREATE_IMAGE_SUCCESS:
            return {
                ...state,
                isFetching: false, 
                createImage: action.payload
                
            }
        case ShopActionTypes.UPDATE_SINGLE_CREATE_IMAGE_FAILURE:
            return {
                ...state, 
                isFetching: false, 
                errorMessage: action.payload
            }
        case ShopActionTypes.GO_TO_SINGLE_EDIT_SCREEN:
            return {
                ...state, 
                singleEditScreenId: action.payload
            }
        case ShopActionTypes.REMOVE_SINGLE_PRODUCT_ID:
            return {
                ...state, 
                singleEditScreenId: false
            }
        case ShopActionTypes.CREATE_SINGLE_PRODUCT_START:
            return {
                ...state,
                isFetching: true,
                successMessage: false
            }
        case ShopActionTypes.CREATE_SINGLE_PRODUCT_SUCCESS:
            return {
                ...state,
                isFetching: false, 
                successMessage: true
            }
        case ShopActionTypes.CREATE_SINGLE_PRODUCT_FAILURE:
            return {
                ...state, 
                isFetching: false, 
                errorMessage: action.payload,
                successMessage: false 
            }
        case ShopActionTypes.DELETE_SINGLE_PRODUCT_START:
            return {
                ...state,
                isFetching: true
            }
        case ShopActionTypes.DELETE_SINGLE_PRODUCT_SUCCESS:
            return {
                ...state,
                isFetching: false
            }
        case ShopActionTypes.DELETE_SINGLE_PRODUCT_FAILURE:
            return {
                ...state, 
                isFetching: false, 
                errorMessage: action.payload
            }
        case ShopActionTypes.REMOVE_CREATE_IMAGE:
            return {
                ...state, 
                createImage: null
            }
        case ShopActionTypes.REMOVE_MESSAGE:
            return {
                ...state, 
                successMessage: false 
            }
        default: 
            return state;
    }
}

export default shopReducer; 