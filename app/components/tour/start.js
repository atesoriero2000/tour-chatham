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
    this.setState({ tutorialVisible: false});
    this.props.navigation.navigate('Tour', {screen: 'Select a Start Point'});
  }

  render() {
    return (
    <View style = {[sharedStyles.container, {justifyContent: 'space-evenly'}]}>
        <View style = {sharedStyles.headerBorder}/>
        <View style={styles.topTextBox}>
          <Text style = {styles.text}>
            Explore Chatham Township, Madison, and Green Village
            as you drive to different marked historical sites while
            listening to the history behind them!
          </Text>
          <Text style={styles.clickable} onPress = {() =>
            Linking.openURL("http://www.chathamtownshiphistoricalsociety.org/ongoing-projects.html")}>
            Click here for more info!
          </Text>
        </View>

        <View style={sharedStyles.swiper}>
          <Swiper height={sharedStyles.swiper.height} width={sharedStyles.swiper.width} activeColor={sharedStyles.swiper.activeColor} >
            {[].concat.apply([], Locations.map(pic => pic.atPic)).map( (pic1) => {
                return( <Image style={[sharedStyles.swiper, {flex: 1}]} source={pic1} key={Math.random()}/> )}) }
          </Swiper>
        </View>


        <View style = {styles.bottomTextBox}>
          <Text style = {[styles.text, {fontSize: 17 * Scales.font}]}>
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
    fontSize: 19 * Scales.font,
    fontWeight: MyTheme.defaultText.weight,
    color: MyTheme.defaultText.color,
    paddingHorizontal: '9%',
  },

  clickable: {
    paddingTop: 5 * Scales.vertical, //TODO: scaling (fixed?)
    fontSize: 15 * Scales.font,
    fontWeight: MyTheme.defaultText.weight,
    color: MyTheme.defaultText.clickableColor,
    textDecorationLine: 'underline',
  },

  bottomTextBox: {
    width: '100%',
    // backgroundColor: 'lightgreen',
    alignItems: 'center',
    justifyContent: 'center',
  },

});


module.exports = Start;
