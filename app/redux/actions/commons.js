/**
 * @providesModule ZeroProj.Redux.Actions.Commons
 */

import { COMMONS } from '../types';

export function requestRemoteResources({ component, isRequesting, payload }) {
  return {
    type: COMMONS.REQUEST_REMOTE_RESOURCES,
    component,
    isRequesting,
    payload,
  };
}

export function toggleLoadingSpinner({ component, isShowing, payload }) {
  return {
    type: COMMONS.TOGGLE_LOADING_SPINNER,
    component,
    isShowing,
    payload,
  };
}

export function toggleRefreshControl({ component, isRefreshing, payload }) {
  return {
    type: COMMONS.TOGGLE_REFRESH_CONTROL,
    component,
    isRefreshing,
    payload,
  };
}

export function updateLoadingProgress({ component, payload, percentage }) {
  return {
    type: COMMONS.UPDATE_LOADING_PROGRESS,
    component,
    payload,
    percentage,
  };
}

export function updateUserLocation(newLocation) {
  return {
    type: COMMONS.UPDATE_USER_LOCATION,
    newLocation,
  };
}
