/**
 * @providesModule ZeroProj.Components.AppRouter.styles
 */

import { Platform, StyleSheet } from 'react-native';

// Utils
import FontUtils from 'app/utils/FontUtils';
import DeviceUtils from 'app/utils/DeviceUtils';

export default StyleSheet.create({
  navBar: {
    backgroundColor: 'white',
    borderBottomWidth: 0,
    height: DeviceUtils.navBarPadding,
  },
  navTitle: FontUtils.build({
    align: 'center',
    color: 'black',
    size: 18,

    // Extra
    alignSelf: 'center',
    width: 200,
  }),
  navTitleWrapper: {
    left: 0,
    marginTop: 10,
    position: 'absolute',
    right: 0,
    top: Platform.select({ ios: 20, android: 5 }),
  },
  navSearchField: {
    height: DeviceUtils.navigationBarHeight,
    justifyContent: 'center',
    marginLeft: DeviceUtils.navigationBarHeight,
    marginRight: 16,
    marginTop: 0,
  },
  navButton: {
    alignItems: 'center',
    height: DeviceUtils.navigationBarHeight,
    justifyContent: 'center',
    left: 0,
    top: Platform.select({ ios: 20, android: 0 }),
    width: DeviceUtils.navigationBarHeight,
  },
  backButtonImage: {
    height: 16.5,
    width: 18,
  },
  navSearchButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: -10,
    marginTop: -10,
    right: 0,
    top: 0,
    width: DeviceUtils.navigationBarHeight * 2,
  },
  navSearchSessionsButton: {
    paddingHorizontal: (DeviceUtils.navigationBarHeight - 18) / 2,
  },

  // Pop-up navigation
  popUpNavBar: {
    backgroundColor: 'white',
    borderBottomWidth: 0,
    height: DeviceUtils.navigationBarHeight,
  },
  popUpNavTitleWrapper: Platform.select({
    android: { marginTop: 7, top: 7 },
    ios: { marginTop: 5, top: 5 },
  }),
  popUpNavButton: {
    alignItems: 'center',
    justifyContent: 'center',
    height: DeviceUtils.navigationBarHeight,
    marginTop: 0,
    top: 0,
    width: DeviceUtils.navigationBarHeight,
  },

  navScenes: {
    flex: 1,
    paddingTop: DeviceUtils.navBarPadding,
    backgroundColor: 'white',
  },
  modalScenes: {
    paddingTop: 0,
    backgroundColor: 'gray',
  },
});
