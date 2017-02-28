/**
 * @providesModule ZeroProj.Utils.FontUtils
 */

import { Platform } from 'react-native';
import Singleton from 'singleton';
import _ from 'lodash';

/**
 * For custom fonts:
 * const FONT_FAMILY = Platform.select({ android: 'SanFrancisco', ios: 'System' })
 */
const FONT_FAMILY = 'System';
const FONT_ALIGNS = { center: 'center', left: 'left', right: 'right' };
const FONT_STYLES = { italic: 'italic', normal: 'normal' };

// SF font weight: https://gist.github.com/anhari/02f930b6894cc30561c57892e893f540
// Normal & Bold uses default fontWeight configs
const FONT_WEIGHTS = {
  bold:               'bold',
  light:              '200',
  medium:             '500',
  normal:             'normal',
  semibold:           '600',
  regular:            '400',
  ultralight:         '100',
};

function transformFontConfigs({ family, style, weight }) {
  const customConfigs = {
    fontFamily: `${family}${_.capitalize(weight)}${_.capitalize(style)}`,
    fontStyle: FONT_STYLES.normal,
    fontWeight: FONT_WEIGHTS.normal,
  };

  const defaultConfigs = {
    fontFamily: family,
    fontStyle: style,
    fontWeight: FONT_WEIGHTS[weight] || FONT_WEIGHTS.normal,
  };

  return Platform.select({
    // Use custom configs for custom fonts on Android
    android: family === 'System' ? defaultConfigs : customConfigs,
    ios: defaultConfigs,
  });
}

class FontUtils extends Singleton {
  aligns = FONT_ALIGNS;
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
    return {
      color,
      backgroundColor: background,
      fontSize: size,
      textAlign: align,
      ...extraProps,
      ...transformFontConfigs({ family, style, weight }),
    };
  }
}

export default FontUtils.get();
