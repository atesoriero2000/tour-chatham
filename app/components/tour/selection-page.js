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

  navToInfo(location, index){
    let {atAudio, toAudio, ...functionlessLoc} = location;
    this.props.navigation.navigate('Tour', {
      screen: 'Drive to Start Point',
      params: { loc: functionlessLoc, stage: index} });
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
          <View style = {[sharedStyles.container, {height: 1635 * Scales.horizontal}]}> 
            { Locations.map( (loc, index) =>
                <TouchableOpacity onPress = {() => this.alert(loc, index)} key={Math.random()}>
                  <View style={styles.locationContainer}>
                    <Image style={styles.image} source={loc.squareAtPic[0]}/>
                    <View style={{}}>
                      <Text style={styles.text}> {loc.title}<Text style={styles.time}>  ({loc.time} mins)</Text></Text>
                      <Text style={styles.addrText}> {loc.address} </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )
            }
          </View>
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

  addrText:{
    fontSize: 14.5 * Scales.font,
    color: 'grey',
    fontWeight: MyTheme.defaultText.weight,
    textAlign: 'left',
    marginTop: 3 * Scales.horizontal,
    letterSpacing: -.5 * Scales.font,
  },

  image:{ //TODO Controls container size and text pos
    marginLeft: 13 * Scales.horizontal,
    marginRight: 10 * Scales.horizontal,
    marginVertical: 18 * Scales.horizontal,
    alignSelf: 'center',
    aspectRatio: 1,
    width: 57 * Scales.horizontal,
  },
});

module.exports = SelectionPage;
