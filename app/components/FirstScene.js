/**
 * @providesModule ZeroProj.Components.FirstScene
 */

import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Actions } from 'react-native-router-flux';

// Constants
import RouterScenes from 'app/constants/RouterScenes';

export default class FirstScene extends React.Component {
  onSecondScene = () => {
    const { SECOND_SCENE } = RouterScenes;
    Actions[SECOND_SCENE]();
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.onSecondScene}>
          <Text style={styles.welcome}>
            Go to SecondScene
          </Text>
        </TouchableOpacity>
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
