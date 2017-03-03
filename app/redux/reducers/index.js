/**
 * @providesModule ZeroProj.Redux.Reducers
 */

import { combineReducers } from 'redux';

import auth from './auth';
import shared from './shared';
import staticData from './staticData';

export default combineReducers({ auth, shared, staticData });
