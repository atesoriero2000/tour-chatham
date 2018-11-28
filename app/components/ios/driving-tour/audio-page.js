// @flow
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

const d_window = Dimensions.get('window');

var Swiper = require('../../Swiper');

var Turns = require('../../turns');

var doneAtAudio = false;
var isNearLastTurn = true;
var firstAudio = true;

const mode = 'tester2'; // debug, demo, tester1, tester2, release

class AudioPage extends Component {

  constructor(props){
    super(props);
    this.state = {
      lastPos: 'unknown',
      currentTargetPos: 'unknown',//{latitude: 0, longitude: 0},
      distToCurrent: 0,
      nextTargetPos: 'unknown',
      distToNext: 0,
      isNear: false, //next turn
      clickable: true,

      audioIsPlaying: false,

      picture: Turns.stages[Turns.stage].startPic,
      directions: 'NONE',
      title: Turns.stages[Turns.stage].title,
      // title: Turns.stages[10].title,
    };
  }

  componentWillMount(){

    BackgroundGeolocation.destroyLog();

    Turns.stage = this.props.stage;
    Turns.turn = Turns.stages[Turns.stage].loc.length-1;

    Sound.setCategory('Playback', false);
    Sound.setActive(true);
    // Turns.stage = 4;
    // Turns.turn = 3;

  }

  componentDidMount(){

    KeepAwake.activate();

    //####### set turns and stage to passed value in props ############
    this.onPress();
    // this.update();

    this.startGeolocation();
  }

  componentWillUnmount(){
    this.DEBUG_stopAudio();
    doneAtAudio = false;
    firstAudio = true;
    BackgroundGeolocation.stopWatchPosition();
    BackgroundGeolocation.stop();
    KeepAwake.deactivate();
    Sound.setActive(false);
  }

  geolocation(position){

    let currentStage = Turns.stages[Turns.stage];
    let currentTurn = currentStage.loc[Turns.turn];


    //LOCATION UPDATE
    this.setState({
      lastPos: position.coords,
      currentTargetPos: {latitude: currentTurn.latitude, longitude: currentTurn.longitude},
      distToCurrent: this.distTo(currentTurn.latitude, currentTurn.longitude),
    });


    //SCREEN UPDATE

    // checks to see if atPic is being displayed
    // will only overide if atPic is not being displayed or if we are not at the last turn
    if(this.state.picture !== Turns.stages[Turns.stage].atPic){   // || currentStage.loc.length-1 > Turns.turn){
      this.setState({
        picture: currentTurn.picture,
        directions: currentTurn.direction,
      });
    }

    // for clickable, when near last turn in location but radius increases when true.
    // deaceases radius on stage change in onPress()
    // radius increases so that thue button doesnt turn of when the driver parks a little far away but will turn off if they drive far past the spot.
    let lastTurn = currentStage.loc[currentStage.loc.length-1];
    let radius = (isNearLastTurn ? 1150 : 200);

    isNearLastTurn = (mode === 'demo'||this.isNear(lastTurn.latitude, lastTurn.longitude, radius));


    //if audio is not playing and we are close to the last turn
    this.setState({ clickable: (!this.state.audioIsPlaying && (currentStage.loc.length-1 === Turns.turn) && isNearLastTurn )});


    //TURN UPDATE
    // Set our next turn to either the next turn in the array or
    // if we are on the last turn of the array already, the first next turn of the next location
    // this alows us to non restrictivly update state and not leave extrainious states that are not updated
    // exeption: on last turn of last location cannot look ahead so we use Turns.stage instead of Turns.stage+1
    let nextTurn = (currentStage.loc.length-1 > Turns.turn) ? currentStage.loc[Turns.turn+1] : Turns.stages[ (Turns.stage===14)?14:Turns.stage+1 ].loc[1];

    //STATE UPDATE
    this.setState({
      nextTargetPos: {latitude: nextTurn.latitude, longitude: nextTurn.longitude},
      distToNext: this.distTo(nextTurn.latitude, nextTurn.longitude),
      isNear: this.isNear(nextTurn.latitude, nextTurn.longitude, nextTurn.radius),
      nextRadius: nextTurn.radius, // NOTE: FOR DEBUGGING
    });

    //Only will increment turn counter if isNear is true and if not the last turn
    if(this.state.isNear && (currentStage.loc.length-1 > Turns.turn) ){
      Vibration.vibrate();
      BackgroundGeolocation.playSound(1300);
      Turns.turn++;
    }
  }

  onPress(){

    if(this.state.clickable){ // Does nothing if audio is playing or if not at location

      //HANDLE END TOUR
      // if its the last stage and we've played the atAudio and it is finished playing
      // removed this is already caught with clickable state && !this.state.audioIsPlaying){

      if(Turns.stage === 14 && doneAtAudio){
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

        Turns.turn = 0;
        Turns.stage++;
        doneAtAudio = false;
        isNearLastTurn = false;
        this.setState({ title: Turns.stages[Turns.stage].title, picture: Turns.stages[Turns.stage].loc[0].picture});
        this.triggerAudio(Turns.stages[Turns.stage].toAudio);
        this.update();
      }
    }
  }

  update(){
    this.geolocation({ coords: this.state.lastPos });
  }

  endTour(){

    BackgroundGeolocation.stopWatchPosition();
    BackgroundGeolocation.stop();
    this.props.changeAtEnd(true);

    this.setState({
      clickable: false,
      title: 'Thankyou for taking the Tour!',
      directions: 'To exit this page, click the "End Tour" button in the top left corner. For direction back to the Schoolhouse, click the "Return Home" button in the top right corner.',
      picture: [].concat.apply([], Turns.stages.map(pic => pic.atPic)),
    });

    this.triggerAudioBool(Turns.endAudio, false);
  }

  isNear(targetLat, targetLong, radius){
    return ( this.distTo(targetLat, targetLong) <= radius);
  }

  distTo(targetLat, targetLong){
    let lastLat = this.state.lastPos.latitude;
    let lastLong =  this.state.lastPos.longitude;

    let φ1 = lastLat/180 * Math.PI, φ2 = targetLat/180 * Math.PI, Δλ = (targetLong-lastLong)/180 * Math.PI, R = 3959 * 5280;
    let d = Math.acos( Math.sin(φ1)*Math.sin(φ2) + Math.cos(φ1)*Math.cos(φ2) * Math.cos(Δλ) ) * R;

    return d;

    //return (Math.sqrt(Math.pow((lastLong-targetLong),2) + Math.pow((lastLat-targetLat),2)) * (364537+7/9) );
  }

  triggerAudioBool(audioFile, shouldUpdate){
    audioFile.play(() => {
      this.setState({ audioIsPlaying: false });
      if(shouldUpdate)this.update(); else Sound.setActive(false);
    });

    if(firstAudio){
      audioFile.setVolume(1);
      firstAudio = false;
    }

    this.setState({ audioFile, audioIsPlaying: true, clickable: false }); // clickable set so button immediatly changes
  }

  triggerAudio(audioFile){
    this.triggerAudioBool(audioFile, true);
  }

  startGeolocation(){

    BackgroundGeolocation.configure({
      // Geolocation Config
      desiredAccuracy: 0,
      stationaryRadius: 25,
      distanceFilter: 0,
      disableElasticity: true,
      locationAuthorizationRequest: 'WhenInUse',
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

    BackgroundGeolocation.watchPosition((location) => this.geolocation(location), {
      interval: 1000,
      desiredAccuracy: 0,
      persists: true,
    });

  }

  DEBUG_stopAudio(){
    this.state.audioFile.stop();
    this.setState({audioIsPlaying: false});
    this.update();
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
    this.update();
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
    this.update();
  }


  render() {
    return (

      <View style = {styles.container}>
        {/* <ScrollView><View style = {styles.container}> */}

          <View style = {styles.banner}/>

          <View style = {styles.titleBox}>
            <Text allowFontScaling = {false} style = {styles.title}>{this.state.title}</Text>
          </View>

          <View style = {styles.line}/>

          <View style = {styles.directionBox}>
            <Text allowFontScaling = {false} style = {styles.directions}>{this.state.directions}</Text>
          </View>

          <Text allowFontScaling = {false} style = {styles.dist}>
            {doneAtAudio?'':('In: ' + ( (Turns.turn === 0)?'0':JSON.stringify(Math.round(this.state.distToCurrent)) ) + ' FT')}
          </Text>


          {Array.isArray(this.state.picture)?

            <View style={styles.imageBox}>
              <Swiper
                showsButtons = {false}
                loop = {true}
                height={250 * (d_window.width/375)}
                width={d_window.width}
                autoplay={true}
                autoplayTimeout={2.5}>

                  {this.state.picture.map( onePic => <Image style={styles.image} source={onePic} key={Math.random()}/> )}

              </Swiper>
            </View>:

            <View style={styles.imageBox}>
              <Image style = {styles.image} source = {this.state.picture}/>
            </View>
          }

          <TouchableHighlight style = {{
            width: d_window.width/1.5,
            height: 36 * Math.pow((d_window.height/667), 2) - (d_window.height === 812? 10:0), //height
            backgroundColor: 'gray',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            top: (262 + 310) * (d_window.height/667) - (d_window.height === 812? 36:0), //height
            opacity: this.state.clickable?1:.05,
          }}
          underlayColor = '#BBBBBB'
          onPress = {() => this.onPress()}>
            <Text allowFontScaling = {false} style={styles.buttonText}>Click to Continue</Text>
          </TouchableHighlight>

          {(mode === 'debug'||mode === 'demo'||mode === 'tester1'||mode === 'tester2') &&
            <TouchableOpacity style = {styles.debug1} onPress={() => this.DEBUG_stopAudio()}>
              <Text allowFontScaling = {false} style={{color: 'whitesmoke'}}>{'X'}</Text>
            </TouchableOpacity>
          }

          {(mode === 'debug'||mode === 'demo'||mode === 'tester2') &&
            <TouchableOpacity style = {styles.debug2} onPress={() => this.DEBUG_lastTurn()}>
              <Text allowFontScaling = {false} style={{color: 'whitesmoke'}}>{'<'}</Text>
            </TouchableOpacity>
          }

          {(mode === 'debug'||mode === 'demo'||mode === 'tester2') &&
            <TouchableOpacity style = {styles.debug3} onPress={() => this.DEBUG_nextTurn()}>
              <Text allowFontScaling = {false} style={{color: 'whitesmoke'}}>{'>'}</Text>
            </TouchableOpacity>
          }

          {(mode === 'debug') && <Text allowFontScaling = {false} style={{position: 'absolute', top: 285, left: 285}}>{Turns.stage},{Turns.turn}</Text>}

          {(mode === 'debug') && <Text allowFontScaling = {false} style={{
            position: 'absolute',
            top: 262 + 50,
            left: 220
          }}> distToNext: {JSON.stringify(Math.round(this.state.distToNext))} FT</Text>}
          {(mode === 'debug') && <Text allowFontScaling = {false} style={{
            position: 'absolute',
            top: 262 + 77,
            left: 220
          }}> nextRadius: {JSON.stringify(this.state.nextRadius)} </Text>}
          {(mode === 'debug') && <Text allowFontScaling = {false} style={{
            position: 'absolute',
            top: 262 + 104,
            left: 220
          }}> isNear: {JSON.stringify(this.state.isNear)} </Text>}

          {false &&
            <View style={{alignItems: 'center', justifyContent: 'center', width: d_window.width}}>
              <View style={{height: 300}}/>
              <Text allowFontScaling = {false} style = {styles.text}>
                DEBUGGER
              </Text><Text/>

              <Text> Stage/Turn:   {Turns.stage},{Turns.turn}</Text>

              <Text allowFontScaling = {false} style = {styles.location}>
                CURRENT TARGET
              </Text>
              <Text> Longitude: {this.state.currentTargetPos.longitude}</Text>
              <Text> Latitude: {this.state.currentTargetPos.latitude}</Text>
              <Text> distToCurrent: {JSON.stringify(Math.round(this.state.distToCurrent))} FT</Text>

              <Text allowFontScaling = {false} style = {styles.location}>
                NEXT TARGET
              </Text>
              <Text> Longitude: {this.state.nextTargetPos.longitude}</Text>
              <Text> Latitude: {this.state.nextTargetPos.latitude}</Text>
              <Text/>
              <Text> distToNext: {JSON.stringify(Math.round(this.state.distToNext))} FT</Text>
              <Text> isNear: {JSON.stringify(this.state.isNear)} </Text>

              <Text allowFontScaling = {false} style = {styles.location}>
                LAST
              </Text>
              <Text> Longitude: {this.state.lastPos.longitude}</Text>
              <Text> Latitude: {this.state.lastPos.latitude}</Text>
              <Text/>
            </View>
          }
        {/* </View></ScrollView> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({

  container:{
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    // marginBottom: 10 * (d_window.width/375), //height
  },

  banner:{
    width: d_window.width,
    height: 64 + (d_window.height === 812? 20:0), //NOTE: not scalable
  },

  titleBox:{
    width: d_window.width,
    height: 100 * Math.pow((d_window.height/667), 1.25), //height
    justifyContent: 'center',
    alignItems: 'center',
  },

  title:{
    fontSize: 30 * (d_window.width/375),
    textAlign: 'center',
    color: 'black',
    fontWeight: '300',
    paddingTop: 5 * Math.pow((d_window.height/667), 2), //height
    paddingHorizontal: 45 * (d_window.width/375),
  },

  line:{
    backgroundColor: 'black',
    height: .74 * (d_window.width/375), //height
    width: 150 * (d_window.width/375),
  },

  directionBox:{
    width: 325 * (d_window.width/375),
    height: 107 * Math.pow((d_window.height/667), 1.25), //height
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10 * Math.pow((d_window.height/667), 2) - (d_window.height === 812? 10:0), //height
  },

  directions:{
    fontSize: 18 * (d_window.width/375),
    color: 'gray',
    fontWeight: '300',
    textAlign: 'center',
  },

  dist:{
    fontSize: 15 * (d_window.width/375),
    color: 'dimgray',
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 3 * Math.pow((d_window.height/667), 2) - (d_window.height === 812? 4.44:0), //height
  },

  imageBox:{
    position: 'absolute',
    top: 310 * (d_window.width/375) + (d_window.height === 812? 77:0),
    height: 250 * (d_window.width/375),
    width: d_window.width,
    alignItems: 'center',
    justifyContent: 'center',
  },

  image:{
    height: 250 * (d_window.width/375),
    width: d_window.width,
    alignSelf: 'center',
  },

  button:{
    width: d_window.width/1.5,
    height: 36 * (d_window.width/375),
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },

  buttonText:{
    fontSize: 15 * (d_window.width/375),
    color: 'white',
    fontWeight: '100',
    textAlign: 'center',
  },

  //DEBUGGER STYLES

  debug1: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 275 * (d_window.width/375) + (d_window.height === 812? 75:0),
    left: 15 * (d_window.width/375),
    backgroundColor: ((mode === 'demo'||mode === 'tester2') ? 'white' : 'gray'),
    height: 30 * (d_window.width/375),
    width: 30 * (d_window.width/375),
    borderRadius: 15 * (d_window.width/375),
  },

  debug2: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 275 * (d_window.width/375) + (d_window.height === 812? 75:0),
    left: 55 * (d_window.width/375),
    backgroundColor: ((mode === 'demo'||mode === 'tester2') ? 'white' : 'gray'),
    height: 30 * (d_window.width/375),
    width: 30 * (d_window.width/375),
    borderRadius: 15 * (d_window.width/375),
  },

  debug3: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 275 * (d_window.width/375) + (d_window.height === 812? 75:0),
    left: 95 * (d_window.width/375),
    backgroundColor: ((mode === 'demo'||mode === 'tester2') ? 'white' : 'gray'),
    height: 30 * (d_window.width/375),
    width: 30 * (d_window.width/375),
    borderRadius: 15 * (d_window.width/375),
  },

  location:{
    fontSize: 20 * (d_window.width/375),
    color: 'black',
    fontWeight: '500',
    textAlign: 'center',
    paddingTop: 20 * (d_window.width/375),
  },

  text:{
    fontSize: 50 * (d_window.width/375),
    color: 'black',
    fontWeight: '100',
    textAlign: 'center',
    marginTop: 30 * (d_window.width/375),
  },

  halfButton:{
    width: d_window.width/1.5/2 - 5,
    height: 36 * (d_window.width/375),
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },

  halfButtonView:{
    flex: 2,
    flexDirection: 'row',
    width: d_window.width/1.5,
    height: 36 * (d_window.width/375),
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignSelf: 'center',
    margin: 5 * (d_window.width/375),
  },
});

module.exports = AudioPage;
