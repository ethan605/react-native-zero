/**
 * @providesModule ZeroProj.Reducers.withDefaultProps
 */

// Utils
import DispatchTypes from 'app/constants/DispatchTypes';

export default function withDefaultProps(reducer, ComponentClass) {
  return (state, action) => {
    if (state == null ||
        (action.type === DispatchTypes.RESET_COMPONENT_STATES &&
         action.component === ComponentClass))
      return ComponentClass.defaultProps || {};

    return reducer(state, action);
  };
}
