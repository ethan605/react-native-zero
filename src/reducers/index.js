/**
 * @providesModule ZeroProj.Reducers
 */

import { applyMiddleware, combineReducers, createStore } from 'redux';

import appRouterStates from './AppRouter';

const reducers = combineReducers({
  appRouterStates,
});

const store = createStore(
  reducers,
  undefined,
  applyMiddleware(),
);

export {
  reducers,
  store,
};
