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
import { sharedStyles, MyTheme } from './helpers/shared_styles';

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

        <TouchableHighlight style = {sharedStyles.button} 
          underlayColor={sharedStyles.button.underlayColor}
          onPress = {() => Linking.openURL("http://www.chathamtownshiphistoricalsociety.org/programsmeetings.html")}>
          <Text style = {sharedStyles.buttonText}> Upcoming Events </Text>
        </TouchableHighlight>

      </View>
    )
  }

  permissionsPopup(){
    //TODO
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
    fontSize: MyTheme.defaultText.titleFontSize,
    paddingHorizontal: MyTheme.defaultText.paddingHorizontal,
    color: 'black',
    fontWeight: MyTheme.defaultText.weight,
    textAlign: 'center',
  },

  borderBox: {
    flex: 2,
    // backgroundColor: 'blue',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  border:{
    width: '135%', //TODO
  },

  logoBox: {
    flex: 17,
    // backgroundColor: 'green',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  logo:{
    width: '100%',
  },
  
})

module.exports = Welcome;
