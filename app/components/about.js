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
import { sharedStyles, MyTheme, Scales } from './helpers/shared_styles';

const About = (props) => {

    const insets = useSafeAreaInsets();

  return (
      <ScrollView>
        <View style={{height: insets.top}}/> 
        <View style={styles.container}>

{/* Header Block */}
          <View style = {styles.block}>
            <Text style = {textStyles.textHeader}>
              About
            </Text>
            <Text style = {textStyles.text}>
              This app was created by Anthony Tesoriero, a local Chatham resident, as his Eagle Scout Project.
              In partnership with the Chatham Township Historical Society, Anthony created this audio tour
              to make the local history of Chatham more accessible for everyone through modern technology in an innovative way.
            </Text>
          </View>


{/* Me Pic */}
          <Image style = {styles.picture} source={require('../images/tony.jpg')} />


{/* Contributors */}
          <View style = {styles.block}>

            <View style = {styles.titleBox}>
              <Text style = {textStyles.titles}>Contributors</Text>
            </View>

            <View style = {styles.contributors}>
              {/* Column 1 */}
              <View style = {styles.columnBox}>
                <Text style = {textStyles.labels}>Development</Text>
                <Text style = {textStyles.fineText}>
                  {'Cat DeMatos\nEitan Miller\nEthan Aktins\nCarson Storm\nKismet Seekond\nPhil Rauch'}
                </Text>
              </View>

              {/* Column 2 */}
              <View style = {styles.columnBox}>
                <Text style = {textStyles.labels}>Audio</Text>
                <Text style = {textStyles.fineText}>
                  {'Grace Evans\nJacob Feeney\nKimberly Scaglione\nLilly McGrath\nMikey Behr\nOwen LaChance'}
                </Text>
              </View>

              {/* Column 3 */}
              <View style = {styles.columnBox}>
                <Text style = {textStyles.labels}>Historical Society</Text>
                <Text style = {textStyles.fineText}>
                  {'Pat Wells\nMartha Wells\nSheila Goggins\nDebbie Bucuk\nCaroline Knott'}
                </Text>
              </View>
            </View>

          </View>


{/* Contacts*/}
          <View style = {styles.block}>

            <View style = {styles.titleBox}>
              <Text style = {textStyles.titles}>Contact Information</Text>
            </View>

            <View style = {styles.contact}>
              <Text style = {textStyles.labels}>
                Developer
              </Text>
              <Text style = {textStyles.fineText}>Anthony Tesoriero</Text>
              <Text style = {[textStyles.fineText, sharedStyles.clickable]} selectable = {true} onPress={() => Linking.openURL("https://www.aptesoriero.com")}>www.aptesoriero.com</Text>
              <Text style = {[textStyles.fineText, sharedStyles.clickable]} selectable = {true} onPress={() => Linking.openURL("mailto:atesoriero2000@gmail.com?subject=Chatham%20Township%20Historical%20Society%20Driving%20Tour")}>atesoriero2000@gmail.com</Text>

                    {/* TODO use the clickable color? */}
              <Text style = {[textStyles.labels, sharedStyles.clickable]} onPress={() => Linking.openURL("http://www.chathamtownshiphistoricalsociety.org")}>
                Chatham Township Historical Society
              </Text>
              <Text style = {textStyles.fineText}>
                <Text style = {sharedStyles.clickable} selectable={true} onPress={() => Linking.openURL("https://maps.apple.com/?daddr=24+Southern+Blvd,+Chatham,+NJ&dirflg=d&t=m")}>
                  24 Southern Blvd, Chatham, NJ
                </Text>   •   <Text style = {sharedStyles.clickable} selectable={true} onPress={() => Linking.openURL("tel:973-635-4911")}>973-635-4911</Text>
              </Text>

              <Text style = {textStyles.fineText}>
                Museum Hours   •   2pm-4pm 1st Sunday each month
              </Text>
            </View>

          </View>
        </View>
      </ScrollView>
  );
}

const styles = StyleSheet.create({

  container:{
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 1245 * Scales.horizontal,
    marginBottom: '3%',
  },

  picture:{
    width: '100%',
    height: undefined, //needed
    aspectRatio: 2707/1523,
  }, 

  block: {
    width: '100%',
    justifyContent: 'flex-end',
  },

  titleBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },

  contributors:{
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',    
    alignContent: 'center',
    justifyContent: 'center',
    width: '100%',
  },

  columnBox:{
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '3%',
  },

  contact:{
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
});

const textStyles = StyleSheet.create({

  textHeader:{
    fontSize: 57 * Scales.font,
    color: 'black',
    fontWeight: MyTheme.defaultText.titleWeight,
    textAlign: 'center',
    paddingVertical: '8%',
  },

  text:{
    fontSize: 16.5 * Scales.font,
    color: MyTheme.defaultText.color,
    fontWeight: MyTheme.defaultText.weight,
    textAlign: 'center',
    paddingHorizontal: '10%',
  },

  titles:{
    flex: 1,
    fontSize: 35 * Scales.font,
    color: 'black',
    fontWeight: MyTheme.defaultText.titleWeight,
    textAlign: 'center',
  },

  fineText:{
    fontSize: 14 * Scales.font,
    color: MyTheme.defaultText.color,
    fontWeight: MyTheme.defaultText.weight,
    textAlign: 'center',
    padding: '.08%',
  },

  labels:{
    fontSize: 16 * Scales.font,
    color: 'dimgrey',
    fontWeight: MyTheme.about.labelWeight,
    textAlign: 'center',
    paddingBottom: '1%',
    paddingTop: '6%',
  },
});

module.exports = About;
