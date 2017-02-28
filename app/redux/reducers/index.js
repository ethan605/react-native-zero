/**
 * @providesModule ZeroProj.Redux.Reducers
 */

import { combineReducers } from 'redux';

import auth from './auth';
import staticData from './staticData';

export default combineReducers({ auth, staticData });
