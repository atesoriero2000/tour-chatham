// comes from tour page
// scroll view of 12 locations
// passes selected "loc" and index to info page

import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  ScrollView,
  Alert,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native'

import { sharedStyles, d_window } from '../helpers/shared_styles';

var Locations = require('../helpers/turns');

class SelectionPage extends Component{

  //TODO: not serialized data warning??
  // Seems to come from the stack navigatior
  // params.loc.toAudio.registerOnPlay (function)
  // cant send functions???
  navToInfo(location, index){
    this.props.navigation.navigate('Tour', {
      screen: 'Drive to Start Point',
      params: { loc: location, stage: index} });
  }

  alert(location, index){
    Alert.alert(
      'Course Confirmation',
      '\nFrom this location it will take about ' + location.time + ' minutes to finish the tour.\nYou may stop and pick up where you left off at any time.\nAll locations listed before this will not be toured. Is that ok?',
      [
        {text: 'Cancel'},
        {text: 'Yes this works', onPress: () => this.navToInfo(location, index), style: 'cancel'},
      ],
    );
  }

  render() {
    return(
      <View style = {styles.container}>
        <View style = {sharedStyles.headerBorder}/>
        <ScrollView> 
          { Locations.map( (loc, index) =>
              <TouchableOpacity onPress = {() => this.alert(loc, index)} key={Math.random()}>
                <View style={styles.locationContainer}>
                  <Image style={styles.image} source={loc.squareAtPic[0]}/>
                  <View style={styles.contents}>
                    <Text style={styles.text}> {loc.title} <Text style={styles.time}> ({loc.time} mins) </Text></Text>
                    <Text style={styles.buttonText}> {loc.address} </Text>
                  </View>
                </View>
              </TouchableOpacity>
            )
          }
          <View style={styles.bottomMargin}/> 
        </ScrollView>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },

  locationContainer:{
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    width: d_window.width,
    height: 75 * (d_window.height/667) - (d_window.height === 812? 10:0),
    marginTop: 10 * (d_window.height/667),
    backgroundColor: 'gainsboro', //#e6e6e6
  },

  contents:{

  }, //TODO \/ breaks formatting but was a typo

  content:{
    flex: 2,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    height: 50 * (d_window.height/667),
  },

  text:{
    fontSize: 16.3 * (d_window.width/375),
    color: 'black',
    fontWeight: '300',
    textAlign: 'left',
    letterSpacing: -.5 * (d_window.width/375),
  },

  time:{
    fontSize: 12.25 * (d_window.width/375),
    color: 'black',
    fontWeight: '300',
    textAlign: 'left',
    letterSpacing: -.65 * (d_window.width/375),
  },

  buttonText:{
    fontSize: 14 * (d_window.width/375),
    color: 'grey',
    fontWeight: '100',
    textAlign: 'left',
    marginTop: 2 * (d_window.height/667),
    letterSpacing: -.5  * (d_window.width/375),
  },

  image:{
    margin: 25/2 * (d_window.width/375),
    height: 50 * (d_window.width/375),
    width: 50 * (d_window.width/375),
    backgroundColor: 'transparent',
  },

  bottomMargin:{
    width: '100%',
    height: 10 * (d_window.height/667),
  },

});

module.exports = SelectionPage;
