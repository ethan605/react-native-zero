/**
 * @providesModule ZeroProj.Redux.Reducers
 */

import { combineReducers } from 'redux';

import authStates from './auth';

const reducers = combineReducers({
  auth: authStates,
});

export default reducers;
