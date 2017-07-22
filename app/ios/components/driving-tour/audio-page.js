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
  TouchableHighlight,
  Vibration,
  Image,
} from 'react-native'

import KeepAwake from 'react-native-keep-awake';
import BackgroundGeolocation from "react-native-background-geolocation";
import Sound from 'react-native-sound';

var Turns = require('./turns');

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


class AudioPage extends Component {


  constructor(props){
    super(props);
    this.state ={
      clickable: false,
      lastPos: 'unknown',
      targetPos: 'unknown',
      lastRadius: 0,
      isNear: false,

      picture: Turns.stages[Turns.stage].loc[Turns.turn].picture,
      directions: Turns.stages[Turns.stage].loc[Turns.turn].directions,
      title: Turns.stages[Turns.stage].title,
      intervalID: setInterval(() => this.loop(), 500),
    };
  }



  componentDidMount(){

    KeepAwake.activate();
    //####### set turns and stage to passed value in props ############
    //this.onPress();

    BackgroundGeolocation.watchPosition((location) => this.geolocation(location), {
      interval: 1000,
      desiredAccuracy: 0,
      persists: true,
    });

    // Turns.stage = this.props.stage;
    Turns.stage = 0;
    Turns.turn = 0;
  }

  onError(error) {
    var type = error.type;
    var code = error.code;
    alert(type + " Error: " + code);
  }

  componentWillMount() {

    BackgroundGeolocation.destroyLog();
    // BackgroundGeolocation.on('location', (location) => this.geolocation(location));
    //BackgroundGeolocation.on('motionchange', (isMoving) => if(!isMoving) BackgroundGeolocation.changePace(true));
    // BackgroundGeolocation.on('error', this.onError);
    BackgroundGeolocation.configure({
      // Geolocation Config
      desiredAccuracy: 0,
      stationaryRadius: 25,
      distanceFilter: 0,
      disableElasticity: true,
      locationAuthorizationRequest: 'Always',
      // Activity Recognition
      disableStopDetection: true,
      // Application config
      debug: true, // <-- enable this hear sounds for background-geolocation life-cycle.
      logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
      logMaxDays: 1,

    }, (state) => {
      console.log("- BackgroundGeolocation is configured and ready: ", state.enabled);
      if (!state.enabled) BackgroundGeolocation.start();
      BackgroundGeolocation.changePace(true);
    });

  }

  componentWillUnmount(){
    clearInterval(this.state.intervalID);

    BackgroundGeolocation.stopWatchPosition();
    BackgroundGeolocation.stop(()=>alert('LOCATION TRACKING STOPPED'));

    // BackgroundGeolocation.un('location');
    // BackgroundGeolocation.un('error');
    // BackgroundGeolocation.un('motionchange');

    //BackgroundGeolocation.removeListeners();

    KeepAwake.deactivate();
  }

  isNear(targetLat, targetLong, radius){
    return ( this.distTo(targetLat, targetLong) <= radius);
  }

  distTo(targetLat, targetLong){
    let lastLat = this.state.lastPos.latitude;
    let lastLong =  this.state.lastPos.longitude;

    if(targetLat === null){return true}

    let φ1 = lastLat/180 * Math.PI, φ2 = targetLat/180 * Math.PI, Δλ = (targetLong-lastLong)/180 * Math.PI, R = 3959 * 5280;
    let d = Math.acos( Math.sin(φ1)*Math.sin(φ2) + Math.cos(φ1)*Math.cos(φ2) * Math.cos(Δλ) ) * R;

    return d;

    //return (Math.sqrt(Math.pow((lastLong-targetLong),2) + Math.pow((lastLat-targetLat),2)) * (364537+7/9) );
  }


  loop(){
    let radius = this.distTo(this.state.targetPos.latitude, this.state.targetPos.longitude);
    this.setState({
      targetPos: Turns.stages[Turns.stage].loc[Turns.turn],
      lastRadius: radius,
      title: Turns.stages[Turns.stage].title,
      picture: Turns.stages[Turns.stage].loc[Turns.turn].picture,
      directions: Turns.stages[Turns.stage].loc[Turns.turn].direction,
    });
  }

  geolocation(position){
    // let currentStage = Turns.stages[Turns.stage];
    // let currentTurn = currentStage.loc[Turns.turn];
    //
    // if audio is not playing and we are on the last turn
    // this.setState({clickable: ((!audioIsPlaying && (currentStage.loc.length === Turns.turn+1))?true:false) });
    //
    // // if not at location
    // if(currentStage.loc.length > Turns.turn+1){ // Need this or next line will throw error
    //
    //   let nextTurn = currentStage.loc[Turns.turn+1];
    //   this.setState({lastRadius: this.distTo(nextTurn.latitude, nextTurn.longitude)});
    //
    //   if(this.state.lastRadius <= nextTurn.radius)){//isNear();
    //     Turns.turn++;
    //   }
    // }

    this.setState({lastPos: position.coords, speed: position.coords.speed});
    this.setState({isNear: this.isNear(this.state.targetPos.latitude, this.state.targetPos.longitude, this.state.targetPos.radius)});
    this.setState({clickable: this.state.isNear});

    if(this.state.isNear){
      this.resetPos();
    }
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

    /* let currentStage = Turns.stages[Turns.stage];

    //Does nothing if audio is playing or if not at location
    if(this.state.clickable){

      if(currentStage.atAudio === null) doneAtAudio=true;

      if(!doneAtAudio){ //Has not done the at location audio
        this.triggerAudio(currentStage.atAudio);
        doneAtAudio = true;
        this.setState({
             picture: Turns.stages[Turns.stage].atPic,
             directions: 'Remain at the location until the audio is finished, then click the button to continue'});

      }else{//has done at location audio or doesnt have any
        Turns.stage++;
        doneAtAudio = false;
        Turns.turn = 0;
        this.triggerAudio(currentStage.toAudio);
      }
    }
  }*/
    if(this.state.clickable){
      Vibration.vibrate();

      if(Turns.stages[Turns.stage].loc.length-1 <= Turns.turn){
        Turns.turn = 0;
        Turns.stage++;

      }else{
        Turns.turn++;
      }
    }
  }

  resetPos(){
    Vibration.vibrate();

    if(Turns.stages[Turns.stage].loc.length-1 <= Turns.turn){
      Turns.turn = 0;
      Turns.stage++;
    }else{
      Turns.turn++;
    }
  }


  render() {
    var debug = true;
    return (

      <View style = {styles.container}>

        {/* <Text style = {styles.text}>{this.state.title}</Text>
        <Text>{this.state.directions}</Text> */}

        {debug?
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Text style = {styles.text}>
              AUDIO PAGE
            </Text>

            {/* <Text style = {styles.location}>
              TARGET
            </Text>
            <Text> Longitude: {this.state.targetPos.longitude}</Text>
            <Text> Latitude: {this.state.targetPos.latitude}</Text> */}

            <Text style = {styles.location}>
              LAST
            </Text>
            <Text> Longitude: {this.state.lastPos.longitude}</Text>
            <Text> Latitude: {this.state.lastPos.latitude}</Text>
            <Text/>
            <Text> isNear: {JSON.stringify(this.state.isNear)} </Text>
            <Text> Radius: {JSON.stringify(Math.round(this.state.lastRadius, 1))} FT</Text>
            <Text> Stage/Turn:   {Turns.stage},{Turns.turn}</Text>
          </View>:null
        }

        <Image
        style={styles.image}
        source={this.state.picture}
        />

        <TouchableOpacity style = {styles.button} onPress = {() => this.resetPos()}>
          <Text style={styles.buttonText}>Next Turn</Text>
        </TouchableOpacity>

        {/* <TouchableHighlight style = {{
          width: Dimensions.get('window').width/1.5,
          height: 36,
          backgroundColor: 'gray',
          justifyContent: 'center',
          alignItems: 'center',
          margin: 5,
          opacity: this.state.clickable?1:.05,
        }}
        underlayColor = '#BBBBBB'
        onPress = {() => this.onPress()}>
          <Text style={styles.buttonText} >Click for audio</Text>
        </TouchableHighlight> */}

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
  },

  image:{
    margin: 25 * (Dimensions.get('window').width/375),
    height: Dimensions.get('window').width / 1.5,
    width: Dimensions.get('window').width / 1.5,
    backgroundColor: 'red',
  },

  buttonText:{
    fontSize: 15,
    color: 'white',
    fontWeight: '100',
  },

});

module.exports = AudioPage;
