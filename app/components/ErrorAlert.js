/**
 * @providesModule ZeroProj.Components.ErrorAlert
 */

/* eslint-disable no-unused-vars */
import React from 'react';
/* eslint-enable no-unused-vars */
import { StyleSheet, Text, View } from 'react-native';
import Button from 'react-native-button';

// Components
import PopUp from 'app/components/Reusables/PopUp';

// Utils
import FontUtils from 'app/utils/FontUtils';

export default function ErrorAlert() {
  return (
    <PopUp
      backgroundColor="white"
      ref={ref => this.popUp = ref}
      tapToDismiss
    >
      <View style={styles.container}>
        <Text style={styles.instructionsText}>This is an error!</Text>
        <Text style={styles.instructionsText}>(Can be tapped to dismiss)</Text>
        <Button onPress={() => this.popUp.dismiss()} style={styles.buttonText}>
          Go back
        </Button>
      </View>
    </PopUp>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },

  instructionsText: FontUtils.build({
    size: 15,
  }),
  buttonText: FontUtils.build({
    color: '#3b5998',
    size: 20,
    weight: FontUtils.weights.semibold,
  }),
});
