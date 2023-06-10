'use strict';

import React, { Component } from 'react'
import {
  StyleSheet,
  TouchableHighlight,
  View,
  Text,
  Linking,
  Image,
  Modal,
  Dimensions
} from 'react-native'
import { sharedStyles, MyTheme, Scales } from '../helpers/shared_styles';

var Swiper = require('../helpers/Swiper');
var Locations = require('../helpers/turns');
var TutorialPopup = require('./tutorial-popup')


class Start extends Component {

  constructor(props){
    super(props);
    this.state = {
      tutorialVisible: false,
    };
  }

  navToSelection(){
    this.setState({tutorialVisible: false});
    this.props.navigation.navigate('Tour', {screen: 'Select a Start Point'});
  }

  render() {
    return (
    <View style = {sharedStyles.container}>
    {/* <View style = {[sharedStyles.container, {justifyContent: 'space-between', paddingVertical: 20 * Scales.horizontal}]}> */}

        {Scales.hasNotch && <View style = {sharedStyles.headerBorder}/>}
        <View style={styles.topTextBox}>
          <Text style = {styles.text}>
            Explore Chatham Township, Madison, and Green Village
            as you drive to different marked historical sites while
            listening to the history behind them!
          </Text>
          <Text style={[styles.clickable, sharedStyles.clickable]} onPress = {() =>
            Linking.openURL("http://www.chathamtownshiphistoricalsociety.org/ongoing-projects.html")}>
            Click here for more info!
          </Text>
        </View>

        <View style={sharedStyles.swiper}>
          <Swiper paginationStyle={{bottom: 20 * Scales.horizontal}}>
            {[].concat.apply([], Locations.map(pic => pic.atPic)).map( (pic1) => {
                return( <Image style={sharedStyles.swiper} source={pic1} key={Math.random()}/> )}) }
          </Swiper>
        </View>


        <View style = {styles.bottomTextBox}>
          <Text style = {[styles.text, {fontSize: 16 * Scales.font}]}>
            It will take approximately 1.5 hours to complete the whole
            tour, but you may stop at any marker and pick up where you
            left off. You will need a passenger to follow the directions
            as they pop up.
          </Text>
        </View>

        <TouchableHighlight style = {sharedStyles.button} 
            underlayColor = {sharedStyles.button.underlayColor}
            onPress = {() => this.setState({tutorialVisible: true})}>
            <Text style = {sharedStyles.buttonText}> Click to Continue </Text>
        </TouchableHighlight>

        <Modal animationType={'fade'} transparent={true} visible={this.state.tutorialVisible}>
          <TutorialPopup closePopup={() => this.setState({tutorialVisible: false})} navToSelection={() => this.navToSelection()}/>
        </Modal>

      </View>
    );
  }
}
const styles = StyleSheet.create({

  topTextBox: {
    width: '100%',
    // backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center'
  },
  
  text: {
    textAlign: 'center',
    fontSize: 18.5 * Scales.font,
    fontWeight: MyTheme.defaultText.weight,
    color: MyTheme.defaultText.color,
    paddingHorizontal: '10%',
  },

  clickable: {
    paddingTop: 6 * Scales.vertical,
    fontSize: 15 * Scales.font,
    textDecorationLine: 'underline',
    fontWeight: Scales.fontWeight('200'), //NOTE This and buttonText only non-consolidated font weight
  },

  bottomTextBox: {
    width: '100%',
    // backgroundColor: 'lightgreen',
    alignItems: 'center',
    justifyContent: 'center',
  },

});


module.exports = Start;
