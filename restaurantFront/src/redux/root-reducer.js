import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { firebaseReducer } from 'react-redux-firebase'
import { firestoreReducer } from 'redux-firestore' // <- needed if using firestore

import cartReducer from './cart/cart.reducer'
import shopReducer from './shop/shop.reducer'
import userReducer from './user/user.reducer'
import orderReducer from './orders/orders.reducer'
import paymentReducer from './payment/payment.reducer'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart', 'user']
}

const rootReducer = combineReducers({
    cart: cartReducer,
    shop: shopReducer,
    user: userReducer,
    order: orderReducer,
    payment: paymentReducer,
    firebase: firebaseReducer,
    firestore: firestoreReducer // <- needed if using firestore
})

export default persistReducer(persistConfig, rootReducer)