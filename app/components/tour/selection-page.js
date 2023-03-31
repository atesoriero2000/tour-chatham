//comes from tour page
//here there will be a scroll view of all locations
//each button passes props to an onClick() handler which nvigates to info page and passes props to it
// props include title, stage, turn, picture, address

import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  ScrollView,
  Dimensions,
  Alert,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native'

const d_window = Dimensions.get('window');
var Locations = require('../helpers/turns');

class SelectionPage extends Component{

  // not serialized data warning??
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
      // TODO: What is this?
      <View style = {styles_TODO.container}>
        <ScrollView> 
          { Locations.map( (loc, index) => // List all locations TODO Add ID's
              <TouchableOpacity onPress = {() => this.alert(loc, index)} key={Math.random()}>
                <View style={styles.container}>
                  <Image style={styles.image} source={loc.squareAtPic[0]}/>
                  <View style={styles.contents}>
                    <Text style={styles.text}> {loc.title} <Text style={styles.time}> ({loc.time} mins) </Text></Text>
                    <Text style={styles.buttonText}> {loc.address} </Text>
                  </View>
                </View>
              </TouchableOpacity>
            )
          } 
        </ScrollView>
      </View>
    );
  }
}



const styles_TODO = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    // marginBottom: 10 * (d_window.height/667), MAKES TAB BAR BORDER KEEP OFF
  },
});

const styles = StyleSheet.create({
  container:{
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

});

module.exports = SelectionPage;
