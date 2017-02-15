/**
 * @providesModule ESNext.Actions.Commons
 */

import DispatchTypes from 'app/constants/DispatchTypes';

export const loadingProgressChanged = (component, progress) => ({
  type: DispatchTypes.LOADING_PROGRESS_CHANGED,
  component,
  progress,
});

export const requestRemoteResources = (component, requesting, payload = {}) => ({
  type: DispatchTypes.REQUEST_REMOTE_RESOURCES,
  component,
  requesting,
  ...payload,
});

export const resetComponentStates = component => ({
  type: DispatchTypes.RESET_COMPONENT_STATES,
  component,
});

export const showLoadingSpinner = (component, show) => ({
  type: DispatchTypes.SHOW_LOADING_SPINNER,
  component,
  show,
});

export const showRefreshControl = (component, refresh, payload = {}) => ({
  type: DispatchTypes.SHOW_REFRESH_CONTROL,
  component,
  refresh,
  ...payload,
});

export const updateUserLocation = updated => ({
  type: DispatchTypes.UPDATE_USER_LOCATION,
  updated,
});
