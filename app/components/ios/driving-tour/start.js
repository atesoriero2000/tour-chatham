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

import Icon from 'react-native-vector-icons/Ionicons';

var Turns = require('../../turns');
var AudioPage = require('./audio-page');
var SelectionPage = require('./selection-page');

var Page1 = require('./tutorial/page1');
var Page2 = require('./tutorial/page2');
var Header = require('./tutorial/header');



class Start extends Component {

  constructor(props){
    super(props);
    this.state = {
      visible: false,
    };
  }

  componentWillMount(){ // TODO: check if navigator back arrow scalable and bar
    Icon.getImageSource('ios-arrow-back-outline', 35, '#157EFB').then( (backIcon) => this.setState({ backIcon }));
  }

  componentWillUnmount(){
    this.setState({visible: false});
  }

  render() {
    return (
      <View style = {styles.container}>

        {/* OVERVIEW PAGE */}
        <View style = {styles.overviewContainer}>

          <Text style = {styles.overviewText1}>
            Explore Chatham Township, Madison, and Green Village
            as you drive to different marked historical sights while
            listening the history behind them!
          </Text>

          <Swiper
            showsButtons = {false}
            loop = {true}
            height={240 * (Dimensions.get('window').width/375)}
            width={Dimensions.get('window').width}
            autoplay={true}
            autoplayTimeout={2.5}>

            {[].concat.apply([], Turns.stages.map(pic => pic.atPic)).map( (pic1) => {
                return(
                  <Image
                    style={styles.image}
                    source={pic1}
                    key={Math.random()}/>
                  )
                }
              )
            }

          </Swiper>

          <Text style = {styles.overviewText2}>
            It will take approximately 1.5 hours to complete the whole
            tour but, you may stop at any marker and pick up where you
            left off. You will need a passenger to follow the directions
            as they pop up. <Text style={styles.clickable} onPress = {() =>
              this.linkUrl("http://www.chathamtownshiphistoricalsociety.org/ongoing-projects.html")}>
              Click here for more info!</Text>
          </Text>

          <TouchableHighlight style = {styles.button}
            onPress = {() => this.setState({visible:true})}
            // onPress = {()=>this.navToAudio()}
            underlayColor = '#BBBBBB'>
              <Text style = {styles.buttonText}>
                Click to Continue
              </Text>
          </TouchableHighlight>

        </View>
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
            <Header onPress={()=>this.setState({visible:false})}/>

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
        stage: 0,
      },
    });
  }

  navToSelection(){
    this.setState({visible: false});
    this.props.navigator.push({
      title: 'Select a Start Point',
      component: SelectionPage,
      leftButtonIcon: this.state.backIcon,
      onLeftButtonPress: () => this.props.navigator.pop(),
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
    justifyContent: 'center',
  },

  overviewContainer:{
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    alignItems: 'center',
  },

  overviewText1:{
    textAlign: 'center',
    fontSize: 17 * (Dimensions.get('window').width/375),
    fontWeight: '100',
    color: 'grey',
    marginHorizontal: 30 * (Dimensions.get('window').width/375),
    marginTop: (65 + 26) * (Dimensions.get('window').height/667),
    marginBottom: 19 * (Dimensions.get('window').height/667),
  },

  overviewText2:{
    textAlign: 'center',
    fontSize: 15 * (Dimensions.get('window').width/375),
    fontWeight: '100',
    color: 'grey',
    marginHorizontal: 30 * (Dimensions.get('window').width/375),
    marginTop: 21 * (Dimensions.get('window').height/667),
    marginBottom: 19 * (Dimensions.get('window').height/667),
  },

  clickable:{
    fontSize: 14 * (Dimensions.get('window').width/375),
    fontWeight: '100',
    color: '#9090FF',
    textDecorationLine: 'underline',
  },

  image:{
    width: Dimensions.get('window').width,
    height: 240 * (Dimensions.get('window').width/375),
  },

  button:{
    width: Dimensions.get('window').width,
    height: 36 * (Dimensions.get('window').height/667),
    backgroundColor: 'grey',
    opacity: .5,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },

  buttonText:{
    fontSize: 17 * (Dimensions.get('window').width/375),
    color: 'white',
    fontWeight: '100',
    textAlign: 'center',
  //  margin: 10 * (Dimensions.get('window').width/375),
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
