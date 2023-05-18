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
import { sharedStyles, MyTheme, Scales } from './helpers/shared_styles';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useHeaderHeight } from '@react-navigation/elements';

const Welcome = () => {
  //Doesnt work in App.ios.js 
  Scales.insets = useSafeAreaInsets(); //Needed for formatting
  Scales.hasNotch = Scales.insets.top>20; //Needed for formatting
  Scales.tabBarHeight = useBottomTabBarHeight(); //TODO remove later (Not Needed)
  Scales.headerHeight = useHeaderHeight(); //TODO remove later (Not Needed)
  console.log(Scales);

  return (
    <View style = {[sharedStyles.container, {justifyContent: 'space-evenly'}]}>
       
        <Text style={styles.titleText}>
          Chatham Township Historical Society Driving Tour
        </Text>

        <Image style={styles.border} source={require('../images/logo_border.png')} />
        <Image style={styles.logo} source={require('../images/chs_logo.png')} />

        <TouchableHighlight style = {sharedStyles.button} 
        underlayColor={sharedStyles.button.underlayColor}
        onPress = {() => Linking.openURL("http://www.chathamtownshiphistoricalsociety.org/programsmeetings.html")}>
          <Text style = {sharedStyles.buttonText}> Upcoming Events </Text>
        </TouchableHighlight>
        
    </View>
  )
}


const styles = StyleSheet.create({
  
  titleText:{
    fontSize: 35 * Scales.font,
    paddingHorizontal: '10%',
    color: 'black',
    fontWeight: MyTheme.defaultText.titleWeight,
    textAlign: 'center',
  },

  border:{
    width: '135%',
  },

  logo:{
    height: undefined,
    width: '100%',
    aspectRatio: 400/289,
  },
  
})

module.exports = Welcome;
