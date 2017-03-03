/**
 * @providesModule ZeroProj.Redux.Actions.Auth
 */

import { createAction } from 'redux-actions';
import { AUTH } from '../types';

export const authorize = createAction(AUTH.AUTHORIZE);
export const deauthorize = createAction(AUTH.DEAUTHORIZE);
