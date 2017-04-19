//@flow
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

const geoOpt = {enableHighAccuracy: true, timeout: 500, maximumAge: 500, distanceFilter: .5};


//var f1 = require('../../audio/Page 11 (Owen).mp3');
// var file1 = new Sound(f1,'',(error)=>{
//   if (error) {
//       console.log('failed to load the sound', error);
//     } else { // loaded successfully
//       console.log(`duration in seconds:  ${file1.getDuration()} number of channels:  ${file1.getNumberOfChannels()}`);
//   }
// });

var doneAtAudio = false;
var audioIsPlaying = false;

const radius = 5;


class AudioPage extends Component {


  constructor(props){
    super(props);
    this.state ={
      initialPos: 'unknown',
      speed: 0,

      clickable: false,
      lastPos: 'unknown',
      lastRadius: 0,
      picture: Turns.stages[Turns.stage].loc[Turns.turn].picture,
      directions: Turns.stages[Turns.stage].loc[Turns.turn].directions,
      title: Turns.stages[Turns.stage].title,
      intervalID: setInterval(() => this.geolocation() , 500),
    };

  }

  isNear(targetLat, targetLong, radius){
    return ( this.distTo(targetLat, targetLong) <= radius);
  }


  distTo(targetLat, targetLong){
    let lastLat = this.state.lastPos.latitude;
    let lastLong =  this.state.lastPos.longitude;
    return (Math.sqrt(Math.pow((lastLong-targetLong),2) + Math.pow((lastLat-targetLat),2)) * (364537+7/9) );
  }

  geolocation(){

    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({lastPos: position.coords, speed: position.coords.speed});
    }, (error) => alert(JSON.stringify(error)), geoOpt);


    // this.setState({clickable: ((!audioIsPlaying && (currentStage.length === Turns.turn+1))?true:false) });
    // let currentStage = Turns.stages[Turns.stage];
    // let currentTurn = currentStage.loc[Turns.turn];
    //
    // //if not at location
    // if(!(currentStage.length === Turns.turn+1){ // Need this or next line will throw error
    //
    //   let nextTurn = currentStage.loc[Turns.turn+1];
    //   this.setState({lastRadius: this.distTo(nextTurn.latitude, nextTurn.longitude)});
    //
    //   if(this.state.lastRadius <= nextTurn.radius)){//isNear();
    //     Turns.turn++;
    //   }
    // }


    if(this.isNear(this.state.initialPos.latitude, this.state.initialPos.longitude, radius)){
      console.log(turn);
      VibrationIOS.vibrate();
    }

    let radius = this.distTo(this.state.initialPos.latitude, this.state.initialPos.longitude);

    this.setState({
      lastRadius: radius,
      title: Turns.stages[Turns.stage].title,
      picture: Turns.stages[Turns.stage].loc[Turns.turn].picture,
      directions: Turns.stages[Turns.stage].loc[Turns.turn].directions,
    });
  }

  triggerAudio(audioFile){
    audioFile.play((success) => {
     audioIsPlaying = false;
      if (success) {
        console.log('successfully finished playing');
      } else {
        console.log('playback failed due to audio decoding errors');
      }});
    audioIsPlaying = true;
  }

  onPress(){

    // let currentStage = Turns.stages[Turns.stage];
    //
    // //Does nothing if audio is playing or if not at location
    // if(this.state.clickable){
    //
    //   if(currentStage.atAudio === null) doneAtAudio=true;
    //
    //   if(!doneAtAudio){ //Has not done the at location audio
    //     this.triggerAudio(currentStage.atAudio);
    //     doneAtAudio = true;
    //     this.setState({
    //          picture: Turns.stages[Turns.stage].atPic,
    //          directions: 'Remain at the location until the audio is finished, then click the button to continue'});
    //
    //   }else{//has done at location audio or doesnt have any
    //     Turns.stage++;
    //     doneAtAudio = false;
    //     Turns.turn = 0;
    //     this.triggerAudio(currentStage.toAudio);
    //   }
    // }
  // }

    Turns.stage++;
    this.setState({clickable: !this.state.clickable});
    console.log("Stage Up: " + Turns.stage);
  }

  resetPos(){
    this.setState({initialPos: this.state.lastPos, lastRadius: 0});
  }

  componentWillUpdate(){
    if(this.props.unmount().b){
      this.props.navigator.popToTop();
    }
  }

  componentWillUnmount(){
    clearInterval(this.state.intervalID);
    this.props.navigator.popToTop();
  }

  componentDidMount(){

    //####### set turns and stage to passed value in props ############
    //this.onPress();


    this.setState({initialPos: {
      longitude: -74.434586,
      latitude: 40.697827,
    }});

    // navigator.geolocation.getCurrentPosition((position) => {
    //   this.setState({initialPos: position.coords});
    // }, (error) => alert(JSON.stringify(error)), geoOpt);


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
        <Text/>
        <Text> isNear: {JSON.stringify(this.isNear(this.state.initialPos.latitude, this.state.initialPos.longitude, radius))} </Text>
        <Text> Radius: {JSON.stringify(Math.round(this.state.lastRadius, 1))} FT</Text>
        <Text> Speed: {JSON.stringify(Math.round(this.state.speed, 1))}  MPH</Text>



        <Image
        style={styles.image}
        source={this.state.picture}
        />

        <TouchableOpacity style = {styles.button} onPress = {() => this.resetPos()}>
          <Text style={styles.buttonText} >Reset Position</Text>
        </TouchableOpacity>

        <TouchableOpacity style = {styles.button, {opacity: this.state.clickable?1:.05}} onPress = {() => this.onPress()}>
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
    paddingTop: 20
  },

  text:{
    fontSize: 50,
    color: 'black',
    fontWeight: '100',
    textAlign: 'center',
    paddingTop: 30,
  },

  button:{
    width: Dimensions.get('window').width/1.5,
    height: 36,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    //opacity: 0.5,
    bottom: 50,
    transform: [{translateY:50}],
  },

  image:{
    margin: 25,
    height: 100,
    width: 100,
  },

  buttonText:{
    fontSize: 15,
    color: 'white',
    fontWeight: '100',
  },

});

module.exports = AudioPage;
