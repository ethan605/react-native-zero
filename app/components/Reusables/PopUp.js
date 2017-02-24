/**
 * @providesModule ZeroProj.Components.Reusables.PopUp
 */

import React from 'react';
import { Animated, Dimensions, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';

const DEFAULT_DURATION = 200;
const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export default class PopUp extends React.PureComponent {
  static propTypes = {
    backgroundColor: React.PropTypes.string,
    children: React.PropTypes.any,
    duration: React.PropTypes.number,
    fade: React.PropTypes.bool,
    onDismiss: React.PropTypes.func,
    tapToDismiss: React.PropTypes.bool,
    topDown: React.PropTypes.bool,
  };

  static defaultProps = {
    backgroundColor: 'transparent',
    duration: DEFAULT_DURATION,
    fade: false,
    onDismiss: null,
    tapToDismiss: false,
    topDown: false,
  };

  constructor(props) {
    super(props);

    this.onDismiss = props.onDismiss && props.onDismiss.bind(this);
    this.offsetY = new Animated.Value(this.endOffsetY);
    this.opacity = new Animated.Value(this.endOpacity);
  }

  componentDidMount() {
    const { duration } = this.props;

    Animated.parallel([
      Animated.timing(this.offsetY, { duration, toValue: 0 }),
      Animated.timing(this.opacity, { duration, toValue: 1 }),
    ]).start();
  }

  /**
   * Offset Y to hide scene
   *  fade = 0
   *  bottom-up = screen.height
   *  top-down = -screen.height
   */
  get endOffsetY() {
    const { fade, topDown } = this.props;

    if (fade) return 0;

    const mult = topDown ? -1 : 1;
    return mult * SCREEN_HEIGHT;
  }

  /**
   * Opacity to hide scene
   *  fade = 0
   *  bottom-up = 1
   *  top-down = 1
   */
  get endOpacity() {
    const { fade } = this.props;
    return fade ? 0 : 1;
  }

  dismiss = () => {
    const { duration } = this.props;

    Animated.parallel([
      Animated.timing(this.offsetY, { duration, toValue: this.endOffsetY }),
      Animated.timing(this.opacity, { duration, toValue: this.endOpacity }),
    ]).start(this.dismissCallback);
  }

  dismissCallback = () => {
    Actions.pop();
    this.onDismiss && this.onDismiss();
  }

  render() {
    const { backgroundColor, tapToDismiss } = this.props;

    const containerStyle = [
      styles.container,
      { backgroundColor },
      {
        opacity: this.opacity,
        transform: [
          { translateY: this.offsetY },
        ],
      },
    ];

    return (
      <TouchableWithoutFeedback onPress={tapToDismiss ? this.dismiss : () => {}}>
        <Animated.View style={containerStyle}>
          {this.props.children}
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
  },
});
