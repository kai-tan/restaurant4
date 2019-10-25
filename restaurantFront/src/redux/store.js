import { createStore, applyMiddleware, compose } from 'redux'
import { persistStore } from 'redux-persist'
import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import thunk from 'redux-thunk'

import { createFirestoreInstance } from 'redux-firestore' // <- needed if using firestore
import firebase from '../firebase/firebase.utils'; 
import { rrfConfig } from '../firebase/firebase.utils';

import rootReducer from './root-reducer'
import rootSaga from './root-saga'


const sagaMiddleware = createSagaMiddleware()

const middlewares = [sagaMiddleware, thunk]

if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger)
}

const initialState = {}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(...middlewares)))

sagaMiddleware.run(rootSaga)

const persistor = persistStore(store); 

export const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance // <- needed if using firestore
  }

export { store, persistor }