/**
 * @providesModule ZeroProj.Redux.Store.axiosMiddleware
 */

import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import { createAction } from 'redux-actions';

// Constants
import { SERVICE_API } from 'app/constants/AppConstants';

// Locals
import { auth } from '../actions';
import { AXIOS_REQUEST_SUFFIXES } from '../constants';

const { ERROR, SUCCESS } = AXIOS_REQUEST_SUFFIXES;

const axiosClient = axios.create({
  baseURL: SERVICE_API.BASE_URI,
  responseType: 'json',
});

export default axiosMiddleware(axiosClient, {
  errorSuffix: ERROR,
  successSuffix: SUCCESS,
  onError: ({ action, dispatch, error }) => {
    const { UNAUTHORIZED } = SERVICE_API.RESPONSE_STATUSES;
    const { status } = error.response;

    // Deauthorize user on 401 status response
    if (status === UNAUTHORIZED) {
      dispatch(auth.deauthorize());
      return;
    }

    const { type, types } = action;
    const actionType = type == null ? types[types.length - 1] : type + ERROR;
    const errorAction = createAction(actionType);
    dispatch(errorAction(error));
  },
});
