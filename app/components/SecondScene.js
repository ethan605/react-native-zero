/**
 * @providesModule ZeroProj.Components.SecondScene
 */

/* eslint-disable no-unused-vars */
import React from 'react';
/* eslint-enable no-unused-vars */
import { StyleSheet, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Button from 'react-native-button';

export default function SecondScene() {
  return (
    <View style={styles.container}>
      <Button onPress={Actions.pop}>
        Back to FirstScene
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
