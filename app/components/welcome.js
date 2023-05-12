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
import { sharedStyles, MyTheme, d_window } from './helpers/shared_styles';

// import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
// import { useHeaderHeight } from '@react-navigation/elements';

// const tabBarHeight = useBottomTabBarHeight();
// const headerHeight = useHeaderHeight();


const Welcome = () => {


  return (
    <View style = {sharedStyles.container}>
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



const styles = StyleSheet.create({

  titleBox: {
    flex: 18,
    // backgroundColor: 'pink',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  titleText:{
    fontSize: MyTheme.welcome.titleFontSize,
    paddingHorizontal: '10%',
    color: 'black',
    fontWeight: MyTheme.welcome.titleFontWeight,
    textAlign: 'center',
  },

  borderBox: {
    flex: 1,
    // backgroundColor: 'blue',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  border:{
    width: '135%', //TODO
  },

  logoBox: {
    flex: 29,
    // backgroundColor: 'green',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo:{
    width: '100%',
  },
  
})

module.exports = Welcome;
