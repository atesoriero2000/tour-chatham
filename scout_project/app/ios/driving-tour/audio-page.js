'use strict';

import React, { Component, } from 'react'
import {
  AppRegistry,
  StyleSheet,
  NavigatorIOS,
  Text,
  View,
} from 'react-native'

class AudioPage extends Component {

  render() {
    return (
      <View style = {styles.container}>
        <Text style = {styles.text}>
          AUDIO PAGE
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    //backgroundColor: '#424ac1',
  },

  text:{
    fontSize: 50,
    color: 'black',
    fontWeight: '100',
    textAlign: 'center',
  },

});

module.exports = AudioPage;
