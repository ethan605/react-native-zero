/**
 * @providesModule ZeroProj.Components.FirstScene
 */

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Button from 'react-native-button';

// Constants
import RouterScenes from 'app/constants/RouterScenes';

export default class FirstScene extends React.Component {
  onSecondScene = () => {
    const { SECOND } = RouterScenes;
    Actions[SECOND]();
  };

  onAlertError = () => {
    const { ERROR } = RouterScenes;
    Actions[ERROR]();
  }

  render() {
    return (
      <View style={styles.container}>
        <Button onPress={this.onSecondScene}>
          Go to SecondScene
        </Button>
        <Button onPress={this.onAlertError}>
          Alert error
        </Button>
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
});
