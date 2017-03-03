/**
 * @providesModule ZeroProj.Redux.Actions.StaticData
 */

import { createAction } from 'redux-actions';
import { STATIC_DATA } from '../types';

export const dataUpdated = createAction(STATIC_DATA.DATA_UPDATED);
