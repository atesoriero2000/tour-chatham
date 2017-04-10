'use strict';

import React, { Component, } from 'react'
import {
  AppRegistry,
  StyleSheet,
  NavigatorIOS
} from 'react-native'

var Start = require('./Homepage/start');

class Welcome extends Component {

  render() {
    return (

      <NavigatorIOS
        style = {styles.container}
        initialRoute = {{
          title: 'Welcome',
          component: Start,
          passProps: {unmount: this.props.unmount}
        }}
        />
    );
  }
}

const styles = StyleSheet.create({

  container:{
    flex: 1,
  }
});

module.exports = Welcome;
