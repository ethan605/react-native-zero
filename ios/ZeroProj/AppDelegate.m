/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>

#import <CodePush/CodePush.h>
@import FirebaseCore;
#import "RNFIRMessaging.h"

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
  [self configureFIR];
  
#ifdef DEBUG
  NSURL *jsCodeLocation = [[RCTBundleURLProvider sharedSettings]
                           jsBundleURLForBundleRoot:@"index.ios"
                           fallbackResource:nil];
#else
  NSURL *jsCodeLocation = [CodePush bundleURL];
#endif
  
  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"ZeroProj"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];
  
  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  return YES;
}

- (void)userNotificationCenter:(UNUserNotificationCenter *)center
       willPresentNotification:(UNNotification *)notification
         withCompletionHandler:(void (^)(UNNotificationPresentationOptions))completionHandler {
  [RNFIRMessaging willPresentNotification:notification withCompletionHandler:completionHandler];
}

- (void)userNotificationCenter:(UNUserNotificationCenter *)center
didReceiveNotificationResponse:(UNNotificationResponse *)response
         withCompletionHandler:(void (^)())completionHandler {
  [RNFIRMessaging didReceiveNotificationResponse:response withCompletionHandler:completionHandler];
}

- (void)application:(UIApplication *)application
didReceiveRemoteNotification:(nonnull NSDictionary *)userInfo
fetchCompletionHandler:(nonnull void (^)(UIBackgroundFetchResult))completionHandler {
  [RNFIRMessaging didReceiveRemoteNotification:userInfo fetchCompletionHandler:completionHandler];
}

- (void)configureFIR {
#ifdef DEBUG
  NSString *configsName = @"GoogleService-Info.dev";
#else
#ifdef STAGING
  NSString *configsName = @"GoogleService-Info.stg";
#else
  NSString *configsName = @"GoogleService-Info";
#endif
#endif
  
  NSString *configsPath = [[NSBundle mainBundle] pathForResource:configsName ofType:@"plist"];
  FIROptions *firebaseOptions = [[FIROptions alloc] initWithContentsOfFile:configsPath];
  [FIRApp configureWithOptions:firebaseOptions];
}

@end
