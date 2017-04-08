'use strict';

import React, { Component, } from 'react'
import {
  AppRegistry,
  StyleSheet,
  NavigatorIOS,
  TouchableHighlight,
  View,
  Text,
  Alert,
} from 'react-native'

var Safety = require('./safety');
var AudioPage = require('./audio-page');

class Start extends Component {

  render() {
    return (
      <View style = {styles.container}>

        <Text style = {styles.text}>
          TOUR
        </Text>

        <TouchableHighlight style = {styles.button}
          onPress = {() => this.toAudio()}
          underlayColor = '#BBBBBB'>

            <Text style = {styles.buttonText}>
              Click to Continue
            </Text>
          </TouchableHighlight>

      </View>
    );
  }

  toSafety(){
    this.props.navigator.push({
      title: 'Driving Safety',
      component: Safety
    });
  }

  toAudio(){
    Alert.alert("SAFTEY", "SAFTEY INFO",[
      { text: "Ok, Proceed", onPress: () => this.NavToAudio()},
    ])
  }

  NavToAudio(){
    this.props.navigator.push({
      title: 'Audio Tour',
      component: AudioPage,
    });
  }
}

const styles = StyleSheet.create({

  container:{
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    //backgroundColor: '#424ac1',
  },

  button:{
    height: 36,
    backgroundColor: 'black',
    justifyContent: 'center',
    padding: 100,
  },

  text:{
    padding: 100,
    fontSize: 50,
    color: 'black',
    fontWeight: '100',
    textAlign: 'center',
  },

  buttonText:{
    fontSize: 18,
    color: 'white',
    fontWeight: '100',
  },
});

module.exports = Start;