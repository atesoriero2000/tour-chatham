'use strict';

import React, { Component } from 'react'
import {
  StyleSheet,
  TouchableHighlight,
  View,
  Text,
  Dimensions,
  Linking,
  Image,
  Modal
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'; //TODO: remove? redundant with Stack.Screen component
import { sharedStyles } from '../helpers/shared_styles';

const d_window = Dimensions.get('window');

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


  //TODO: make universal function (start, info, welcome, about)
  linkUrl(url){
    Linking.canOpenURL(url).then(supported => {
      if (!supported) console.log('Can\'t handle url: ' + url);
      else return Linking.openURL(url);
    }).catch(err => console.log('An error occurred', err));
  }

  render() {
    return (
      <SafeAreaView style = {sharedStyles.container}>
        <View style = {sharedStyles.headerBorder}/>
        <View style = {styles.overviewContainer}>
          <Text style = {styles.overviewText1}>
            Explore Chatham Township, Madison, and Green Village
            as you drive to different marked historical sites while
            listening to the history behind them!
          </Text>
          <Text style={styles.clickable} onPress = {() =>
            this.linkUrl("http://www.chathamtownshiphistoricalsociety.org/ongoing-projects.html")}>
            Click here for more info!</Text>

          <Swiper height={240 * (d_window.width/375)} width={d_window.width}>
            {[].concat.apply([], Locations.map(pic => pic.atPic)).map( (pic1) => {
                return( <Image style={styles.image} source={pic1} key={Math.random()}/> )}) }
          </Swiper>

          <Text style = {styles.overviewText2}>
            It will take approximately 1.5 hours to complete the whole
            tour, but you may stop at any marker and pick up where you
            left off. You will need a passenger to follow the directions
            as they pop up.
          </Text>

          <TouchableHighlight style = {sharedStyles.button} onPress = {() => this.setState({tutorialVisible: true})}>
              <Text style = {sharedStyles.buttonText}> Click to Continue </Text>
          </TouchableHighlight>

        </View>

        <Modal animationType={'fade'} transparent={true} visible={this.state.tutorialVisible}>
          <TutorialPopup closePopup={() => this.setState({tutorialVisible: false})} navToSelection={() => this.navToSelection()}/>
        </Modal>

      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({

  // container:{
  //   flex: 5,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },

  overviewContainer:{
    width: d_window.width,
    height: d_window.height,
    alignItems: 'center',
    // justifyContent: 'center',
  },

  overviewText1:{
    textAlign: 'center',
    fontSize: 17 * (d_window.width/375),
    fontWeight: '100',
    color: 'grey',
    marginHorizontal: 30 * (d_window.width/375),
    marginTop: 65 + (21) * Math.pow((d_window.height/667), 2.5) + (d_window.height === 812? 27:0),
  },

  clickable:{
    fontSize: 14 * (d_window.width/375),
    fontWeight: '100',
    color: '#9090FF',
    textDecorationLine: 'underline',
    marginTop: 2 * Math.pow((d_window.height/667), 2.5),
    marginBottom: 16 * Math.pow((d_window.height/667), 2.5),
  },

  image:{
    width: d_window.width,
    height: 240 * (d_window.width/375),
  },

  overviewText2:{
    textAlign: 'center',
    fontSize: 15 * (d_window.width/375),
    fontWeight: '100',
    color: 'grey',
    marginHorizontal: 35 * (d_window.width/375),
    marginTop: 15 * Math.pow((d_window.height/667), 2.5) + (d_window.height === 812? 10:0),
    marginBottom: 14 * Math.pow((d_window.height/667), 2.5),
  },

  // button:{
  //   width: d_window.width,
  //   height: 36 * Math.pow((d_window.height/667), 2),
  //   backgroundColor: 'grey',
  //   opacity: .5,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   alignSelf: 'center',
  // },

  // buttonText:{
  //   fontSize: 17 * (d_window.width/375),
  //   color: 'white',
  //   fontWeight: '100',
  //   textAlign: 'center',
  // },
});

module.exports = Start;
