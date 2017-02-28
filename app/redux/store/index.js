/**
 * @providesModule ZeroProj.Redux.Store
 */

/* eslint-disable no-underscore-dangle */

import { applyMiddleware, createStore, compose } from 'redux';
import reducers from '../reducers';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
  reducers,
  composeEnhancer(applyMiddleware(
    // Redux middleware
  ))
);

/* eslint-enable no-underscore-dangle */
