/**
 * @format
 */

import {AppRegistry} from 'react-native';
import 'react-native-gesture-handler';
import {enableLatestRenderer} from 'react-native-maps';
import App from './App';
import {name as appName} from './app.json';

enableLatestRenderer();

AppRegistry.registerComponent(appName, () => App);
