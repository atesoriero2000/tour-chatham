'use strict';

import React, { Component, } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} from 'react-native'

class About extends Component {

  render() {
    return (
      <View style = {styles.container}>
        <Text style = {styles.text}>
          ABOUT
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({

  container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
    //backgroundColor: '#424ac1',
  },

  text:{
    marginHorizontal: 20,
    fontSize: 50,
    color: 'black',
    fontWeight: '100',
    textAlign: 'center',
  },
});

module.exports = About;
