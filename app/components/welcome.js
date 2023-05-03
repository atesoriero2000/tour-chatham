'use strict';

import React, { Component } from 'react'
import {
  View,
  Image,
  Text,
  TouchableHighlight,
  Linking,
  StyleSheet,
} from 'react-native'

import BackgroundGeolocation from "react-native-background-geolocation";
import { sharedStyles, d_window } from './helpers/shared_styles';

class Welcome extends Component {

  componentDidMount(){
    this.permissionsPopup();
  }

  render() {
    return (
      <View style={sharedStyles.container}>
        

        <View style={styles.titleBox}>
          <Text style={styles.titleText}>
            Chatham Township Historical Society Driving Tour
          </Text>
        </View>

        <View style={styles.borderBox}>
          <Image style={styles.border} source={require('../images/logo_border.png')} />
        </View>

        <View style={styles.logoBox}>
          <Image style={styles.logo} source={require('../images/chs_logo.png')} />
        </View>

        <TouchableHighlight style = {sharedStyles.button} onPress = {() => Linking.openURL("http://www.chathamtownshiphistoricalsociety.org/programsmeetings.html")}>
          <Text style = {sharedStyles.buttonText}> Upcoming Events </Text>
        </TouchableHighlight>

      </View>
    )
  }

  permissionsPopup(){
    
    // BackgroundGeolocation.configure({ // NOTE: needed to force permissions popup on startup
    //   locationAuthorizationRequest: 'WhenInUse',
    //   debug: false,
    //   logLevel: BackgroundGeolocation.LOG_LEVEL_OFF,
    // }, (state) => {
    //   console.log("- BackgroundGeolocation is configured and ready: ", state.enabled);
    //   if (!state.enabled) BackgroundGeolocation.start();
    // });
    // BackgroundGeolocation.stop();


    BackgroundGeolocation.requestPermission(); // uses message 1
    BackgroundGeolocation.requestTemporaryFullAccuracy("Driving").then( 
      (accuracyAuthorization) => console.log('[requestTemporaryFullAccuracy] STATUS:', accuracyAuthorization) 
      ).catch( (error) => console.warn("[requestTemporaryFullAccuracy] FAILED TO SHOW DIALOG: ", error) ); // uses message 2
  }
}


const styles = StyleSheet.create({

  titleBox: {
    flex: 9,
    // backgroundColor: 'pink',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  titleText:{
    fontSize: 35,
    paddingHorizontal: 35,
    color: 'black',
    fontWeight: '100',
    textAlign: 'center',
  },

  borderBox: {
    flex: 1,
    // backgroundColor: 'blue',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  border:{
    width: '120%',
  },

  logoBox: {
    flex: 19,
    // backgroundColor: 'green',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',

  },

  logo:{
    width: '100%',
    marginBottom: 100, //TODO: for button space, reference code for button
  },
  
})

module.exports = Welcome;
