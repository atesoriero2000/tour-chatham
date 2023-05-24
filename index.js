/**
 * @format
 */
import {
    AppRegistry,
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

AppRegistry.registerComponent(appName, () => App);
