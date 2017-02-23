/**
 * @providesModule ZeroProj.Components.Reusables.Router.renderBackButton
 */

/* eslint-disable no-unused-vars */
import React from 'react';
/* eslint-enable no-unused-vars */
import { Platform, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Button from 'react-native-button';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// Utils
import DeviceUtils from 'app/utils/DeviceUtils';

export default function renderBackButton() {
  const backIcon = Platform.select({
    android: <MaterialIcons color="white" name="arrow-back" size={30} />,
    ios: <Entypo color="white" name="chevron-left" size={35} />,
  });

  return (
    <Button containerStyle={styles.backButton} onPress={Actions.pop}>
      {backIcon}
    </Button>
  );
}

const styles = StyleSheet.create({
  backButton: {
    alignItems: 'flex-start',
    backgroundColor: 'transparent',
    height: DeviceUtils.navBarHeight,
    justifyContent: 'center',
    marginTop: -8,
    width: DeviceUtils.navBarHeight,
  },
});
