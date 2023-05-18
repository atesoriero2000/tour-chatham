/**
 * @format
 */
// import React, { Component } from 'react';
import {
    AppRegistry,
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

//TODO: Better formatting to allow for adjustable font
Text.defaultProps = Text.defaultProps || {};
// Text.defaultProps.accessible = false; //TODO check what this does
Text.defaultProps.maxFontSizeMultiplier = 1; // the maximum amount the font size will scale. // TODO min? 
Text.defaultProps.allowFontScaling = false;

AppRegistry.registerComponent(appName, () => App);
