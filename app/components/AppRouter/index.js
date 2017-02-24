/**
 * @providesModule ZeroProj.Components.AppRouter
 */

import React from 'react';
import { Modal, Router, Scene } from 'react-native-router-flux';

// Components
import ErrorAlert from 'app/components/ErrorAlert';
import FirstScene from 'app/components/FirstScene';
import SecondScene from 'app/components/SecondScene';
import {
  animationStyle,
  createReducer,
  platformBasedPanHandlers,
  renderBackButton,
  renderTitle,
} from 'app/components/Reusables/Router';

// Constants
import RouterScenes from 'app/constants/RouterScenes';

// Locals
import styles from './styles';

const { ROOT, MODAL, FIRST, SECOND, ERROR } = RouterScenes;

export default class AppRouter extends React.PureComponent {
  get routerProps() {
    return {
      animationStyle,
      createReducer,
      passProps: true,
    };
  }

  get navigatorProps() {
    return {
      renderTitle,
      leftButtonStyle: styles.navButton,
      navigationBarStyle: styles.navBar,
      sceneStyle: styles.navScenes,
      titleStyle: styles.navTitle,
      ...platformBasedPanHandlers(),
    };
  }

  render() {
    const firstSceneProps = { component: FirstScene, title: 'ZeroProj' };
    const secondSceneProps = { renderBackButton, component: SecondScene, title: 'Something Fancy' };

    return (
      <Router {...this.routerProps}>
        <Scene component={Modal} key={MODAL}>
          <Scene key={ROOT} {...this.navigatorProps}>
            <Scene initial key={FIRST} {...firstSceneProps} />
            <Scene key={SECOND} {...secondSceneProps} />
          </Scene>
          <Scene component={ErrorAlert} key={ERROR} />
        </Scene>
      </Router>
    );
  }
}
