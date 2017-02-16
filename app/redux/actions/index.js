/**
 * @providesModule ZeroProj.Redux.Actions
 */

import {
  requestRemoteResources,
  toggleLoadingSpinner,
  toggleRefreshControl,
  updateLoadingProgress,
  updateUserLocation,
} from './commons';

import accessLevelChanged from './auth';

// Commons acctions
export const commons = {
  requestRemoteResources,
  toggleLoadingSpinner,
  toggleRefreshControl,
  updateLoadingProgress,
  updateUserLocation,
};

// Auth actions
export const auth = {
  accessLevelChanged,
};
