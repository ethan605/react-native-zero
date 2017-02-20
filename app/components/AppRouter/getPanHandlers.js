/**
 * @providesModule ZeroProj.Components.AppRouter.getPanHandlers
 *
 * Custom pan handlers for react-native-router-flux
 * works with react@15.4.2, react-native@0.40.0, react-native-router-flux@3.37.0
 *
 * Answered on Github Issue: https://github.com/aksonov/react-native-router-flux/issues/1237
 * Gist: https://gist.github.com/ethan605/705399906288b7c6ea3857b8f3db7d8f
 */

import { Platform, Dimensions, NavigationExperimental } from 'react-native';
import { Actions } from 'react-native-router-flux';

const {
  width: screenWidth,
  height: screenHeight,
} = Dimensions.get('window');

const {
  Card: { CardStackPanResponder: NavigationCardStackPanResponder },
} = NavigationExperimental;

const {
  Directions: { HORIZONTAL },
} = NavigationCardStackPanResponder;

const DEFAULT_PAN_RATIO = 0.8;

function convertPanSizeToPixel(panSize, baseDimension) {
  if (panSize == null || panSize < 0)
    return baseDimension * DEFAULT_PAN_RATIO;

  if (panSize < 1)
    return baseDimension * panSize;

  return panSize;
}

export default function getPanHandlers(configs = {}) {
  const {
    horizontalPanSize,
    horizontalOnBack,

    verticalPanSize,
    verticalOnBack,
  } = configs;

  const getPanHandlers = props => {
    const { direction: navDirection, onBack: navOnBack } = props.scene.navigationState;

    // If navigationState's direction is null, it is set to HORIZONTAL by default
    const isHorizontal = navDirection == null || navDirection === HORIZONTAL;

    const overridenProps = {};

    /**
     * onNavigateBack() should handler in priority of:
     * - passed onBack() handler
     * - navigationState's onBack()
     * - Actions.pop()
     */
    const passedOnBack = isHorizontal ? horizontalOnBack : verticalOnBack;
    const defaultOnBack = navOnBack != null ? navOnBack : Actions.pop;
    overridenProps.onNavigateBack = passedOnBack != null ? passedOnBack : defaultOnBack;

    // Enlarge gesture response distance
    overridenProps.gestureResponseDistance = isHorizontal
      ? convertPanSizeToPixel(horizontalPanSize, screenWidth)
      : convertPanSizeToPixel(verticalPanSize, screenHeight);

    const customProps = Object.assign({}, props, overridenProps);

    return isHorizontal
      ? NavigationCardStackPanResponder.forHorizontal(customProps)
      : NavigationCardStackPanResponder.forVertical(customProps);
  };

  return getPanHandlers;
}

export function platformBasedPanHandlers(configs = {}) {
  return Platform.select({
    ios: {
      getPanHandlers: getPanHandlers(configs),
    },
    android: {
      panHandlers: null,
    },
  });
}
