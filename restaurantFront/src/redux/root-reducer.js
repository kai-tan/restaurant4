import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import cartReducer from './cart/cart.reducer'
import shopReducer from './shop/shop.reducer'
import userReducer from './user/user.reducer'
import orderReducer from './orders/orders.reducer'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart', 'user']
}

const rootReducer = combineReducers({
    cart: cartReducer,
    shop: shopReducer,
    user: userReducer,
    order: orderReducer
})

export default persistReducer(persistConfig, rootReducer)