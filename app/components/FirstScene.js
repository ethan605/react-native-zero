/**
 * @providesModule ZeroProj.Components.FirstScene
 */

/* eslint-disable no-unused-vars */
import React from 'react';
/* eslint-enable no-unused-vars */
import { StyleSheet, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Button from 'react-native-button';

// Constants
import RouterScenes from 'app/constants/RouterScenes';

// Utils
import FontUtils from 'app/utils/FontUtils';

export default function FirstScene() {
  return (
    <View style={styles.container}>
      <Button onPress={Actions[RouterScenes.SECOND]} style={styles.buttonText}>
        Go to SecondScene
      </Button>
      <Button onPress={Actions[RouterScenes.ERROR]} style={styles.buttonText}>
        Alert error
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
