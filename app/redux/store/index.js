/**
 * @providesModule ZeroProj.Redux.Store
 */

import { applyMiddleware, createStore } from 'redux';

import reducers from '../reducers';

const store = createStore(
  reducers,
  undefined,
  applyMiddleware(),
);

export default store;
