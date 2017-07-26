//@flow
// 'use strict';

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
  ScrollView,
} from 'react-native'

import KeepAwake from 'react-native-keep-awake';
import BackgroundGeolocation from "react-native-background-geolocation";
import Sound from 'react-native-sound';

var Turns = require('./turns');

var doneAtAudio = false;

class AudioPage extends Component {

  constructor(props){
    super(props);
    this.state ={
      clickable: true,
      lastPos: 'unknown',
      currentTargetPos: 'unknown',//{latitude: 0, longitude: 0},
      distToCurrent: 0,
      nextTargetPos: 'unknown',
      distToNext: 0,
      isNear: false, //next turn

      audioIsPlaying: false,

      picture: Turns.stages[Turns.stage].startPic,
      directions: 'NONE',
      title: Turns.stages[Turns.stage].title,
    };
  }

  componentWillMount() {

    BackgroundGeolocation.destroyLog();
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
      debug: false, // <-- enable this hear sounds for background-geolocation life-cycle.
      logLevel: BackgroundGeolocation.LOG_LEVEL_OFF, //BackgroundGeolocation.LOG_LEVEL_VERBOSE,
      logMaxDays: 1,

    }, (state) => {
      console.log("- BackgroundGeolocation is configured and ready: ", state.enabled);
      if (!state.enabled) BackgroundGeolocation.start();
      BackgroundGeolocation.changePace(true);
    });

    Turns.stage = this.props.stage;
    Turns.turn = Turns.stages[Turns.stage].loc.length-1;

  }

  componentDidMount(){

    KeepAwake.activate();

    //####### set turns and stage to passed value in props ############
    this.onPress();

    BackgroundGeolocation.watchPosition((location) => this.geolocation(location), {
      interval: 1000,
      desiredAccuracy: 0,
      persists: true,
    });
  }

  componentWillUnmount(){
    this.DEBUG_stopAudio();
    doneAtAudio = false;
    BackgroundGeolocation.stopWatchPosition();
    KeepAwake.deactivate();
  }

  geolocation(position){

    //CURRENT TURN STATE UPDATE
    let currentStage = Turns.stages[Turns.stage];
    let currentTurn = currentStage.loc[Turns.turn];

    this.setState({
      lastPos: position.coords, speed: position.coords.speed,
      currentTargetPos: {latitude: currentTurn.latitude, longitude: currentTurn.longitude},
      distToCurrent: this.distTo(currentTurn.latitude, currentTurn.longitude),
    });


    //SCREEN UPDATE

    // checks to see if atPic is being displayed
    // will only overide if atPic is not being displayed or if we are not at the last turn
    if(this.state.picture !== Turns.stages[Turns.stage].atPic || currentStage.loc.length-1 > Turns.turn){
      this.setState({
        picture: currentTurn.picture,
        directions: currentTurn.direction,
      });
    }
    //if audio is not playing and we are on the last turn
    this.setState({ clickable: !this.state.audioIsPlaying && (currentStage.loc.length-1 === Turns.turn) });


    //NEXT TURN STATE UPDATE
    //TURN UPDATE
    if(currentStage.loc.length-1 > Turns.turn){ //check if its not the last turn

      let nextTurn = currentStage.loc[Turns.turn+1];

      this.setState({
        nextTargetPos: {latitude: nextTurn.latitude, longitude: nextTurn.longitude},
        distToNext: this.distTo(nextTurn.latitude, nextTurn.longitude),
        isNear: this.isNear(nextTurn.latitude, nextTurn.longitude, nextTurn.radius),
      });

      //handle next turns
      if(this.state.isNear){
        Vibration.vibrate();
        BackgroundGeolocation.playSound(1300);
        Turns.turn++;
      }
    }
  }

  onPress(){

    if(this.state.clickable){ // Does nothing if audio is playing or if not at location

      //HANDLE END TOUR
      // if its the last stage and we've played the atAudio and it is finished playing
      if(Turns.stage === 14 && doneAtAudio && !this.state.audioIsPlaying){
        this.endTour();
        return;
      }

      let currentStage = Turns.stages[Turns.stage];
      if(currentStage.atAudio === null) doneAtAudio = true; // if it doesnt have at audio, act like it has completed atAudio and continue

      if(!doneAtAudio){ // Has not done the at location audio

        this.triggerAudio(currentStage.atAudio);
        doneAtAudio = true;
        this.setState({
          title: currentStage.title,
          picture: currentStage.atPic,
          directions: 'Remain at the location until the audio is finished, then click the button to continue'});

      }else{ // has done at location audio or doesnt have any

        Turns.stage++;
        Turns.turn = 0;
        doneAtAudio = false;
        this.setState({ title: Turns.stages[Turns.stage].title });
        this.geolocation({ coords: this.state.lastPos });
        this.triggerAudio(Turns.stages[Turns.stage].toAudio);
      }
    }
  }

  endTour(){

    BackgroundGeolocation.stopWatchPosition();
    this.props.changeAtEnd(true);

    this.setState({
      clickable: false,
      title: 'Thankyou for taking the Tour!',
      directions: 'To exit this page, click the "End Tour" button in the top left corner. For direction back to the Schoolhouse, click the "Return Home" button in the top right corner.',
      picture: Turns.endPic,
    });

    this.triggerAudio(Turns.endAudio);
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

  triggerAudio(audioFile){
    audioFile.play(() => {
      this.setState({audioIsPlaying: false});
    });
    this.setState({audioFile, audioIsPlaying: true});
  }

  DEBUG_stopAudio(){
    this.state.audioFile.stop();
    this.setState({audioIsPlaying: false});
  }

  DEBUG_nextTurn(){
    Vibration.vibrate();
    BackgroundGeolocation.playSound(1300);

    if(Turns.stages[Turns.stage].loc.length-1 <= Turns.turn){
      Turns.turn = 0;
      Turns.stage++;
    }else{
      Turns.turn++;
    }
  }

  DEBUG_lastTurn(){
    Vibration.vibrate();
    BackgroundGeolocation.playSound(1301);

    if(Turns.turn === 0){
      Turns.stage--;
      Turns.turn = Turns.stages[Turns.stage].loc.length-1;
    }else{
      Turns.turn--;
    }
  }


  render() {
    var debug = false;
    return (

      <View style = {styles.container}>
        <ScrollView>

          <Text style = {styles.title}>{this.state.title}</Text>
          <Text style = {styles.line}>___________________</Text>
          <Text style = {styles.directions}>{this.state.directions}</Text>

          <Image
          style={styles.image}
          source={this.state.picture}
          />

          <TouchableHighlight style = {{
            width: Dimensions.get('window').width/1.5,
            height: 36,
            backgroundColor: 'gray',
            justifyContent: 'center',
            alignSelf: 'center',
            alignItems: 'center',
            margin: 5,
            opacity: this.state.clickable?1:.05,
          }}
          underlayColor = '#BBBBBB'
          onPress = {() => this.onPress()}>
            <Text style={styles.buttonText}>Click to Continue</Text>
          </TouchableHighlight>


          {debug?
            <View style={{alignItems: 'center', justifyContent: 'center', width: Dimensions.get('window').width}}>

              <Text style = {styles.text}>
                DEBUGGER
              </Text><Text/>

              <View style = {styles.halfButtonView}>
                <TouchableOpacity style = {styles.halfButton} onPress = {() => this.DEBUG_lastTurn()}>
                  <Text style={styles.buttonText}>Last Turn</Text>
                </TouchableOpacity>

                <TouchableOpacity style = {styles.halfButton} onPress = {() => this.DEBUG_nextTurn()}>
                  <Text style={styles.buttonText}>Next Turn</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity style = {styles.button} onPress = {() => this.DEBUG_stopAudio()}>
                <Text style={styles.buttonText}>Stop Audio</Text>
              </TouchableOpacity>

              <Text/>
              <Text> Stage/Turn:   {Turns.stage},{Turns.turn}</Text>

              <Text style = {styles.location}>
                CURRENT TARGET
              </Text>
              <Text> Longitude: {this.state.currentTargetPos.longitude}</Text>
              <Text> Latitude: {this.state.currentTargetPos.latitude}</Text>
              <Text> distToCurrent: {JSON.stringify(Math.round(this.state.distToCurrent, 1))} FT</Text>

              <Text style = {styles.location}>
                NEXT TARGET
              </Text>
              <Text> Longitude: {this.state.nextTargetPos.longitude}</Text>
              <Text> Latitude: {this.state.nextTargetPos.latitude}</Text>
              <Text/>
              <Text> distToNext: {JSON.stringify(Math.round(this.state.distToNext, 1))} FT</Text>
              <Text> isNear: {JSON.stringify(this.state.isNear)} </Text>

              <Text style = {styles.location}>
                LAST
              </Text>
              <Text> Longitude: {this.state.lastPos.longitude}</Text>
              <Text> Latitude: {this.state.lastPos.latitude}</Text>
              <Text/>
            </View>:null
          }

        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  container:{
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10 * (Dimensions.get('window').width/375),
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
    alignSelf: 'center',
    margin: 5,
  },

  halfButton:{
    width: Dimensions.get('window').width/1.5/2 - 5,
    height: 36,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },

  halfButtonView:{
    flex: 2,
    flexDirection: 'row',
    width: Dimensions.get('window').width/1.5,
    height: 36,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignSelf: 'center',
    margin: 5,
  },

  image:{
    marginTop: 25 * (Dimensions.get('window').width/375),
    height: Dimensions.get('window').width / 1.5,
    width: Dimensions.get('window').width,
    alignSelf: 'center',
    backgroundColor: 'red',

    // margin: 25 * (Dimensions.get('window').width/375),
    // height: Dimensions.get('window').width / 1.5,
    // width: Dimensions.get('window').width / 1.5,
    // alignSelf: 'center',
    // backgroundColor: 'red',
  },

  buttonText:{
    fontSize: 15,
    color: 'white',
    fontWeight: '100',
  },

  title:{
    fontSize: 30,
    textAlign: 'center',
    color: 'black',
    fontWeight: '500',
    paddingTop: 20,
    paddingLeft: 25,
    paddingRight: 25,

  },

  line:{
    fontSize: 15,
    color: 'gray',
    fontWeight: '200',
    textAlign: 'center',
  },

  directions:{
    fontSize: 18,
    color: 'gray',
    fontWeight: '300',
    textAlign: 'center',
    paddingTop: 15,
    paddingLeft: 25,
    paddingRight: 25,
  },

});

module.exports = AudioPage;
