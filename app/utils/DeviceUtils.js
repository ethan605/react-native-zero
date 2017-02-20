/**
 * @providesModule ZeroProj.Utils.DeviceUtils
 */

import { Dimensions, Platform, StatusBar } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import Singleton from 'singleton';

const { height, width } = Dimensions.get('window');

const ANDROID_LOW_LEVEL_API = Platform.select({
  android: Platform.Version < 21,
  ios: false,
});
const PLATFORM_IS_IOS = (Platform.OS === 'ios');

class DeviceUtils extends Singleton {
  androidLowLevelApi = ANDROID_LOW_LEVEL_API;
  navigationBarHeight = Platform.select({ android : 54, ios: 44 });
  platformIsIOS = PLATFORM_IS_IOS;
  screen = { height, width };
  statusBarHeight = ANDROID_LOW_LEVEL_API ? 0 : 20;

  get buildInfo() {
    const bundleId = DeviceInfo.getBundleId();
    const version = DeviceInfo.getVersion();
    const buildNumber = parseInt(DeviceInfo.getBuildNumber());

    const bunldeIdParts = bundleId.split('.');
    const lastPart = bunldeIdParts[bunldeIdParts.length - 1];

    const suffix = (lastPart === 'dev' || lastPart === 'stg') ? lastPart : '';
    let variant = '';

    switch (suffix) {
      case 'dev': variant = 'debug'; break;
      case 'stg': variant = 'staging'; break;
      default: variant = 'release'; break;
    }

    return {
      buildNumber,
      variant,
      versionName: suffix === '' ? version : `${version}-${suffix}`,
    };
  }

  showNetworkActivity(visible) {
    if (!PLATFORM_IS_IOS) return;
    StatusBar.setNetworkActivityIndicatorVisible(visible);
  }

  showStatusBar(visible) {
    if (ANDROID_LOW_LEVEL_API) return;
    StatusBar.setHidden(!visible, 'slide');
  }
}

export default DeviceUtils.get();
