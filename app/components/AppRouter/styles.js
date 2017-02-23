/**
 * @providesModule ZeroProj.Components.AppRouter.styles
 */

import { Platform, StyleSheet } from 'react-native';

// Utils
import FontUtils from 'app/utils/FontUtils';
import DeviceUtils from 'app/utils/DeviceUtils';

const { navBarHeight, navBarPadding } = DeviceUtils;

export default StyleSheet.create({
  navBar: {
    backgroundColor: '#3b5998',
    borderBottomWidth: 0,
    height: navBarPadding,
  },
  navButton: {
    alignItems: 'center',
    height: navBarHeight,
    justifyContent: 'center',
    left: 0,
    top: Platform.select({ ios: 20, android: 0 }),
    width: navBarHeight,
  },
  navTitle: FontUtils.build({
    align: 'center',
    color: 'white',
    size: 18,

    // Extra
    alignSelf: 'center',
    width: 200,
  }),

  navScenes: {
    flex: 1,
    paddingTop: navBarPadding,
    backgroundColor: 'white',
  },
});
