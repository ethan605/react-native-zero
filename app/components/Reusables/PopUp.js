/**
 * @providesModule ZeroProj.Components.Reusables.PopUp
 */

import React, { PropTypes } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';

// Utils
import DeviceUtils from 'app/utils/DeviceUtils';

const DEFAULT_DURATION = 200;

export default class PopUp extends React.Component {
  static propTypes = {
    children: PropTypes.any,
    duration: PropTypes.number,
    onBack: PropTypes.func,
    topDown: PropTypes.bool,
  };

  static defaultProps = {
    duration: DEFAULT_DURATION,
    onBack: null,
    topDown: false,
  };

  constructor(props) {
    super(props);

    this.onBack = props.onBack && props.onBack.bind(this);
    this.sceneOffset = new Animated.Value(this.hideOffset);
  }

  componentDidMount() {
    Animated.timing(this.sceneOffset, {
      duration: this.props.duration,
      toValue: 0,
    }).start();
  }

  /**
   * Offset to hide scene
   *  bottom-up = screen.height
   *  top-down = -screen.height
   */
  get hideOffset() {
    const mult = this.props.topDown ? -1 : 1;
    return mult * DeviceUtils.screen.height;
  }

  dismiss = () => {
    Animated.timing(this.sceneOffset, {
      duration: this.props.duration,
      toValue: this.hideOffset,
    }).start(this.dismissCallback);
  }

  dismissCallback = () => {
    Actions.pop({ duration: 0 });
    this.onBack();
  }

  render() {
    const containerStyle = [
      styles.container,
      { transform: [{ translateY: this.sceneOffset }] },
    ];

    return (
      <Animated.View style={containerStyle}>
        {this.props.children}
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
  },
});
