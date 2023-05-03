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
import { sharedStyles, MyTheme } from '../helpers/shared_styles';

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

        {/* <View style = {styles.overviewContainer}> */}
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
          <Swiper height={styles.swiper.height} width={styles.swiper.width}>
            {[].concat.apply([], Locations.map(pic => pic.atPic)).map( (pic1) => {
                return( <Image style={styles.swiper} source={pic1} key={Math.random()}/> )}) }
          </Swiper>
        </View>


        <View style = {styles.bottomTextBox}>
          {/* TODO fontSize shared */}
          <Text style = {[styles.text, {fontSize: 17}]}>
            It will take approximately 1.5 hours to complete the whole
            tour, but you may stop at any marker and pick up where you
            left off. You will need a passenger to follow the directions
            as they pop up.
          </Text>
        </View>

          <TouchableHighlight style = {sharedStyles.button} onPress = {() => this.setState({tutorialVisible: true})}>
              <Text style = {sharedStyles.buttonText}> Click to Continue </Text>
          </TouchableHighlight>

        {/* </View> */}

        <Modal animationType={'fade'} transparent={true} visible={this.state.tutorialVisible}>
          <TutorialPopup closePopup={() => this.setState({tutorialVisible: false})} navToSelection={() => this.navToSelection()}/>
        </Modal>

      </View>
    );
  }
}

const styles = StyleSheet.create({

  topTextBox: {
    flex: 7,
    width: '100%',
    // backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center'
  },
  
  text: {
    textAlign: 'center',
    fontSize: 19, // TODO: shared
    // fontWeight: MyTheme.text.weight,
    fontWeight: '200', // TODO: shared
    color: MyTheme.text.defaultColor,
    paddingHorizontal: MyTheme.text.paddingHorizontal,
  },

  clickable: {
    fontSize: 15, //TODO: shared
    fontWeight: MyTheme.text.weight,
    color: MyTheme.text.clickableColor,
    textDecorationLine: 'underline',
  },

  swiper: {
    flex: 11,
    height: 250, //TODO make responsive?
    width: Dimensions.get('window').width, // cant use '100%'
    // backgroundColor: 'lightblue',
    justifyContent: 'flex-start',
  },

  bottomTextBox: {
    flex: 9,
    width: '100%',
    // backgroundColor: 'lightgreen',
    alignItems: 'center',
    justifyContent: 'flex-start' 
  },

});


module.exports = Start;
