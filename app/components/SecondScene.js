/**
 * @providesModule ZeroProj.Components.SecondScene
 */

import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class SecondScene extends React.Component {
  onBack = () => {
    Actions.pop();
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.onBack}>
          <Text style={styles.welcome}>
            Back to FirstScene
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
