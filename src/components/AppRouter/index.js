/**
 * @providesModule ZeroProj.Components.AppRouter
 */

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

class AppRouter extends React.Component {
  componentDidMount() {
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          ZeroProj AppRouter
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

export default AppRouter;
