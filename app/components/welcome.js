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

  Scales.insets = useSafeAreaInsets();
  Scales.hasNotch = Scales.insets.top>20; 
  Scales.tabBarHeight = useBottomTabBarHeight();
  Scales.headerHeight = useHeaderHeight();
  console.log(Scales); //TODO remove

  return (
    <View style = {sharedStyles.container}>
    {/* <View style = {[sharedStyles.container, {justifyContent: 'space-between', paddingVertical: 20 * Scales.horizontal}]}> */}

        <View style={[styles.titleBox, {flexGrow: Scales.hasNotch?.3:.2}]}>
          <Text style={styles.titleText}>
            Chatham Township Historical Society Driving Tour
          </Text>
        </View>

        <Image style={styles.border} source={require('../images/logo_border.png')} />
        <Image style={[styles.logo, {flexGrow: Scales.hasNotch&&.05}]} source={require('../images/chs_logo.png')} />

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
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    // backgroundColor: 'lightblue',
  },
  
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
