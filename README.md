# react-native-zero
React Native boilerplate project with highly customization via command line tools

## What is this?

`react-native-zero` is a template / boilerplate / starting-kit to help developers initialize new React Native projects a most robust & cleanest way.

3rd party packages will be integrated in your newly created project:

* `lodash` (`^4.17.4`)
* `react-native-code-push` (`^1.17.0-beta`)
* `react-native-device-info` (`^0.9.9`)
* `react-native-router-flux` (`^3.37.0`)
* `react-native-vector-icons` (`^4.0.0`)
* `react-redux` (`^5.0.2`)
* `redux` (`^3.6.0`)
* `singleton` (`^1.0.0`)

## Why I have to use this?

You might get familiar with some other boilerplate tools out there, and this project isn't desire to change your habits. Just consider it's another way to start your new & awesome React Native app, which do the most of boring tasks automatically & highly configurable.

## How can I use this?

Simply following these steps:

### 1. Clone this project (don't worry about git configs, it can be configured later)

```shell
git clone git@github.com:ethan605/react-native-zero
```

### 2. Install NodeJS modules using `yarn`

#### If you don't have `yarn` yet, install it via `brew`

`brew install yarn`

#### Calling `yarn` install command from your root project directory

`yarn install`

### 3. Configure your new project with `configs.json` file under `./gulp-helper/zero/`

```json
{
  "packageName": "zero-app",
  "moduleName": "ZeroApp",
  "gitRemoteUrl": "git@github.com/ethan605/zero-app.git",
  "codepush": {
    "release": "code_push_release_key-AgG",
    "staging": "code_push_staging_key-AgG"
  },
  "android": {
    "applicationId": "com.zeroapp.android",
    "signingConfigs": {
      "storeFile": "ZEROAPP_RELEASE_STORE_FILE",
      "storePassword": "ZEROAPP_RELEASE_STORE_PASSWORD",
      "keyAlias": "ZEROAPP_RELEASE_KEY_ALIAS",
      "keyPassword": "ZEROAPP_RELEASE_KEY_PASSWORD"
    }
  },
  "ios": {
    "bundleId": "com.zeroapp.ios"
  }
}
```

#### `packageName`

This will be used to replace with your main `package.json`'s `"name"` key.

#### `moduleName`

React Native use a **module name** to connect between native code (`MainActivity.java` for Android & `AppDelegate.m` for iOS) and JavaScript code (`index.android.js` & `index.ios.js` for Android & iOS respectively). This should be in `PascalCase`, human readable & unique with other applications.

`moduleName` will also be used as your app's name to be displayed on devices. See more about app names in [`codepush`: `release` and `staging` key](#codepush-release-and-staging-key) section.

Plus, this project uses NodeJS's `@providesModule` declaration in header of each JavaScript file, which has format of `<moduleName>.something.ClassName`. Config this field uniquely will avoid naming collisions between your installed module names.

#### `gitRemoteUrl`

Point this to your git repository remote URL

#### `codepush`: `release` and `staging` key

iOS & Android projects are configured to conform CodePush's [**Multi-Deployment Testings**](https://github.com/Microsoft/react-native-code-push#multi-deployment-testing) guides. Place your Release & Staging deployment keys here to make CodePush's functions available for Release & Staging environments respectively.

Notes:

* There's no `debug` or `development` key here, because we no need to test CodePush under development environment.
* There's 3 build configs: `Debug`, `Release` & `Staging`. `Debug` & `Release` are set by default, while `Staging` is customized for you.
* For `Debug` mode, app is installed in device with `.dev` suffix in app's ID (`applicationId` 
for Android & `bundleId` for iOS) and `-DEV` suffix in app's name.
* For `Staging` mode, app is installed in device with `.stg` suffix in app's ID and `-STG` suffix in app's name.
* There's no additional changes on `Release` mode.

#### `android` options

You can configure `applicationId` for Android under this section.

The `signingConfigs` options is configured to conform React Native's offical document on [**Generating Signed APK**](https://facebook.github.io/react-native/docs/signed-apk-android.html).

#### `ios` options

There's only `bundleId` to be configured in iOS. Please note that we separate Android & iOS app IDs to enables your absolute control on this section.