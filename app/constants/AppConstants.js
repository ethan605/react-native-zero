/**
 * @providesModule ZeroProj.Constants.AppConstants
 */

/* eslint-disable no-underscore-dangle */
const isDevMode = global.__DEV__;
/* eslint-enable no-underscore-dangle */

// Service API
export const SERVICE_API = {
  API_VERSION: 'v1',
  BASE_URI: isDevMode
    ? 'https://dev.api-services.com'
    : 'https://api.api-services.com',
  PAGINATION: 20,
  REQUEST_METHODS: {
    DELETE: 'del',
    GET: 'get',
    POST: 'post',
    PUT: 'put',
  },
  RESPONSE_STATUSES: {
    BAD_GATEWAY: 502,
    BAD_REQUEST: 400,
    INTERNAL_SERVER_ERROR: 500,
    NOT_FOUND: 404,
    SERVICE_UNAVAILABLE: 503,
    SUCCESS: 200,
    UNAUTHORIZED: 401,
    UNPROCESSABLE_ENTITY: 422,
  },
};

// Date & time formats
export const FORMATS = {
  DATE_ID: 'YYYY-MM-DD',
  EXPIRATION_DATE: 'DD/MM/YYYY',
  JSON_DATE: 'YYYY-MM-DDTHH:mm:ss.SSSZ',
  JSON_DATE_UTC: 'YYYY-MM-DDTHH:mm:ss.SSS[Z]',
  TIME: 'HH:mm',
};

export const DUMMY = {
  EMPTY_DATA: '___EMPTY-DATA___',
  PLACEHOLDER_DATA: '___PLACEHOLDER-DATA___',
};
