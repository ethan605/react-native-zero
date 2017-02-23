/**
 * @providesModule ZeroProj.Redux.Reducers.Auth
 */

import { ACCESS_LEVELS } from '../constants';
import { AUTH } from '../types';

const DEFAULT_STATES = {
  accessLevel: ACCESS_LEVELS.APP_NOT_LOADED,
};

export default function auth(state = DEFAULT_STATES, action) {
  if (action.type === AUTH.CHANGE_ACCESS_LEVEL)
    return {
      ...state,
      accessLevel: action.accessLevel,
    };

  return state;
}
