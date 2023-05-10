'use strict';

import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Linking,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { sharedStyles, MyTheme, d_window } from './helpers/shared_styles';

const About = (props) => {

    const insets = useSafeAreaInsets();

  return (
      <ScrollView>
        <View style={{height: insets.top}}/>
        <View style={styles.container}>
          <Text style = {textStyles.textHeader}>
            About
          </Text>
          <Text style = {textStyles.text}>
            This app was created by Anthony Tesoriero, a local Chatham resident, as his Eagle Scout Project.
            In partnership with the Chatham Township Historical Society, Anthony created this audio tour
            to make the local history of Chatham more accessible for everyone through modern technology in an innovative way.
          </Text>

          <Image style = {styles.picture} source={require('../images/tony.jpg')} />


{/* Contributors */}
          <Text style = {textStyles.titles}>Contributors</Text>
          <View style = {styles.contributors}>
            <View style = {{paddingHorizontal: 10 * (d_window.width/375)}}>
              <Text style = {textStyles.labels}>Development</Text>
              <Text style = {textStyles.fineText}>
                {'Cat DeMatos\nEitan Miller\nEthan Aktins\nCarson Storm\nKismet Seekond\nPhil Rauch'}
              </Text>
            </View>

            <View style = {{paddingHorizontal: 10 * (d_window.width/375)}}>
              <Text style = {textStyles.labels}>Audio</Text>
              <Text style = {textStyles.fineText}>
                {'Grace Evans\nJacob Feeney\nKimberly Scaglione\nLilly McGrath\nMikey Behr\nOwen LaChance'}
              </Text>
            </View>

          </View>

          <View style = {{    backgroundColor: 'orange',}}>
            <Text style = {textStyles.labels}>Historical Society</Text>
            <Text style = {textStyles.fineText}>
              {'Pat Wells\nMartha Wells\nSheila Goggins\nDebbie Bucuk\nCaroline Knott'}
            </Text>
          </View>


{/* Contacts*/}
          <Text style = {textStyles.titles}>Contact Information</Text>
          <View style = {styles.contact}>
            <Text style = {textStyles.labels}>
              Developer
            </Text>
            <Text style = {textStyles.fineText}>Anthony Tesoriero</Text>
            <Text style = {textStyles.fineText} selectable = {true} onPress={() => Linking.openURL("https://www.aptesoriero.com")}>www.aptesoriero.com</Text>
            <Text style = {textStyles.fineText} selectable = {true} onPress={() => Linking.openURL("mailto:atesoriero2000@gmail.com?subject=Chatham%20Township%20Historical%20Society%20Driving%20Tour")}>atesoriero2000@gmail.com</Text>

{/* TODO use the clickable color? */}
            <Text style = {textStyles.labels} onPress={() => Linking.openURL("http://www.chathamtownshiphistoricalsociety.org")}>
              Chatham Township Historical Society
            </Text>
            <Text style = {textStyles.fineText}>
              <Text selectable={true} onPress={() => Linking.openURL("https://maps.apple.com/?daddr=24+Southern+Blvd,+Chatham,+NJ&dirflg=d&t=m")}>
                24 Southern Blvd, Chatham, NJ
              </Text>   •   <Text selectable={true} onPress={() => Linking.openURL("tel:973-635-4911")}>973-635-4911</Text>
            </Text>

            <Text style = {textStyles.fineText}>
              Museum Hours   •   2pm-4pm 1st Sunday each month
            </Text>
          </View>
        </View>
      </ScrollView>
  );
}


const styles = StyleSheet.create({

  container:{
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10 * (d_window.height/667), //TODO scaling
  },

  picture:{
    width: '100%',
    height: 211 * (d_window.width/375), //TODO: aspect and scaling
    // marginTop: 50 * (d_window.height/667),
  }, 

  contributors:{
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: 'pink',
  },

  contact: {
    width: '100%',
    // backgroundColor: 'purple',
  },
});

const textStyles = StyleSheet.create({

  textHeader:{
    fontSize: MyTheme.about.headerSize,
    color: 'black',
    fontWeight: MyTheme.defaultText.weight,
    textAlign: 'center',
    // paddingVertical: 30 * (d_window.height/667),
  },

  text:{
    fontSize: MyTheme.about.textSize,
    color: MyTheme.defaultText.defaultColor,
    fontWeight: MyTheme.defaultText.weight,
    textAlign: 'center',
    paddingHorizontal: MyTheme.defaultText.paddingHorizontal,
  },

  titles:{
    fontSize: MyTheme.about.titleSize,
    color: 'black',
    fontWeight: MyTheme.defaultText.weight,
    textAlign: 'center',
    // paddingTop: 50 * (d_window.height/667),
    backgroundColor: 'yellow',
  },

  fineText:{
    fontSize: MyTheme.about.fineTextSize,
    color: MyTheme.defaultText.color,
    fontWeight: MyTheme.defaultText.weight,
    textAlign: 'center',
    padding: .5,
  },


  //width=390 && 390/375=1.04
  labels:{
    fontSize: MyTheme.about.labelSize,
    color: 'dimgrey',
    fontWeight: '500',
    textAlign: 'center',
    // paddingBottom: 3 * (d_window.height/667),
    // paddingTop: 23 * (d_window.height/667),
  },
});

module.exports = About;
