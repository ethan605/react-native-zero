/**
 * @providesModule ZeroProj.Components.AppExperimentals
 */

import React from 'react';
import { StyleSheet, View } from 'react-native';
import Button from 'react-native-button';
import moment from 'moment';
import _ from 'lodash';

// Constants
import { FEATURES } from 'app/constants/Flags';

// Utils
import FontUtils from 'app/utils/FontUtils';
import Logger from 'app/utils/Logger';

// Locals
import withConnect from './withConnect';

if (FEATURES.GLOBAL_MODULES) {
  Object.assign(global, {
    moment,
    _,
  });
}

function Welcome({ onPress }) {
  return (
    <View style={styles.container}>
      <Button onPress={onPress} style={styles.welcomeText}>
        Make some experiments!
      </Button>
    </View>
  );
}

class AppExperimentals extends React.PureComponent {
  componentDidMount() {
  }

  onPress = () => {
    Logger.debug('invoke onPress');
  };

  render() {
    return <Welcome onPress={this.onPress} />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3b5998',
  },
  welcomeText: FontUtils.build({
    align: 'center',
    color: 'white',
    size: 20,
    weight: FontUtils.weights.bold,
  }),
});

export default withConnect(AppExperimentals);
