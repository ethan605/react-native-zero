/**
 * @providesModule ZeroProj.Redux.Reducers.Commons
 */

import { COMMONS } from '../types';

const DEFAULT_STATES = {
};

export default function commonsStates(state = DEFAULT_STATES, action) {
  if (action.type === COMMONS.REQUEST_REMOTE_RESOURCES)
    return {
      ...state,
      accessLevel: action.accessLevel,
    };

  return state;
}
