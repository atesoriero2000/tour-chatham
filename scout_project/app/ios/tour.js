'use strict';

import React, { Component, } from 'react'
import {
  AppRegistry,
  StyleSheet,
  NavigatorIOS,
} from 'react-native'

var Start = require('./driving-tour/start');

class Tour extends Component {

  render() {
    return (

      <NavigatorIOS
        style ={styles.container}
        initialRoute={{
          title: 'Start Tour',
          component: Start,
        }}
        />
    );
  }
}

const styles = StyleSheet.create({

  container:{
    flex: 1,
  },
});

module.exports = Tour;
