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

        <Image style = {styles.logo} source={require('../../images/chs_logo.jpg')} />

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
    height: 300 * (Dimensions.get('window').width/375),
  },

  container:{
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },

  text:{
    marginHorizontal: 20 * (Dimensions.get('window').width/375),
    marginBottom: 10 * (Dimensions.get('window').width/375),
    fontSize: 25 * (Dimensions.get('window').width/375),
    width: 300 * (Dimensions.get('window').width/375),
    color: 'black',
    fontWeight: '100',
    textAlign: 'center',
    justifyContent: 'center',
  },

  button:{
    width: Dimensions.get('window').width,
    height: 36 * (Dimensions.get('window').width/375),
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10 * (Dimensions.get('window').width/375),
    opacity: 0.5,
    bottom: -40 * (Dimensions.get('window').width/375),
  },

  buttonText:{
    fontSize: 18 * (Dimensions.get('window').width/375),
    color: 'white',
    fontWeight: '100',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

module.exports = Welcome;
