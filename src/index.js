/**
 * ZeroProj App index
 * @providesModule ZeroProj.App
 */

import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import CodePush from 'react-native-code-push';

const CODEPUSH_OPTIONS = {
  checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
  installMode: Platform.select({
    ios: CodePush.InstallMode.IMMEDIATE,
    android: CodePush.InstallMode.ON_NEXT_RESUME,
  }),
};

class App extends React.Component {
  componentDidMount() {
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to ZeroProj!
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

export default CodePush(CODEPUSH_OPTIONS)(App);
