/**
 * @providesModule ZeroProj.Redux.Actions.Shared
 */

import { createAction } from 'redux-actions';
import { RESET_REDUX_STORE } from '../types';

export const resetStates = createAction(RESET_REDUX_STORE);
