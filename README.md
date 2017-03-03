# react-native-zero
React Native boilerplate project with highly customization via command line tools

## What is this?

`react-native-zero` is a template / boilerplate / starting-kit to help developers initialize new React Native projects a most robust & cleanest way.

## Why I have to use this?

You might get familiar with some other boilerplate tools out there, and this project isn't desire to change your habits. Just consider it's another way to start your new & awesome React Native app, which do the most of boring tasks automatically & highly configurable.

## What is already contained in this project?

These are 3rd party packages that will also be integrated in your newly created project:

* [lodash](https://lodash.com/)
* [moment](http://momentjs.com/)
* [react-native-button](https://github.com/ide/react-native-button)
* [react-native-code-push](http://microsoft.github.io/code-push/)
* [react-native-device-info](https://github.com/rebeccahughes/react-native-device-info)
* [react-native-fcm](https://github.com/evollu/react-native-fcm)
* [react-native-joi](https://github.com/GoldenOwlAsia/react-native-joi)
* [react-native-router-flux](https://github.com/aksonov/react-native-router-flux)
* [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons)
* [react-redux](https://github.com/reactjs/react-redux)
* [redux](http://redux.js.org/)
* [redux-actions](https://github.com/acdlite/redux-actions)
* [redux-axios-middleware](https://github.com/svrcekmichal/redux-axios-middleware)
* [redux-persist](https://github.com/rt2zz/redux-persist)
* [redux-reset](https://github.com/wwayne/redux-reset)
* [redux-thunk](https://github.com/gaearon/redux-thunk)
* [singleton](https://github.com/wlaurance/singleton)

Besides that, to conform AirBnb's [**JavaScript & React style guides**](https://github.com/airbnb/javascript/tree/master/), all neccessary rules are configured in `.eslintrc.json`. You can use this with whatever ESLint tools (like `SublimeLinter` for Sublime Text or `ESLint` for Visual Studio Code,...) to highlight invalid syntaxes in your codebase.

## How can I use this?

Simply following these steps:

### 1. Clone this project (don't worry about git configs, it can be configured later)

```shell
git clone git@github.com:ethan605/react-native-zero.git
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

`moduleName` will also be used as your app's name to be displayed on devices & `appName` section in CodePush commands. See more about this in [`codepush`: `release` and `staging` key](#codepush-release-and-staging-key) & [Preset Node scripts](#preset-node-scripts).

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

### 4. Run setup task to make changes

```shell
npm run zero
```

## Preset Node scripts

This project contains several preset Node scripts (can be found under `"script"` section of the main `package.json`)

### General scripts

```shell
npm start                 # Start React Native packager

npm run lint              # Check all code syntax under app/ directory using ESLint

npm run android-debug     # Build & run Android app in Debug mode
npm run android-release   # Build & run Android app in Release mode
npm run android-staging   # Build & run Android app in Staging mode

npm run ios-debug         # Build & run iOS app in Debug mode
npm run ios-release       # Build & run iOS app in Release mode
```

Notes: for iOS, there's missing `ios-staging` script, because `react-native-cli` accepts a `configuration` param to be passed throw `react-native run-ios` command, but our iOS Staging app is built & placed under `Production-iphonesimulator` or `Production-iphoneos` directory, so all the build processes using `react-native-cli` works fine until failed when installing & running in Simulators or Devices.

To workaround this problem, please open the Xcode project and select `<moduleName>-Staging` scheme, build & run as normal. This is the only task that can't be done in command line, hope that React Native could solve this soon.

### CodePush scripts

#### Check deployment history

```shell
npm run codepush-check -- Staging           # Staging deployments
npm run codepush-check -- Production        # Production deployments
```

#### Build & release new CodePush update

Once you've done with your new features (without adding new native libraries), there's few more steps to release them via CodePush.

Firstly, configure all the neccessary information under `./gulp-helpers/codepush/configs.json`:

```json
{
  "appName": "<your moduleName>",
  "buildNumber": "1",
  "deploymentName": "Staging",
  "versionName": "1.0.0"
}
```

Then bundle & release with single command:

```shell
npm run codepush-release
```

Notes that you can run this task with `--dry` flag to test whether the information is valid. There's no actual effects made, just output all the commands that will be executed:

```shell
npm run codepush-release -- --dry
```

## TODOs

### Features

* [ ] Firebase & `react-native-fcm`