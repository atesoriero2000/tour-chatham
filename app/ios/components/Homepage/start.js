'use strict';

import React, { Component, } from 'react'
import {
  AppRegistry,
  StyleSheet,
  View,
  Image,
  Text,
  Dimensions,
  LayoutAnimation,
  TouchableHighlight,
  Button,
  NavigatorIOS
} from 'react-native'

var News = require('./news');

class Welcome extends Component {

  render() {
    return (

      <View style = {styles.container}>

        <Text style = {styles.text}>
          The Chatham Historical Society Driving Tour
        </Text>

        <Image style = {styles.logo} source={require('image!chs_logo')} />

        <TouchableHighlight style = {styles.button}
          onPress = {() => this.toNews()}
          underlayColor = '#BBBBBB'>

          <Text style = {styles.buttonText}>
            News ->
          </Text>

        </TouchableHighlight>

      </View>
    )
  }

  toNews(){
    this.props.navigator.push({
      title: 'News',
      component: News,
      passProps: {unmount: this.props.unmount},
    });
  }
}

const styles = StyleSheet.create({

  logo:{
    width: Dimensions.get('window').width,
    height: 300,
  },

  container:{
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },

  text:{
    marginHorizontal: 20,
    transform: [{translateY: -10}],
    fontSize: 25,
    width: 300,
    color: 'black',
    fontWeight: '100',
    textAlign: 'center',
    justifyContent: 'center',
  },

  button:{
    width: Dimensions.get('window').width,
    height: 36,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    opacity: 0.5,
    bottom: 50,
    transform: [{translateY:90}],
  },

  buttonText:{
    fontSize: 18,
    color: 'white',
    fontWeight: '100',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

module.exports = Welcome;
