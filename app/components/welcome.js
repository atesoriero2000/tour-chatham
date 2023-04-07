'use strict';

import React, { Component } from 'react'
import {
  View,
  Image,
  Text,
  TouchableHighlight,
  Linking,
} from 'react-native'

import BackgroundGeolocation from "react-native-background-geolocation";
import styles from './helpers/shared_styles';
class Welcome extends Component {
  render() {
    return (
      <View style={styles.container}>

        <Text style={styles.text}>
          Chatham Township Historical Society Driving Tour
        </Text>

        <Image style={styles.border} source={require('../images/logo_border.png')} />
        <Image style={styles.logo} source={require('../images/chs_logo.png')} />

        <TouchableHighlight style = {styles.button} onPress = {() => this.toNews()}>
          <Text style = {styles.buttonText}> Upcoming Events </Text>
        </TouchableHighlight>

      </View>
    )
  }

  toNews(){
    let url = "http://www.chathamtownshiphistoricalsociety.org/programsmeetings.html";
    Linking.canOpenURL(url).then(supported => {
      if (!supported) console.log('Can\'t handle url: ' + url);
      else return Linking.openURL(url);
    }).catch(err => console.log('An error occurred', err));
  }

  // permissionsPopup(){
  //   BackgroundGeolocation.configure({ // NOTE: needed to force permissions popup on startup
  //     locationAuthorizationRequest: 'WhenInUse',
  //     debug: false,
  //     logLevel: BackgroundGeolocation.LOG_LEVEL_OFF,
  //   }, (state) => {
  //     console.log("- BackgroundGeolocation is configured and ready: ", state.enabled);
  //     if (!state.enabled) BackgroundGeolocation.start();
  //   });
  //   BackgroundGeolocation.stop();
  // }

}

module.exports = Welcome;
