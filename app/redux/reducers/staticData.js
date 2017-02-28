/**
 * @providesModule ZeroProj.Redux.Reducers.StaticData
 */

import { STATIC_DATA } from '../types';

const DEFAULT_STATES = {
  // Data keys & default values. E.g.:
  cities: [],
  remoteConfigs: {},

  // Fetch triggers
  fetchCounter: 0,
  fetchKeys: {},
};

export default function staticDataReducer(state = DEFAULT_STATES, action) {
  if (action.type === STATIC_DATA.FETCH) {
    const { fetchCounter } = state;
    const { keys } = action;

    // Trigger data fetching by increasing counter
    return {
      ...state,
      fetchCounter: fetchCounter + 1,
      fetchKeys: keys,
    };
  }

  if (action.type === STATIC_DATA.UPDATED) {
    const { partials } = action;

    return {
      ...state,
      ...partials,
      fetchKeys: {},      // clear fetchKeys to avoid mis-used cases
    };
  }

  return state;
}
