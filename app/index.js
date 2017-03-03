/**
 * ZeroProj App index
 * @providesModule ZeroProj.App
 */

import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import CodePush from 'react-native-code-push';
import { Provider } from 'react-redux';

// Components
import AppExperimentals from './components/AppExperimentals';
import AppRouter from './components/AppRouter';

// Controllers
import StaticDataController from './controllers/StaticDataController';

// Constants
import { FEATURES } from 'app/constants/Flags';

// Redux
import store from './redux/store';

const CODEPUSH_OPTIONS = {
  checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
  installMode: CodePush.InstallMode.IMMEDIATE,
};

class App extends React.PureComponent {
  componentDidMount() {
    // Do app-wide actions like hiding splash screen, etc...
  }

  render() {
    const AppCore = FEATURES.APP_EXPERIMENTALS ? AppExperimentals : AppRouter;

    return (
      <Provider store={store}>
        <View style={styles.container}>
          <StatusBar backgroundColor={'transparent'} translucent barStyle={'light-content'} />
          <StaticDataController />
          <AppCore />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CodePush(CODEPUSH_OPTIONS)(App);
