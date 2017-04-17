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
  Dimensions,
} from 'react-native'

var Safety = require('./safety');
var AudioPage = require('./audio-page');
var Turns = require('./turns');

class Start extends Component {

  constructor(props){
    super(props);
    this.state = {
    };
  }

  componentWillUnmount(){
    //clearInterval(this.state.intervalID);
  }

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
      passProps: {unmount: this.props.unmount},
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
    width: Dimensions.get('window').width/1.25,
    height: 48,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    //opacity: 0.5,
    bottom: 50,
    transform: [{translateY:50}],
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
