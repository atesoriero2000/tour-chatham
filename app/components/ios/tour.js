'use strict';

import React, { Component } from 'react'
import {
  Dimensions,
} from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import Icon from 'react-native-vector-icons/Ionicons';
const d_window = Dimensions.get('window');

var Start = require('./driving-tour/start');
var SelectionPage = require('./driving-tour/selection-page');
var InfoPage = require('./driving-tour/info-page');
var AudioPage = require('./driving-tour/audio-page');

const Stack = createNativeStackNavigator();

class Tour extends Component {

  render() {
      return (
      <Stack.Navigator sceneContainerStyle={{backgroundColor: "white"}} screenOptions={{}}>
        <Stack.Screen name='Start the Tour!' component={Start} />
        <Stack.Screen name='Select a Start Point' component={SelectionPage} />
        <Stack.Screen name='Drive to Start Point' component={InfoPage} />
        <Stack.Screen name='Audio Tour' component={AudioPage} />
      </Stack.Navigator>

      );
  }
}


module.exports = Tour;