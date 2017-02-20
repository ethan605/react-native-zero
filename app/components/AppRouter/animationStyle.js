/**
 * @providesModule ZeroProj.Components.AppRouter.animationStyle
 */

export default function animationStyle({ layout, position, scene }) {
  const direction = (scene.navigationState && scene.navigationState.direction)
    ? scene.navigationState.direction
    : 'horizontal';

  const index = scene.index;
  const inputRange = [index - 1, index, index + 1];
  const width = layout.initWidth;
  const height = layout.initHeight;

  let translateX = 0;
  let translateY = 0;

  switch (direction) {
    case 'horizontal':
      translateX = position.interpolate({
        inputRange,
        outputRange: [width, 0, -50],         // default: [width, 0, -10]
      });
      break;
    
    case 'vertical':
      translateY = position.interpolate({
        inputRange,
        outputRange: [height, 0, 0],          // default: [height, 0, -10]
      });
      break;
  }

  return {
    transform: [
      { translateX },
      { translateY },
    ],
  };
}
