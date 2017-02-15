/**
 * @providesModule ZeroProj.Reducers.AppRouter
 */

import withDefaultProps from './withDefaultProps';
import DispatchTypes from 'app/constants/DispatchTypes';

// Utils
import AuthManager from 'app/utils/AuthManager';

// Components
import AppRouter from 'app/components/AppRouter';

const appRouterStates = (state, action) => {
  if (action.type === DispatchTypes.ACCESS_LEVEL_CHANGED)
    return {
      ...state,
      currentAccessLevel: AuthManager.accessLevel,
    };

  return state;
};

export default withDefaultProps(appRouterStates, AppRouter);
