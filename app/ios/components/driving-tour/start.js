'use strict';

import React, { Component, } from 'react'
import {
  AppRegistry,
  StyleSheet,
  NavigatorIOS,
  TouchableHighlight,
  View,
  Text,
  Alert,
  Dimensions,
  ScrollView,
  Modal,
  Button,
  Linking,
  Image,
} from 'react-native'

import Swiper from 'react-native-swiper';
import { BlurView, VibrancyView } from 'react-native-blur';
import Icon from 'react-native-vector-icons/EvilIcons';

var Turns = require('./turns');
var AudioPage = require('./audio-page');
var SelectionPage = require('./selection-page');

var Page1 = require('./tutorial/page1');
var Page2 = require('./tutorial/page2');


class Start extends Component {

  constructor(props){
    super(props);
    this.state = {
      visible: false,
    };
  }

  componentWillUnmount(){
    this.setState({visible: false});
  }

  render() {
    return (
      <View style = {styles.container}>


        {/* OVERVIEW PAGE */}
        <Text style = {styles.title}>
          TOUR OVERVIEW
        </Text>

        <Text style = {styles.overviewText}>
          This is a audio guided driving tour that will take you across Chatham township Madison and green village to different marked historical sights while telling you the history behind them.
        </Text>

        <Text style = {styles.overviewText}>
          It will take approximately 1.5 hours to complete the whole tour but, you may stop at any marker and pick up where you left off.
        </Text>

        <TouchableHighlight style = {styles.button}
          onPress = {() => this.linkUrl("http://www.chathamtownshiphistoricalsociety.org/ongoing-projects.html")}
          underlayColor = '#BBBBBB'>
            <Text style = {styles.buttonText}>
              More information about the historical marker project
            </Text>
        </TouchableHighlight>

        <TouchableHighlight style = {styles.button}
          onPress = {() => this.setState({visible:true})}
          // onPress = {()=>this.navToAudio()}
          underlayColor = '#BBBBBB'>
            <Text style = {styles.buttonText}>
              Click to Continue
            </Text>
        </TouchableHighlight>


        {/* TUTORIAL */}
        <Modal
          animationType={'fade'}
          transparent={true}
          visible={this.state.visible}>

            <BlurView
              blurType="dark"
              blurAmount={10}
              style={styles.overlay}>

              <View style={styles.modal}>

                <Swiper
                  showsButtons = {true}
                  index = {0}
                  loop = {false}
                  height={Dimensions.get('window').height/1.13}
                  width={Dimensions.get('window').width/1.25}>

                  <Page1/>
                  <Page2 onPress={() => this.navToSelection()}/>

              </Swiper>
            </View>{/* modalformat */}

            {/* TUTORIAL HEADER */}
              <Text style={{
                position: 'absolute',
                fontSize: 27 * (Dimensions.get('window').width/375),
                fontWeight: '200',
                top: (7 + 45) * (Dimensions.get('window').height/667),
              }}>Tutorial</Text>

              <Icon
                name={'close'}
                size={40 * (Dimensions.get('window').width/375)}
                color={'#006CFF'}
                onPress={()=>this.setState({visible:false})}
                style={{
                  position: 'absolute',
                  top: (7 + 45) * (Dimensions.get('window').height/667),
                  left: 45 * (Dimensions.get('window').width/375),
                }}/>

          </BlurView>{/* overlay */}
        </Modal>{/* popup */}
      </View>
    );
  }

  navToAudio(){
    this.props.navigator.push({
      title: 'Audio Tour',
      component: AudioPage,
      passProps: {
        unmount: this.props.unmount,
        stage: 0,
      },
    });
  }

  navToSelection(){
    this.setState({visible: false});
    this.props.navigator.push({
      title: 'Select a Start Point',
      component: SelectionPage,
      passProps: {unmount: this.props.unmount},
    });
  }

  linkUrl(url){
    Linking.canOpenURL(url).then(supported => {
      if (!supported) console.log('Can\'t handle url: ' + url);
      else return Linking.openURL(url);
    }).catch(err => console.error('An error occurred', err));
  }
}

const styles = StyleSheet.create({

  container:{
    flex: 1,
    alignItems: 'center',
  },

  title:{
    fontSize: 35 * (Dimensions.get('window').width/375),
    color: 'black',
    fontWeight: '100',
    textAlign: 'center',
    paddingHorizontal: 25 * (Dimensions.get('window').width/375),
    paddingTop: 65 + 10 * (Dimensions.get('window').width/375),
  },

  overviewText:{
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '500',
    color: 'black',
    padding: 20,
  },

  button:{
    width: Dimensions.get('window').width/1.25,
    height: 48,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    //opacity: 0.5,
  },

  buttonText:{
    fontSize: 18,
    color: 'white',
    fontWeight: '100',
    textAlign: 'center',
    margin: 10,
  },


//MODAL
  overlay:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  modal:{
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width/1.25,
    height: Dimensions.get('window').height/1.13,
    borderRadius: 15 * (Dimensions.get('window').width/375),
    backgroundColor: 'whitesmoke',
  },
});

module.exports = Start;
