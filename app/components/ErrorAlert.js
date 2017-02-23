/**
 * @providesModule ZeroProj.Components.ErrorAlert
 */

/* eslint-disable no-unused-vars */
import React from 'react';
/* eslint-enable no-unused-vars */
import { Text } from 'react-native';
import Button from 'react-native-button';

// Components
import PopUp from 'app/components/Reusables/PopUp';

export default function ErrorAlert() {
  return (
    <PopUp
      backgroundColor="white"
      ref={ref => this.popUp = ref}
      tapToDismiss
    >
      <Text>This is an error!</Text>
      <Text>(Can be tapped to dismiss)</Text>
      <Button onPress={() => this.popUp.dismiss()}>
        Go back
      </Button>
    </PopUp>
  );
}
