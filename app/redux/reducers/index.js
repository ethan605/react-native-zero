/**
 * @providesModule ZeroProj.Redux.Reducers
 */

import { combineReducers } from 'redux';

import auth from './auth';

const reducers = combineReducers({
  auth,
});

export default reducers;
