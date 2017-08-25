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
  AsyncStorage,
} from 'react-native'

import Swiper from 'react-native-swiper';
import { BlurView, VibrancyView } from 'react-native-blur';
import Icon from 'react-native-vector-icons/Ionicons';

const d_window = Dimensions.get('window');

const lMonthKey = 'UIDLastMonth';
const lYearKey = 'UIDLastYear';
var currentDate = new Date();

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

  componentWillMount(){
    Icon.getImageSource('ios-arrow-back-outline', 35, '#157EFB').then( (backIcon) => this.setState({ backIcon }));
    this.props.setOnHelpPress( () => this.setState({visible: true}) );
  }

  componentDidMount(){
    let lastMonth;
    let lastYear;

    AsyncStorage.getItem(lMonthKey).then( (value) => {
      if(value !== null){
        lastMonth = JSON.parse(value);
      }
      console.log(value);
    });

    AsyncStorage.getItem(lYearKey).then( (value) => {
      if(value !== null){
        lastYear = JSON.parse(value);
      }
      console.log(value);
    });

    let thisMonth = currentDate.getMonth();
    let thisYear = currentDate.getYear();

    // if the dates have not been set, show tutorial and set dates
    // NOTE: (int) - null === null !== 0  and  null !=== (int)
    // if it has been more than a month, reshow tutorial and reset date
    let showTutorial = ( thisMonth - lastMonth !== 0 || thisYear !== lastYear );
    // let showTutorial = true;

    this.setState({showTutorial});
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
          <Text style={styles.clickable} onPress = {() =>
            this.linkUrl("http://www.chathamtownshiphistoricalsociety.org/ongoing-projects.html")}>
            Click here for more info!</Text>

          <Swiper
            showsButtons = {false}
            loop = {true}
            height={240 * (d_window.width/375)}
            width={d_window.width}
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
            as they pop up.
          </Text>

          <TouchableHighlight style = {styles.button}
            onPress = {() => this.onPress()}
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
                  height={d_window.height/1.13}
                  width={d_window.width/1.25}>

                  <Page1/>
                  <Page2 onPress={() => {
                    this.navToSelection();
                    this.setItem(lMonthKey, JSON.stringify(currentDate.getMonth()) );
                    this.setItem(lYearKey, JSON.stringify(currentDate.getYear()) );
                  }}/>

              </Swiper>
            </View>{/* modalformat */}

            {/* TUTORIAL HEADER */}
            <Header onPress={() => this.setState({visible:false})}/>

          </BlurView>{/* overlay */}
        </Modal>{/* popup */}
      </View>
    );
  }

  onPress(){
    if(this.state.showTutorial){
      this.setState({visible:true});

    }else{
      this.navToSelection();
    }
  }

  setItem(key, val){
    AsyncStorage.setItem(key, val).catch( (err) => console.log('HIIIIII') );
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
    }).catch(err => console.log('An error occurred', err));
  }
}

const styles = StyleSheet.create({

  container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  overviewContainer:{
    width: d_window.width,
    height: d_window.height,
    alignItems: 'center',
  },

  overviewText1:{
    textAlign: 'center',
    fontSize: 17 * (d_window.width/375),
    fontWeight: '100',
    color: 'grey',
    marginHorizontal: 30 * (d_window.width/375),
    marginTop: 65 + (21) * Math.pow((d_window.height/667), 2.5),
  },

  clickable:{
    fontSize: 14 * (d_window.width/375),
    fontWeight: '100',
    color: '#9090FF',
    textDecorationLine: 'underline',
    marginTop: 2 * Math.pow((d_window.height/667), 2.5),
    marginBottom: 16 * Math.pow((d_window.height/667), 2.5),
  },

  overviewText2:{
    textAlign: 'center',
    fontSize: 15 * (d_window.width/375),
    fontWeight: '100',
    color: 'grey',
    marginHorizontal: 35 * (d_window.width/375),
    marginTop: 15 * Math.pow((d_window.height/667), 2.5),
    marginBottom: 14 * Math.pow((d_window.height/667), 2.5),
  },


  image:{
    width: d_window.width,
    height: 240 * (d_window.width/375),
  },

  button:{
    width: d_window.width,
    height: 36 * Math.pow((d_window.height/667), 2),
    backgroundColor: 'grey',
    opacity: .5,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },

  buttonText:{
    fontSize: 17 * (d_window.width/375),
    color: 'white',
    fontWeight: '100',
    textAlign: 'center',
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
    width: d_window.width/1.25,
    height: d_window.height/1.13,
    borderRadius: 15 * (d_window.width/375),
    backgroundColor: 'whitesmoke',
  },
});

module.exports = Start;
