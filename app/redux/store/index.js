/**
 * @providesModule ZeroProj.Redux.Store
 */

/* eslint-disable no-underscore-dangle */

import { applyMiddleware, createStore, compose } from 'redux';
import { autoRehydrate } from 'redux-persist';
import reduxReset from 'redux-reset';
import reduxThunk from 'redux-thunk';

// Constants
import { DEBUGS } from 'app/constants/Flags';

// Locals
import reducers from '../reducers';
import { RESET_REDUX_STORE } from '../types';

import axiosMiddleware from './axiosMiddleware';
import createStorePersistor from './createStorePersistor';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  composeEnhancer(
    applyMiddleware(reduxThunk, axiosMiddleware),
    autoRehydrate({ log: DEBUGS.REDUX_PERSIST }),
    reduxReset(RESET_REDUX_STORE)
  )
);

createStorePersistor(store);

export default store;

/* eslint-enable no-underscore-dangle */
