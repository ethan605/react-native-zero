/**
 * @providesModule ZeroProj.Redux.Actions.Auth
 */

import { AUTH } from '../types';

/**
 * @param accessLevel level of user's access,
 *  e.g.: `loading`, `not_authenticated`, `not_verified`, `trial`, `full_access`,...
 */
export function changeAccessLevel(accessLevel) {
  return {
    type: AUTH.CHANGE_ACCESS_LEVEL,
    accessLevel,
  };
}

/**
 * @param authType one of 'email', 'phone', 'username'
 * @param authValue email, phone or username related to `authType`
 */
export function signInWithPassword({ authType, authValue, password }) {
  return {
    type: AUTH.SIGN_IN_WITH_PASSWORD,
    authType,
    authValue,
    password,
  };
}

/**
 * @param provider name of single-sign-on provider: Facebook, Google, Twitter,...
 */
export function signInWithProvider({ accessToken, extraPayload, provider }) {
  return {
    type: AUTH.SIGN_IN_WITH_PROVIDER,
    accessToken,
    extraPayload,
    provider,
  };
}

export function signOut() {
  return {
    type: AUTH.SIGN_OUT,
  };
}
