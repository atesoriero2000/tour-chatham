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
  Linking
} from 'react-native'

import Swiper from 'react-native-swiper';
import { BlurView, VibrancyView } from 'react-native-blur';
import Icon from 'react-native-vector-icons/EvilIcons';

var Turns = require('./turns');
var AudioPage = require('./audio-page');
var SelectionPage = require('./selection-page');


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
        <Text style = {styles.text}>
          TOUR OVERVIEW
        </Text>

        <Text style = {styles.tutorialText}>
          This is a audio guided driving tour that will take you across Chatham township Madison and green village to different marked historical sights while telling you the history behind them.
        </Text>

        <Text style = {styles.tutorialText}>
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


                  {/* PAGE 1 */}
                  <View style = {styles.swiperPage}>
                    <Text style = {styles.text}>
                      PAGE 1
                    </Text>

                    <Text style = {styles.tutorialText}>
                      Directions will appear on the screen instructing what you exactly what to do and what turns to make. Below it will be a counter identifying how far away you are from each turn.
                    </Text>

                  </View>


                  {/* PAGE 2 */}
                  <View style = {styles.swiperPage}>
                    <Text style = {styles.text}>
                      PAGE 2
                    </Text>

                    <Text style = {styles.tutorialText}>
                      On the next page you will pick your starting location. The tour will start at the location you choose and continue through only the locations listed after. (Any location listed before the location you select will not be played.)
                    </Text>

                    <TouchableHighlight style = {styles.button}
                      onPress = {() => this.navToSelection()}
                      underlayColor = '#BBBBBB'>
                      <Text style = {styles.buttonText}>
                        Click
                      </Text>
                    </TouchableHighlight>
                  </View>



              </Swiper>
            </View>{/* modalformat */}

              <Text style={{
                position: 'absolute',
                fontSize: 27,
                fontWeight: '200',
                top: 7 + 45,
              }}>Tutorial</Text>

              <Icon
                name={'close'}
                size={40}
                color={'#006CFF'}
                onPress={()=>this.setState({visible:false})}
                style={{
                  position: 'absolute',
                  top: 7 + 45,
                  left: 45,
                }}/>

          </BlurView>{/* overlay */}
        </Modal>{/* popup*/}
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
}

linkUrl(url){
  Linking.canOpenURL(url).then(supported => {
    if (!supported) console.log('Can\'t handle url: ' + url);
    else return Linking.openURL(url);
  }).catch(err => console.error('An error occurred', err));
}

const styles = StyleSheet.create({

  container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  text:{
    fontSize: 35 * (Dimensions.get('window').width/375),
    color: 'black',
    fontWeight: '100',
    textAlign: 'center',
    paddingHorizontal: 25 * (Dimensions.get('window').width/375),
    paddingVertical: 20 * (Dimensions.get('window').width/375),
  },

  button:{
    width: Dimensions.get('window').width/1.25,
    height: 48,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    //opacity: 0.5,
    bottom: 50,
    transform: [{translateY:50}],
  },

  buttonText:{
    fontSize: 18,
    color: 'white',
    fontWeight: '100',
  },

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
    borderRadius: 15,
    backgroundColor: 'whitesmoke',
  },

  swiperPage:{
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    // backgroundColor: 'red'
  },

  tutorialText:{
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '500',
    color: 'black',
    padding: 20
  },
});

module.exports = Start;
