'use strict';

import React, { Component, } from 'react'
import {
  AppRegistry,
  StyleSheet,
  View,
  Image,
  Text,
  Dimensions,
  TouchableHighlight,
  Button,
  Linking,
  NavigatorIOS,
} from 'react-native'

class Welcome extends Component {

  render() {
    return (

      <View style = {styles.container}>

      {/* faux navigation banner */}
        <View style = {styles.banner}>
          <Text style = {styles.bannerText}>Welcome</Text>
          <View style = {styles.bannerLine}/>
        </View>

        <Text style = {styles.text}>
          The Chatham Historical Society Driving Tour
        </Text>

        <Image style = {styles.logo} source = {require('../../images/chs_logo.jpg')}  />

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
    let url = "http://www.chathamtownshiphistoricalsociety.org/programsmeetings.html";
    Linking.canOpenURL(url).then(supported => {
      if (!supported) console.log('Can\'t handle url: ' + url);
      else return Linking.openURL(url);
    }).catch(err => console.error('An error occurred', err));
  }
}

const styles = StyleSheet.create({

  container:{
    flex: 1,
    alignItems: 'center',
  },

  banner:{
    height: 65 * (Dimensions.get('window').height/667),
    width: Dimensions.get('window').width,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
  },

  bannerText:{
    fontSize: 17 * (Dimensions.get('window').width/375),
    paddingTop: 31.5 * (Dimensions.get('window').height/667),
    paddingBottom: 12 * (Dimensions.get('window').height/667),
    fontWeight: '600',
  },

  bannerLine:{
    height: .5 * (Dimensions.get('window').height/667),
    width: Dimensions.get('window').width,
    backgroundColor: '#b9b9b9',
  },

  text:{
    paddingHorizontal: 35 * (Dimensions.get('window').width/375),
    paddingTop: 65.5 * (Dimensions.get('window').height/667),
    paddingBottom: 10 * (Dimensions.get('window').height/667),
    fontSize: 25 * (Dimensions.get('window').width/375),
    color: 'black',
    fontWeight: '100',
    textAlign: 'center',
    justifyContent: 'center',
    // backgroundColor: 'red',
  },

  logo:{
    width: Dimensions.get('window').width,
    height: 300 * (Dimensions.get('window').height/667),
    // backgroundColor: 'blue',
  },

  button:{
    width: Dimensions.get('window').width,
    height: 36 * (Dimensions.get('window').height/667),
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40 * (Dimensions.get('window').height/667),
    opacity: 0.5,
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
