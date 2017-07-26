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
} from 'react-native'

import Swiper from 'react-native-swiper';
import { BlurView, VibrancyView } from 'react-native-blur';
import Icon from 'react-native-vector-icons/EvilIcons';

var Turns = require('./turns');
var AudioPage = require('./audio-page');
var SelectionPage = require('./selection-page');
var Safety = require('./test/safety');


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
        <Text style = {styles.text}>
          TOUR OVERVIEW
        </Text>

        <TouchableHighlight style = {styles.button}
          onPress = {() => this.setState({visible:true})}
          //onPress = {()=>this.NavToAudio()}
          underlayColor = '#BBBBBB'>
            <Text style = {styles.buttonText}>
              Click to Continue
            </Text>
        </TouchableHighlight>

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
                  <View style = {styles.page1}>
                    <Text style = {styles.text}>
                      PAGE 1
                    </Text>
                  </View>



                  {/* PAGE 2 */}
                  <View style = {styles.page1}>
                    <Text style = {styles.text}>
                      PAGE 2
                    </Text>
                  </View>


                  {/* PAGE 3 */}
                  <View style = {styles.page1}>
                    <Text style = {styles.text}>
                      PAGE 3
                    </Text>
                  </View>


                  {/* PAGE 4 */}
                  <View style = {styles.page1}>
                    <Text style = {styles.text}>
                      PAGE 4
                    </Text>

                    <TouchableHighlight style = {styles.button}
                      onPress = {() => this.toNext()}
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

  toNext(){
    Alert.alert('SAFTEY', '\n1) Please make sure you have a passenger. You will need a passenger to follow and read the directions as the come up on the phone screen.\n\n 2) If you miss a turn, safely navigate through adjacent road and proceed back to the instructed route.\n\n 3) Some locations have limited/ample parking. Please be cautious of your surrounding and pay attention to the specified parking directions.\n\n 4) some markers are on private property. Be courteous to others and mindful of trespassing.\n\n 5) Drive safely, the developer, the Chatham Township Historical Society, and associates of the app hold no liability for any incidents while using this app.',[
      { text: 'Ok, I Understand', onPress: () => this.NavToSelection()},
    ]);
  }

  NavToSafety(){
    this.props.navigator.push({
      title: 'Driving Safety',
      component: Safety
    });
  }

  NavToAudio(){
    this.props.navigator.push({
      title: 'Audio Tour',
      component: AudioPage,
      passProps: {
        unmount: this.props.unmount,
        stage: 0,
      },
    });
  }

  NavToSelection(){
    this.setState({visible: false});
    this.props.navigator.push({
      title: 'Select a Start Point',
      component: SelectionPage,
      passProps: {unmount: this.props.unmount},
    });
  }
}

const styles = StyleSheet.create({

  container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  banner:{
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

  overlay:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  page1:{
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    // backgroundColor: 'red'
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

  text:{
    fontSize: 35 * (Dimensions.get('window').width/375),
    color: 'black',
    fontWeight: '100',
    textAlign: 'center',
    paddingHorizontal: 25 * (Dimensions.get('window').width/375),
    paddingVertical: 20 * (Dimensions.get('window').width/375),
  },

  buttonText:{
    fontSize: 18,
    color: 'white',
    fontWeight: '100',
  },
});

module.exports = Start;
