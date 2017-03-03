/**
 * @providesModule ZeroProj.Redux.Reducers.StaticData
 */

import { AXIOS_REQUEST_SUFFIXES } from '../constants';
import { SERVICE_API, STATIC_DATA } from '../types';

const DEFAULT_STATES = {};

export default function staticDataReducer(state = DEFAULT_STATES, action) {
  const { type } = action;
  
  if (type === SERVICE_API.GET_STATIC_DATA + AXIOS_REQUEST_SUFFIXES.SUCCESS) {
    const { data } = action.payload;
    return { ...state, ...data };
  }
  
  if (type === STATIC_DATA.UPDATED) {
    const { payload } = action;
    return { ...state, ...payload };
  }

  return state;
}
