/**
 * @providesModule ZeroProj.Components.SecondScene
 */

/* eslint-disable no-unused-vars */
import React from 'react';
/* eslint-enable no-unused-vars */
import { StyleSheet, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Button from 'react-native-button';

// Utils
import FontUtils from 'app/utils/FontUtils';

export default function SecondScene() {
  return (
    <View style={styles.container}>
      <Button onPress={Actions.pop} style={styles.buttonText}>
        Back to FirstScene
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  buttonText: FontUtils.build({
    color: '#3b5998',
    size: 20,
    weight: FontUtils.weights.semibold,
  }),
});
