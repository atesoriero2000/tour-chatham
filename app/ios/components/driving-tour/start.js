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
  ScrollView,
} from 'react-native'

import Swiper from 'react-native-swiper';

var Turns = require('./turns');
var AudioPage = require('./audio-page');
var SelectionPage = require('./selection-page');
var Safety = require('./test/safety');


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
        <Swiper showsButtons = {false} activedotColor = {'black'} index  = {0} loop = {false}>
            <View style = {styles.container}>
          <Text style = {styles.text}>
            TOUR OVERVIEW
          </Text>

          <TouchableHighlight style = {styles.button}
            onPress = {() => this.toNext()}
            underlayColor = '#BBBBBB'>
              <Text style = {styles.buttonText}>
                Click to Continue
              </Text>
          </TouchableHighlight>

          </View>

          <View style = {styles.container}>
          <Text style = {styles.text}>
          TOUR OVERVIEW
          </Text>

          <TouchableHighlight style = {styles.button}
          underlayColor = '#BBBBBB'>
            <Text style = {styles.buttonText}>
              Click to Continue vfhrtiuejd
            </Text>
          </TouchableHighlight>

          </View>

        </Swiper>

      </View>
    );
  }

  toNext(){
    Alert.alert('SAFTEY', '\n1) Please make sure you have a passenger. You will need a passenger to follow and read the directions as the come up on the phone screen.\n\n 2) If you miss a turn, safely navigate through adjacent road and proceed back to the instructed route.\n\n 3) Some locations have limited/ample parking. Please be cautious of your surrounding and pay attention to the specified parking directions.\n\n 4) some markers are on private property. Be courteous to others and mindful of trespassing.\n\n 5) Drive safely, the developer, the Chatham Township Historical Society, and associates of the app hold no liability for any incidents while using this app.',[
      { text: 'Ok, I Understand', onPress: () => this.NavToSelection()},
    ]);
  }

  NavToSafety(){
    this.props.navigator.push({
      title: 'Driving Safety',
      component: Safety
    });
  }

  NavToAudio(){
    this.props.navigator.push({
      title: 'Audio Tour',
      component: AudioPage,
      passProps: {unmount: this.props.unmount},
    });
  }

  NavToSelection(){
    this.props.navigator.push({
      title: 'Select a Location',
      component: SelectionPage,
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
    fontSize: 35 * (Dimensions.get('window').width/375),
    color: 'black',
    fontWeight: '100',
    textAlign: 'center',
    paddingHorizontal: 25 * (Dimensions.get('window').width/375),
    paddingVertical: 20 * (Dimensions.get('window').width/375),
  },

  buttonText:{
    fontSize: 18,
    color: 'white',
    fontWeight: '100',
  },
});

module.exports = Start;
