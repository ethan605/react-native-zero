/**
 * @providesModule ZeroProj.Redux.Store
 */

/* eslint-disable no-underscore-dangle */

import { applyMiddleware, createStore, compose } from 'redux';
import reducers from '../reducers';

/**
 * Configure to work with `redux-devtools-extensions` & `react-native-debugger`
 * https://github.com/jhen0409/react-native-debugger
 * https://github.com/zalmoxisus/redux-devtools-extension#12-advanced-store-setup
 */
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
  reducers,
  composeEnhancer(applyMiddleware(
    // Redux middleware
  ))
);

/* eslint-enable no-underscore-dangle */
