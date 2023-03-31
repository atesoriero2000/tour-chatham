'use strict';

import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Image,
  Text,
  Dimensions,
  TouchableHighlight,
  Button,
  Linking,
} from 'react-native'

import BackgroundGeolocation from "react-native-background-geolocation";
import styles from './helpers/shared_styles';
const d_window = Dimensions.get('window');

class Welcome extends Component {

  componentDidMount(){
    console.log(JSON.stringify(d_window));
  }

  render() {
    return (

      <View style={styles.container}>

        <Text style={styles.text}>
          Chatham Township Historical Society Driving Tour
        </Text>

        <Image style={styles.border} source={require('../images/logo_border.png')} />
        <Image style={styles.logo} source={require('../images/chs_logo.png')} />

        {/* <View style={styles.halfButtonView}>
          <TouchableHighlight style = {styles.halfButton}
            onPress = {() => this.toNews()}
            underlayColor = '#BBBBBB'>
            <Text style = {styles.buttonText}> News </Text>
          </TouchableHighlight>

          <TouchableHighlight style = {styles.halfButton}
            onPress = {() => this.props.toTour()}
            underlayColor = '#BBBBBB'>
            <Text style = {styles.buttonText}> Tour -> </Text>
          </TouchableHighlight>

        </View> */}

        <TouchableHighlight style = {styles.button}
          onPress = {() => this.toNews()}
          underlayColor = '#BBBBBB'>
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
