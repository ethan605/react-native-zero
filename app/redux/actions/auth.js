/**
 * @providesModule ZeroProj.Redux.Actions.Auth
 */

import { AUTH } from '../types';

export function authorized(userData) {
  return { type: AUTH.AUTHORIZED, userData };
}

export function deauthorized() {
  return { type: AUTH.DEAUTHORIZED };
}
