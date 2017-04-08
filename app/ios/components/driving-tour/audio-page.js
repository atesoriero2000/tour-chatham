'use strict';

import React, { Component, } from 'react'
import {
  AppRegistry,
  StyleSheet,
  NavigatorIOS,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  VibrationIOS,
  Image,
} from 'react-native'

var Sound = require('react-native-sound');
var Turns = require('./turns');
//var f1 = require('../../audio/Page 11 (Owen).mp3');


const geoOpt = {enableHighAccuracy: true, timeout: 1000, maximumAge: 1000, distanceFilter: .5};

// var file1 = new Sound(f1,'',(error)=>{
//   if (error) {
//       console.log('failed to load the sound', error);
//     } else { // loaded successfully
//       console.log(`duration in seconds:  ${file1.getDuration()} number of channels:  ${file1.getNumberOfChannels()}`);
//   }
// });

var stage  = 0;
var turn = 0;

const radius = 5;


class AudioPage extends Component {


  constructor(props){
    super(props);
    this.state ={
      initialPos: 'unknown',
      lastPos: 'unknown',
      picture: Turns.stages[stage].loc[turn].picture,
      directions: 'unknown',
      title: 'hi',
    };

    var intervalID = setInterval(() => this.geolocation() , 500);

  }


  isNear(targetLat, targetLong, radius){
    let lastLat = this.state.lastPos.latitude;
    let lastLong =  this.state.lastPos.longitude;
    return ( Math.sqrt(Math.pow((lastLong-targetLong),2) + Math.pow((lastLat-targetLat),2) ) <= (radius/(364537+7/9)) );

  }

  geolocation(){

    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({lastPos: position.coords});
    }, (error) => alert(JSON.stringify(error)), geoOpt);


    let currentTurn = Turns.stages[stage].loc[turn];
    if(this.isNear(this.state.initialPos.latitude, this.state.initialPos.longitude, radius)){
      //turn++;
      console.log(turn);
    }

     this.setState({picture: Turns.stages[stage].loc[turn].picture});
     this.setState({directions: Turns.stages[stage].loc[turn].directions});
  }

  triggerAudio(){

    // file1.play((success) => {
    //   if (success) {
    //     console.log('successfully finished playing');
    //   } else {
    //     console.log('playback failed due to audio decoding errors');
    //   }});
  }

  onPress(){


      stage++;

    //if(!this.state.playing){

      this.triggerAudio();

      //stage++;
      console.log("Stage Up: " + stage);
  //  }

  }

  componentWillUnmount(){
    //navigator.geolocation.clearWatch(this.watchID);
    clearInterval(this.intervalID);
    this.props.navigator.popToTop();
  }

  componentWillUpdate(){
//  if(!this.state.picture === Turns.stages[stage][turn].picture){
  //}
  if(this.isNear(this.state.initialPos.latitude, this.state.initialPos.longitude, radius)){
    //  this.setState({isNear: 'true'});
      VibrationIOS.vibrate();
     } else {
    //  this.setState({isNear: 'false'});
    }
  }

  componentDidMount(){
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({initialPos: position.coords});
    }, (error) => alert(JSON.stringify(error)), geoOpt);

  }



  render() {
    return (
      <View style = {styles.container}>
        <Text style = {styles.text}>
          AUDIO PAGE
        </Text>

        <Text style = {styles.location}>
          INITIAL
        </Text>
        <Text> Longitude: {this.state.initialPos.longitude}</Text>
        <Text> Latitude: {this.state.initialPos.latitude}</Text>

        <Text style = {styles.location}>
          LAST
        </Text>
        <Text> Longitude: {this.state.lastPos.longitude}</Text>
        <Text> Latitude: {this.state.lastPos.latitude}</Text>
        <Text> isNear: {JSON.stringify(this.isNear(this.state.initialPos.latitude, this.state.initialPos.longitude, radius))} </Text>


        <Image
        style={styles.image}
        source={this.state.picture}
        />

        <TouchableOpacity style = {styles.button} onPress = {() => this.onPress()}>
          <Text style={styles.buttonText} >Click for audio</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    //backgroundColor: '#424ac1',
  },

  location:{
    fontSize: 20,
    color: 'black',
    fontWeight: '500',
    textAlign: 'center',
    paddingTop: 25
  },

  text:{
    fontSize: 50,
    color: 'black',
    fontWeight: '100',
    textAlign: 'center',
    //padding: 50,
    marginBottom: 25,
  },

  button:{
    width: Dimensions.get('window').width/2,
    height: 36,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    //opacity: 0.5,
    bottom: 50,
    transform: [{translateY:70}],
  },

  image:{
    margin: 25,
    height: 100,
    width: 100,
  },

});

module.exports = AudioPage;
