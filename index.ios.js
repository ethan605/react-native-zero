/**
 * ZeroProj iOS entry point
 * @providesModule ZeroProj.Entry.IOS
 */

/* eslint-disable no-unused-vars */
import React from 'react';
/* eslint-enable no-unused-vars */
import { AppRegistry } from 'react-native';
import App from './src';

export default function ZeroProj() {
  return <App />;
}

AppRegistry.registerComponent('ZeroProj', () => ZeroProj);
