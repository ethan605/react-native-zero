/**
 * @providesModule ZeroProj.Redux.Reducers.Auth
 */

import { AUTH } from '../types';

const DEFAULT_STATES = {
  userData: null,
};

export default function authReducer(state = DEFAULT_STATES, action) {
  if (action.type === AUTH.AUTHORIZE) {
    const { payload } = action;
    return { ...state, userData: payload };
  }

  if (action.type === AUTH.DEAUTHORIZE)
    return { ...state, userData: null };

  return state;
}
