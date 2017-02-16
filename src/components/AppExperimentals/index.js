/**
 * @providesModule ZeroProj.Components.AppExperimentals
 */

import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import _ from 'lodash';

// Constants
import { FEATURES } from 'app/constans/Flags';

// Utils
import DeviceUtils from 'app/utils/DeviceUtils';
import Logger from 'app/utils/Logger';

if (FEATURES.GLOBAL_MODULES) {
  Object.assign(global, {
    _,
    DeviceUtils,
  });
}

class AppExperimentals extends React.Component {
  componentDidMount() {
  }

  onPress = () => {
    Logger.debug('invoke onPress');
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.onPress}>
          <Text style={styles.welcome}>
            ZeroProj AppExperimentals!
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

export default AppExperimentals;
