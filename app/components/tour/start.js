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
import { sharedStyles, MyTheme, d_window } from '../helpers/shared_styles';

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
      <View style = {sharedStyles.container}>
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

        <View style={styles.swiper}>
          <Swiper height={styles.swiper.minHeight} width={styles.swiper.width} activeColor={MyTheme.colors.swiper} >
            {[].concat.apply([], Locations.map(pic => pic.atPic)).map( (pic1) => {
                return( <Image style={styles.swiper} source={pic1} key={Math.random()}/> )}) }
          </Swiper>
        </View>


        <View style = {styles.bottomTextBox}>
          <Text style = {[styles.text, {fontSize: MyTheme.start.bottomTextSize}]}>
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
    flex: 24,
    width: '100%',
    // backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center'
  },
  
  text: {
    textAlign: 'center',
    fontSize: MyTheme.start.topTextSize,
    fontWeight: MyTheme.defaultText.weight,
    color: MyTheme.defaultText.color,
    paddingHorizontal: '9%',
  },

  clickable: {
    paddingTop: 5, //TODO: scaling (fixed?)
    fontSize: MyTheme.start.clickableTextSize,
    fontWeight: MyTheme.defaultText.weight,
    color: MyTheme.defaultText.clickableColor,
    textDecorationLine: 'underline',
  },

  swiper: { //TODO MOVE TO SHARED FOR AUDIO PAGE
    flex: 1,
    minHeight: 250, //TODO scaling
    width: Dimensions.get('window').width, // cant use '100%'
    // backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
  },

  bottomTextBox: {
    flex: 21,
    bottom: 5, //TODO 
    width: '100%',
    // backgroundColor: 'lightgreen',
    alignItems: 'center',
    justifyContent: 'center',
  },

});


module.exports = Start;
