/**
 * @providesModule ZeroProj.Utils.FontUtils
 */

import { Platform } from 'react-native';
import Singleton from 'singleton';

const SYSTEM_FONT = Platform.select({
  ios: 'System',
  android: 'SanFrancisco',
});
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
  // SF font weight: https://gist.github.com/anhari/02f930b6894cc30561c57892e893f540
  // Normal & Bold uses default fontWeight configs
  weights = FONT_WEIGHTS;

  build({
    align = 'left',
    background = 'transparent',
    color = 'black',
    family = SYSTEM_FONT,
    size = 13,
    style = 'normal',
    weight = 'regular',
    ...extraProps
  } = {}) {
    return {
      color,
      backgroundColor: background,
      fontFamily: family,
      fontSize: size,
      fontStyle: style,
      fontWeight: FONT_WEIGHTS[weight] || FONT_WEIGHTS.regular,
      textAlign: align,
      ...extraProps,
    };
  }
}

export default FontUtils.get();
