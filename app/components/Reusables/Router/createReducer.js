/**
 * @providesModule ZeroProj.Components.Reusables.Router.createReducer
 */

import { Reducer } from 'react-native-router-flux';

// Constants
import { DEBUGS } from 'app/constants/Flags';

// Utils
import Logger from 'app/utils/Logger';

export default function createReducer(params) {
  const defaultReducer = new Reducer(params);
  return (state, action) => {
    if (DEBUGS.ROUTER_FLUX) {
      const { sceneKey } = action.scene || {};
      Logger.debug('[Router]', sceneKey == null ? '' : `sceneKey: ${sceneKey}`, action);
    }

    return defaultReducer(state, action);
  };
}
