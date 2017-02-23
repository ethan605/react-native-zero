/**
 * @providesModule ZeroProj.Components.Reusables.Router.renderTitle
 */

/* eslint-disable no-unused-vars */
import React from 'react';
/* eslint-enable no-unused-vars */
import { Animated, Platform, StyleSheet } from 'react-native';

function sceneTransitionAnimation(position, titleOpacity, sceneIndex, direction) {
  const opacity = position.interpolate({
    inputRange: [sceneIndex - 1, sceneIndex, sceneIndex + 1],
    outputRange: [0, titleOpacity, 0],
  });

  let delta = 0;
  let translateX = 0;
  let translateY = 0;

  if (direction === 'vertical') {
    delta = 20;

    translateY = position.interpolate({
      inputRange: [sceneIndex - 1, sceneIndex + 1],
      outputRange: [delta, -delta],
    });
  } else { // Fallback to horizontal animation
    delta = 125;

    translateX = position.interpolate({
      inputRange: [sceneIndex - 1, sceneIndex + 1],
      outputRange: [delta, -delta],
    });
  }

  return {
    opacity,
    transform: [
      { translateX },
      { translateY },
    ],
  };
}

function renderAnimatedTitle(key, titleText, titleProps, titleStyle, animationStyle) {
  return (
    <Animated.Text
      key={key}
      style={[titleStyle, animationStyle]}
      lineBreakMode={'tail'}
      numberOfLines={1}
      {...titleProps}
    >
      {titleText}
    </Animated.Text>
  );
}

function renderTextTitle(navProps) {
  const { component, key, title, titleProps, titleStyle } = navProps;

  const { getSubTitle, getTitleAnimation } =
    component.WrappedComponent != null ? component.WrappedComponent : component;

  const subTitle = getSubTitle && getSubTitle(navProps);
  let titleAnimation = null;
  let subTitleAnimation = null;

  if (subTitle != null && getTitleAnimation != null) {
    titleAnimation = getTitleAnimation({ sceneKey: key, forSubTitle: false });
    subTitleAnimation = getTitleAnimation({ sceneKey: key, forSubTitle: true });
  }

  return [
    renderAnimatedTitle(`${key}_title`, title, titleProps, titleStyle, titleAnimation),
    subTitle == null
      ? null
      : renderAnimatedTitle(`${key}_subTitle`, subTitle, titleProps, titleStyle, subTitleAnimation),
  ];
}

function wrapTitleView(navProps, sceneIndex) {
  const {
    component, direction, key, position, titleOpacity, titleWrapperStyle,
  } = navProps;

  const { renderCustomTitle } =
    component.WrappedComponent != null ? component.WrappedComponent : component;

  const titleView = renderCustomTitle == null
    ? renderTextTitle(navProps) : renderCustomTitle(navProps);

  const animationStyle = sceneTransitionAnimation(position, titleOpacity, sceneIndex, direction);

  return (
    <Animated.View key={key} style={[styles.titleWrapper, titleWrapperStyle]}>
      <Animated.View style={animationStyle}>
        {titleView}
      </Animated.View>
    </Animated.View>
  );
}

export default function renderTitle(navProps) {
  const {
    component,
    navigationState: { children },
    position,
    titleOpacity, titleProps, titleStyle,
  } = navProps;

  const wrappedComponent = component.WrappedComponent != null
    ? component.WrappedComponent : component;

  const childrenProps = children.map(props => ({
    sceneStack: children.map(child => child.key),
    titleProps, titleOpacity, titleStyle,
    position, component: wrappedComponent,
    ...props,
  }));

  return childrenProps.map(wrapTitleView);
}

const styles = StyleSheet.create({
  titleWrapper: {
    left: 0,
    marginTop: 10,
    position: 'absolute',
    right: 0,
    top: Platform.select({ android: 5, ios: 20 }),
  },
});
