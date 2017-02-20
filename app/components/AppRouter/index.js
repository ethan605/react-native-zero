/**
 * @providesModule ZeroProj.Components.AppRouter
 */

import React from 'react';
import { Platform } from 'react-native';
import { Router, Scene } from 'react-native-router-flux';

// Components
import FirstScene from 'app/components/FirstScene';
import SecondScene from 'app/components/SecondScene';

// Constants
import RouterScenes from 'app/constants/RouterScenes';

// Locals
import animationStyle from './animationStyle';
import createReducer from './createReducer';
import { platformBasedPanHandlers } from './getPanHandlers';
import renderTitle from './renderTitle';
import styles from './styles';

const navigationBarBackgroundImage = require('app/assets/images/nav-bar-background.png');

const {
  FIRST_SCENE,
  SECOND_SCENE,
} = RouterScenes;

export default class AppRouter extends React.Component {
  componentDidMount() {
  }

  get routerProps() {
    return {
      animationStyle,
      createReducer,
      passProps: true,
      sceneStyle: styles.navScenes,
      ...platformBasedPanHandlers,
    };
  }

  get navigationProps() {
    return {
      // backButtonImage,
      // drawerImage,
      renderTitle,
      leftButtonStyle: styles.navButton,
      navigationBarStyle: styles.navBar,
      sceneStyle: styles.navScenes,
      titleStyle: styles.navTitle,
      ...platformBasedPanHandlers(),
      ...Platform.select({ ios: { navigationBarBackgroundImage } }),
    };
  }

  render() {
    const firstSceneProps = {
      ...this.navigationProps,
      component: FirstScene,
      title: 'ZeroProj',
    };

    const secondSceneProps = {
      ...this.navigationProps,
      component: SecondScene,
      title: 'Something Fancy',
    };

    return (
      <Router {...this.routerProps}>
        <Scene initial key={FIRST_SCENE} {...firstSceneProps} />
        <Scene key={SECOND_SCENE} {...secondSceneProps} />
      </Router>
    );
  }
}
