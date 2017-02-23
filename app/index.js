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

// Constants
import { FEATURES } from './constants/Flags';

// Redux
import store from './redux/store';

const CODEPUSH_OPTIONS = {
  checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
  installMode: CodePush.InstallMode.IMMEDIATE,
};

class App extends React.Component {
  componentDidMount() {
  }

  render() {
    if (FEATURES.APP_EXPERIMENTALS)
      return <AppExperimentals />;

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="transparent" translucent barStyle="light-content" />
        <Provider store={store}>
          <AppRouter />
        </Provider>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CodePush(CODEPUSH_OPTIONS)(App);
