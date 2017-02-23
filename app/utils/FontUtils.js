/**
 * @providesModule ZeroProj.Utils.FontUtils
 */

import { Platform } from 'react-native';
import _ from 'lodash';
import Singleton from 'singleton';

const FONT_FAMILY = Platform.select({
  android: 'SanFrancisco',
  ios: 'System',
});

const FONT_ALIGNS = {
  center: 'center',
  left: 'left',
  right: 'right',
};

const FONT_STYLES = {
  italic: 'italic',
  normal: 'normal',
};

// SF font weight: https://gist.github.com/anhari/02f930b6894cc30561c57892e893f540
// Normal & Bold uses default fontWeight configs
const FONT_WEIGHTS = {
  ultralight:         '100',
  light:              '200',
  regular:            '400',
  medium:             '500',
  semibold:           '600',
  normal:             'normal',
  bold:               'bold',
};

class FontUtils extends Singleton {
  aligns = FONT_ALIGNS;
  font = FONT_FAMILY;
  styles = FONT_STYLES;
  weights = FONT_WEIGHTS;

  build({
    align = FONT_ALIGNS.left,
    background = 'transparent',
    color = 'black',
    family = FONT_FAMILY,
    size = 13,
    style = FONT_STYLES.normal,
    weight = FONT_WEIGHTS.regular,
    ...extraProps
  } = {}) {
    const fontFace = Platform.select({
      android: {
        fontFamily: `${family}${_.capitalize(weight)}${_.capitalize(style)}`,
        fontStyle: FONT_STYLES.normal,
        fontWeight: FONT_WEIGHTS.normal,
      },
      ios: {
        fontFamily: family,
        fontStyle: style,
        fontWeight: FONT_WEIGHTS[weight] || FONT_WEIGHTS.normal,
      },
    });

    return {
      color,
      backgroundColor: background,
      fontSize: size,
      textAlign: align,
      ...extraProps,
      ...fontFace,
    };
  }
}

export default FontUtils.get();
