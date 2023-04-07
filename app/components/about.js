'use strict';

import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  ScrollView,
  Linking,
  SafeAreaView
} from 'react-native'
import sharedStyles from './helpers/shared_styles';

const d_window = Dimensions.get('window');

class About extends Component {

  render() {
    return (
        <ScrollView>
          {/* <SafeAreaView/> */}
          <View style={styles.safeArea}/>
          <View style={styles.container}>
            <Text style = {styles.textHeader}>
              About
            </Text>
            <Text style = {styles.text}>
              This app was created by Anthony Tesoriero, a local Chatham resident, as his Eagle Scout Project.
              In partnership with the Chatham Township Historical Society, Anthony created this audio tour
              to make the local history of Chatham more accessible for everyone through modern technology in an innovative way.
            </Text>

            <Image style = {styles.picture} source={require('../images/tony.jpg')} />


  {/* Contributors */}
            <Text style = {styles.titles}>Contributors</Text>
            <View style = {styles.contributors}>
              <View style = {{paddingHorizontal: 10 * (d_window.width/375)}}>
                <Text style = {styles.labels}>Development</Text>
                <Text style = {styles.fineText}>
                  {'Cat DeMatos\nEitan Miller\nEthan Aktins\nCarson Storm\nKismet Seekond\nPhil Rauch'}
                </Text>
              </View>

              <View style = {{paddingHorizontal: 10 * (d_window.width/375)}}>
                <Text style = {styles.labels}>Audio</Text>
                <Text style = {styles.fineText}>
                  {'Grace Evans\nJacob Feeney\nKimberly Scaglione\nLilly McGrath\nMikey Behr\nOwen LaChance'}
                </Text>
              </View>

            </View>

            <View>
              <Text style = {styles.labels}>Historical Society</Text>
              <Text style = {styles.fineText}>
                {'Pat Wells\nMartha Wells\nSheila Goggins\nDebbie Bucuk\nCaroline Knott'}
              </Text>
            </View>


  {/* Contacts*/}
            <Text style = {styles.titles}>Contact Information</Text>
            <View style = {styles.contact}>
              <Text style = {styles.labels}>
                Developer
              </Text>
              <Text style = {styles.fineText}>
                Name: Anthony Tesoriero
              </Text>
              <Text style = {styles.fineText}>
                Email: <Text selectable = {true} onPress={() => this.linkUrl("mailto:atesoriero2000@gmail.com?subject=Chatham%20Township%20Historical%20Society%20Driving%20Tour")}>atesoriero2000@gmail.com</Text>
              </Text>

              <Text style = {styles.labels} onPress={() => this.linkUrl("http://www.chathamtownshiphistoricalsociety.org")}>
                Chatham Township Historical Society
              </Text>
              <Text style = {styles.fineText}>
                <Text selectable={true} onPress={() => this.linkUrl("https://maps.apple.com/?daddr=24+Southern+Blvd,+Chatham,+NJ&dirflg=d&t=m")}>
                  24 Southern Blvd, Chatham, NJ
                </Text>   •   <Text selectable={true} onPress={() => this.linkUrl("tel:973-635-4911")}>973-635-4911</Text>
              </Text>

              <Text style = {styles.fineText}>
                Museum Hours   •   2pm-4pm 1st Sunday each month
              </Text>
            </View>
          </View>
        </ScrollView>
    );
  }
  linkUrl(url){
    Linking.canOpenURL(url).then(supported => {
      if (!supported) console.log('Can\'t handle url: ' + url);
      else return Linking.openURL(url);
    }).catch(err => console.log('An error occurred', err));
  }
}

const styles = StyleSheet.create({

  container:{
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10 * (d_window.height/667),
  },

  safeArea: {
    height: 30, //TODO, conditional safe area height
  },

  picture:{
    width: d_window.width,
    height: 211 * (d_window.width/375),
    marginTop: 50 * (d_window.height/667),
  },

  textHeader:{
    fontSize: 50 * (d_window.width/375),
    color: 'black',
    fontWeight: '100',
    textAlign: 'center',
    paddingVertical: 30 * (d_window.height/667),
  },

  text:{
    fontSize: 15 * (d_window.width/375),
    color: 'grey',
    fontWeight: '100',
    textAlign: 'center',
    paddingHorizontal: 40 * (d_window.width/375),
  },

  titles:{
    fontSize: 30 * (d_window.width/375),
    color: 'black',
    fontWeight: '100',
    textAlign: 'center',
    paddingTop: 50 * (d_window.height/667),
  },

  contributors:{
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: d_window.width,
  },

  contact: {
    width: d_window.width,
  },

  fineText:{
    fontSize: 13 * (d_window.width/375),
    color: 'grey',
    fontWeight: '100',
    textAlign: 'center',
    padding: .5 * (d_window.width/375),
  },

  labels:{
    fontSize: 15 * (d_window.width/375),
    color: 'dimgrey',
    fontWeight: '500',
    textAlign: 'center',
    paddingBottom: 3 * (d_window.height/667),
    paddingTop: 23 * (d_window.height/667),
  },
});

module.exports = About;
