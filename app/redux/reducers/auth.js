/**
 * @providesModule ZeroProj.Redux.Reducers.Auth
 */

import { AUTH } from '../types';

const DEFAULT_STATES = {
  userData: null,
};

export default function authReducer(state = DEFAULT_STATES, action) {
  if (action.type === AUTH.AUTHORIZED) {
    const { userData } = action;
    return { ...state, userData };
  }

  if (action.type === AUTH.DEAUTHORIZED)
    return { ...state, userData: null };

  return state;
}
