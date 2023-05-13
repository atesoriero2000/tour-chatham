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

import { sharedStyles, MyTheme, Scales } from '../helpers/shared_styles';

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
      <View style = {sharedStyles.container}>
        <View style = {sharedStyles.headerBorder}/>
        <ScrollView> 
          { Locations.map( (loc, index) =>
              <TouchableOpacity onPress = {() => this.alert(loc, index)} key={Math.random()}>
                <View style={styles.locationContainer}>
                  <Image style={styles.image} source={loc.squareAtPic[0]}/>
                  <View style={{}}>
                    <Text style={styles.text}> {loc.title} <Text style={styles.time}> ({loc.time} mins) </Text></Text>
                    <Text style={styles.buttonText}> {loc.address} </Text>
                  </View>
                </View>
              </TouchableOpacity>
            )
          }
          <View style={{marginBottom: styles.locationContainer.marginTop}}/> 
        </ScrollView>
      </View>
    );
  }
}


const styles = StyleSheet.create({

  locationContainer:{
    alignItems: 'center',
    flexDirection: 'row',
    width: Scales.width, //int value needed 
    marginTop: 15 * Scales.horizontal,
    backgroundColor: 'gainsboro', //#e6e6e6
  },

  text:{
    fontSize: 17 * Scales.font,
    color: 'black',
    fontWeight: MyTheme.selection.titleWeight,
    textAlign: 'left',
    letterSpacing: -.5 * Scales.font,
  },

  time:{
    fontSize: 12 * Scales.font,
    color: 'black',
    fontWeight: MyTheme.selection.titleWeight,
    textAlign: 'left',
    letterSpacing: -.7 * Scales.font,
  },

  buttonText:{
    fontSize: 14.5 * Scales.font,
    color: 'grey',
    fontWeight: MyTheme.defaultText.weight,
    textAlign: 'left',
    marginTop: 3 * Scales.horizontal,
    letterSpacing: -.5 * Scales.font,
  },

  image:{
    margin: 13 * Scales.horizontal,
    aspectRatio: 1,
    width: 55 * Scales.horizontal,
  },
});

module.exports = SelectionPage;
