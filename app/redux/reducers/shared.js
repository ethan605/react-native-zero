/**
 * @providesModule ZeroProj.Redux.Reducers.Shared
 */

import _ from 'lodash';

// Utils
import DeviceUtils from 'app/utils/DeviceUtils';

// Locals
import { AXIOS_REQUEST_SUFFIXES } from '../constants';
import { SERVICE_API } from '../types';

const REQUEST_START_TYPES = [SERVICE_API.GET_STATIC_DATA];
const REQUEST_FINISH_TYPES = _.flatMap(
  Object.values(AXIOS_REQUEST_SUFFIXES),
  suffix => (REQUEST_START_TYPES.map(type => type + suffix))
);

const DEFAULT_STATES = {
  /**
   * For redux-persist auto rehydration.
   * This state will be set to true in `createStorePersistor` when the rehydration done
   * Use this everywhere to start any initialized actions AFTER this state is true
   */
  rehydrated: false,
  storeDataVersion: 1,
};

export default function sharedReducer(state = DEFAULT_STATES, action) {
  if (_.includes(REQUEST_START_TYPES, action.type)) {
    DeviceUtils.showNetworkActivity(true);
    return state;
  }
  
  if (_.includes(REQUEST_FINISH_TYPES, action.type)) {
    DeviceUtils.showNetworkActivity(false);
    return state;
  }

  return state;
}
