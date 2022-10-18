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

const d_window = Dimensions.get('window');

class Welcome extends Component {

  constructor(props){
    super(props);
    this.state = {
    };
  }

  componentDidMount(){
    console.log(JSON.stringify(d_window));
  }

  render() {
    return (

      <View style = {styles.container}>

        <Text allowFontScaling = {false} style = {styles.text}>
          Chatham Township Historical Society Driving Tour
        </Text>

        <Image style = {styles.border} source = {require('../../images/logo_border.png')}  />
        <Image style = {styles.logo} source = {require('../../images/chs_logo.png')}  />

        {/* <View style={styles.halfButtonView}>
          <TouchableHighlight style = {styles.halfButton}
            onPress = {() => this.toNews()}
            underlayColor = '#BBBBBB'>
            <Text allowFontScaling = {false} style = {styles.buttonText}> News </Text>
          </TouchableHighlight>

          <TouchableHighlight style = {styles.halfButton}
            onPress = {() => this.props.toTour()}
            underlayColor = '#BBBBBB'>
            <Text allowFontScaling = {false} style = {styles.buttonText}> Tour -> </Text>
          </TouchableHighlight>

        </View> */}

        <TouchableHighlight style = {styles.button}
          onPress = {() => this.toNews()}
          underlayColor = '#BBBBBB'>
          <Text allowFontScaling = {false} style = {styles.buttonText}> Upcoming Events </Text>
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

const styles = StyleSheet.create({

  container:{
    alignItems: 'center',
    justifyContent: 'center',
  },

  text:{
    paddingHorizontal: 25 * (d_window.width/375),
    paddingTop: 25 * Math.pow((d_window.height/667), 2),
    paddingBottom: 15 * Math.pow((d_window.height/667), 2),
    fontSize: 35 * (d_window.width/375),
    color: 'black',
    fontWeight: '100',
    textAlign: 'center',
    justifyContent: 'center',
  },

  border:{
    width: d_window.width,
    height: 13 * Math.pow((d_window.height/667), 2),
    marginBottom: 21.5 * Math.pow((d_window.height/667), 2),
  },

  logo:{
    width: d_window.width,
    height: 275 * (d_window.width/375),
  },

  button:{
    width: d_window.width,
    height: 36 * Math.pow((d_window.height/667), 2),
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 21.5 * Math.pow((d_window.height/667), 2) + (d_window.height === 812? 10:0),
    opacity: 0.5,
  },

  halfButton:{
    width: d_window.width/2,
    height: 36 * Math.pow((d_window.height/667), 2),
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
  },

  halfButtonView:{
    flex: 2,
    flexDirection: 'row',
    width: d_window.width,
    height: 36 * Math.pow((d_window.height/667), 2),
    justifyContent: 'center',
    marginTop: 21.5 * Math.pow((d_window.height/667), 2),
    opacity: 0.5,
  },

  buttonText:{
    fontSize: 17 * (d_window.width/375),
    color: 'white',
    fontWeight: '100',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

module.exports = Welcome;
