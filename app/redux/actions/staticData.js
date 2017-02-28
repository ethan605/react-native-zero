/**
 * @providesModule ZeroProj.Redux.Actions.StaticData
 */

import { STATIC_DATA } from '../types';

export function fetch(keys) {
  return { type: STATIC_DATA.FETCH, keys };
}

export function updated(partials) {
  return { type: STATIC_DATA.UPDATED, partials };
}
