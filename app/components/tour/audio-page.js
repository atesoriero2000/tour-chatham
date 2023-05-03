import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  Vibration,
  Image,
  ScrollView,
  Button,
  Alert,
  Linking
} from 'react-native'
import { activateKeepAwake, deactivateKeepAwake } from 'expo-keep-awake';
import BackgroundGeolocation from "react-native-background-geolocation";
import Sound from 'react-native-sound';
import Debugger from './debugger';
import { sharedStyles, d_window } from '../helpers/shared_styles';

//TODO: remove, what is this?
var scale = 450;
var scaleH = 800;

var Swiper = require('../helpers/Swiper');
var Locations = require('../helpers/turns');
var endAudio = new Sound('page_27_tony.mp3', Sound.MAIN_BUNDLE);

//TODO: REMOVEEEEE PLEASEEEE
var doneAtAudio = false;
var isNearLastTurn = true;

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
      directions: 'NONE',

      tourEnded: false,
      isNearOverride: false, //for debugging
      debugger: false,
    };
  }



  ///////////////////////
 //// INIT FUCTIONS ////
///////////////////////

  componentDidMount(){
    this.props.navigation.setOptions({ 
      headerLeft: () => ( <Button title='End Tour' color={'red'} onPress={() => this.endTourButton()} /> ),
      headerRight: () => ( <Button title='Return Home' onPress={() => this.returnHomeButton()}/> ),
    })
    activateKeepAwake();
    Sound.setCategory('Playback', false);
    Sound.setActive(true); //TODO: Check if should turn off after audio is finished cause it is rn

    //####### set turns and stage to passed value in props ############
    this.stage = this.props.route.params.stage;
    this.turn = Locations[this.stage].turns.length-1; //Grab last turn (atAudio)
    this.buttonPressed();
    // this.update();

    this.startGeolocation();
  }

  startGeolocation(){

    //NOTE: requestTemporaryFullAccuracy
    //getCurrentPosition
    //all Returns https://transistorsoft.github.io/react-native-background-geolocation/interfaces/location.html#sample
    
    BackgroundGeolocation.logger.destroyLog();
    BackgroundGeolocation.ready({
      reset: true,
      persistMode: false,
      showsBackgroundLocationIndicator: true,
      debug: false, // <-- enable this hear sounds for background-geolocation life-cycle.
      logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE, //VERBOSE, OFF
      maxRecordsToPersist: 0,
      locationAuthorizationRequest: 'WhenInUse',
      
      desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_NAVIGATION,
      stationaryRadius: 5, //meters but usually takes ~200m at default 25
      distanceFilter: 1, ///meters, OR you can set locationUpdateInterval
      // locationUpdateInterval: 1000, //ANDROID ONLY
      // preventSuspend: true, //watchPosition already does this
      isMoving: true, //ensures immediate location updates
      disableElasticity: true, //Very Important, or else updates lessen with speed
      elasticityMultiplier: 0, //0=redundant to disableElasticity
      disableStopDetection: true, //TODO: disable accelerometer use and defaults to apples 15mins times
      // stopTimeout: 5, //mins => default 5, disableStopDetection overrites this

    }, (state) => { console.log("BackgroundGeolocation is configured and ready:   ", state.enabled);
                    if (!state.enabled){
                        BackgroundGeolocation.start();
                        console.log("GEOLOCATION STARTED");
                      } 
    }, () => console.log("***** GEOLOCATION READY FAILED *****"));

    BackgroundGeolocation.onLocation(
      (location) => {
        console.log("[onLocation] success: ", location);
        this.setState({lastPos: location.coords});
        this.update();
      },  (error) => console.log("***** onLocation FAILED *****:    ", error));

    BackgroundGeolocation.setConfig({ locationAuthorizationRequest: 'Always' });
    BackgroundGeolocation.requestPermission(); // TODO NOTE: might need to wait NOT NEEDED
    BackgroundGeolocation.requestTemporaryFullAccuracy("Driving").then( 
      (accuracyAuthorization) => console.log('[requestTemporaryFullAccuracy] STATUS:', accuracyAuthorization) 
      ).catch( (error) => console.warn("[requestTemporaryFullAccuracy] FAILED TO SHOW DIALOG: ", error) );
    BackgroundGeolocation.watchPosition(
      (location) => console.log("[watchPosition] success: ", location),
      (error) => console.log("***** watchPosition FAILED *****:    ", error), {
        interval: 1000, //in ms 
        desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_NAVIGATION, timeout: 60000 });
    BackgroundGeolocation.changePace(true); //IMPORTANT!! Instantly starts sending location updates
  }



  ///////////////////////
 //// MAIN FUCTIONS ////
///////////////////////
  buttonPressed(){
    if(this.state.clickable){ // Does nothing if audio is playing or if not at location
      /*------------------------*/
      /* ! Handle End of Tour ! */
      /*------------------------*/
      // if its the last stage and we've played the atAudio and it is finished playing
      // removed this is already caught with clickable state && !this.state.audioIsPlaying){
      if(this.stage === 14 && doneAtAudio){
        this.showEndScreen();
        return; //Needed to stop tour
      }
      /*------------------*/
      /* ! Play atAudio ! */
      /*------------------*/
      let currentStage = Locations[this.stage];
      if(currentStage.atAudio === null) doneAtAudio = true; // if it doesnt have at audio, act like it has completed atAudio and continue
      if(!doneAtAudio){ // Has not done the at location audio
        this.triggerAudio(currentStage.atAudio, true); //true greys button immediatly
        doneAtAudio = true; //Only works if ^ set to true
        this.setState({
          title: currentStage.title,
          picture: currentStage.atPic,
          directions: 'Remain at the location until the audio is finished, then click the button to continue'});

      /*------------------------*/
      /* ! Handle Next Marker ! */
      /*------------------------*/
      }else{ // has done at location audio or doesnt have any
        BackgroundGeolocation.changePace(true); //IMPORTANT!! Instantly starts sending location updates
        this.turn = 0;
        this.stage++;
        doneAtAudio = false;
        isNearLastTurn = false;
        this.setState({ title: Locations[this.stage].title, picture: Locations[this.stage].turns[0].picture});
        this.triggerAudio(Locations[this.stage].toAudio, true);
        this.update();
      }
    }
  }

  update(){
    //TODO: better stage and turn tracker
    let currentStage = Locations[this.stage];
    let currentTurn = currentStage.turns[this.turn];

    /*---------------------*/
    /* ! LOCATION UPDATE ! */
    /*---------------------*/
    this.setState({
      currentTargetPos: { latitude: currentTurn.latitude, longitude: currentTurn.longitude },
      distToCurrent: this.distTo(currentTurn.latitude, currentTurn.longitude) });

    /*-------------------*/
    /* ! SCREEN UPDATE ! */
    /*-------------------*/
    // checks to see if atPic is being displayed
    // will only overide if atPic is not being displayed or if we are not at the last turn
    if(this.state.picture !== Locations[this.stage].atPic)   // || currentStage.turns.length-1 > this.turn){
      this.setState({ 
        picture: currentTurn.picture, 
        directions: currentTurn.direction });

    /*-------------------*/
    /* ! BUTTON UPDATE ! */
    /*-------------------*/
    //TODO: Not hardcode isNearLastTurn variable
    // for clickable, when near last turn in location but radius increases when true.
    // deaceases radius on stage change in onPress()
    // radius increases so that thue button doesnt turn of when the driver parks a little far away but will turn off if they drive far past the spot.
    // if audio is not playing and we are close to the last turn
    let lastTurn = currentStage.turns[currentStage.turns.length-1];
    let radius = (isNearLastTurn ? 1150 : 200);
    isNearLastTurn = (this.state.isNearOverride||this.isNear(lastTurn.latitude, lastTurn.longitude, radius));
    this.setState({ clickable: (!this.state.audioIsPlaying && (currentStage.turns.length-1 === this.turn) && isNearLastTurn )});

    /*----------------------*/
    /* ! UPDATE NEXT TURN ! */
    /*----------------------*/
    // Set our next turn to either the next turn in the array or
    // if we are on the last turn of the array already, the first next turn of the next location
    // this alows us to non restrictivly update state and not leave extrainious states that are not updated
    // exeption: on last turn of last location cannot look ahead so we use this.stage instead of this.stage+1
    let nextTurn = (currentStage.turns.length-1 > this.turn) ? currentStage.turns[this.turn+1] : Locations[ (this.stage===14)?14:this.stage+1 ].turns[1];

    /*------------------*/
    /* ! UPDATE STATE ! */
    /*------------------*/
    this.setState({
      nextTargetPos: {latitude: nextTurn.latitude, longitude: nextTurn.longitude},
      distToNext: this.distTo(nextTurn.latitude, nextTurn.longitude),
      isNear: this.state.isNearOverride||this.isNear(nextTurn.latitude, nextTurn.longitude, nextTurn.radius),
      nextRadius: nextTurn.radius, // NOTE: FOR DEBUGGING
    });

    /*-------------------------*/
    /* ! UPDATE CURRENT TURN ! */
    /*-------------------------*/
    //Only will increment turn counter if isNear is true and if not the last turn
    if(this.state.isNear && (currentStage.turns.length-1 > this.turn) ){
      Vibration.vibrate();
      BackgroundGeolocation.playSound(1300); //default voicemail sound
      this.turn++;
    }
    /* LOGGER */
    console.log("GOT POSITION:     ", this.state.lastPos);
  }

  triggerAudio(audioFile, shouldUpdate){
    audioFile.play(() => {
      this.setState({ audioIsPlaying: false });
      if(shouldUpdate) this.update(); else Sound.setActive(false); //TODO: i dont think this is right (finished callback)
    });
    // audioFile.setVolume(1); //TODO: ADD FOR FINAL
    this.setState({ audioFile, audioIsPlaying: true, clickable: false }); // clickable set so button immediatly changes
  }


  ///////////////////////////
 //// END TOUR FUCTIONS ////
///////////////////////////
  showEndScreen(){
    //Kill location services for unessecary tracking (reduntant to componentWillUnmount())
    BackgroundGeolocation.stopWatchPosition(); //VERY nessecary
    BackgroundGeolocation.removeAllListeners();
    BackgroundGeolocation.stop();

    this.setState({
      clickable: false,
      title: 'Thankyou for taking the Tour!',
      directions: 'To exit this page, click the "End Tour" button in the top left corner. For direction back to the Schoolhouse, click the "Return Home" button in the top right corner.',
      picture: [].concat.apply([], Locations.map(loc => loc.atPic)),
      tourEnded: true,
    });

    this.triggerAudio(endAudio, false);
  }

  endTourButton(){
    //TODO: maybe just make a fuction Component and return <Button/>
    if(!this.state.tourEnded)
      Alert.alert( 'End Tour Warning', 'Are you sure you want to end the tour?',
        [{ text: 'Cancel', style: 'cancel' },
         { text: 'End Tour', onPress: () => { this.props.navigation.popToTop() }, style: 'destructive'} ] );
     else this.props.navigation.popToTop();
  }

  returnHomeButton(){
    //TODO: maybe just make a fuction Component and return <Button/>
    //TODO: Figure out better functionality
    Alert.alert( 'Direction Back to Start', '\nThese next directions take approx 9 minutes to travel and 4.5 miles\n\n Line2 \n\n Line3 \n\n Would you like to go?',
      [{ text: 'Close', style: 'default' },
       { text: 'Go', onPress: () => { Linking.openURL("http://maps.apple.com/?daddr=Chatham%20Township%20Historical%20Society,+Chatham,+NJ&dirflg=d&t=m") }, style: 'cancel' } ] );
  }

  componentWillUnmount(){
    this.state.audioFile.stop();
    Sound.setActive(false);
    doneAtAudio = false;
    // isNearLastTurn = true;
    BackgroundGeolocation.stopWatchPosition(); // VERY nessecary
    BackgroundGeolocation.removeListeners();
    BackgroundGeolocation.stop();
    deactivateKeepAwake();
  }

  
  ////////////////////////////
 //// ##### RENDER ##### ////
////////////////////////////

  render() {
    return (
      <View>
        <View style = {sharedStyles.headerBorder}/>
        <ScrollView>
          <View style = {styles.container}>

            <View style = {styles.titleBox}>
              <Text style = {styles.title}>{this.state.title}</Text>
            </View>

            <View style = {styles.line}/>

            <View style = {styles.directionBox}>
              <Text style = {styles.directions}>{this.state.directions}</Text>
            </View>

            <Text style = {styles.dist}>
              {doneAtAudio?'':('In: ' + ( (this.turn === 0)?'0':JSON.stringify(Math.round(this.state.distToCurrent)) ) + ' FT')}
            </Text>

  {/* Turns / Locations Image */}
            {Array.isArray(this.state.picture) ?
              <Swiper height={styles.image.height} width={styles.image.width}>
                  {this.state.picture.map( onePic => <Image style={styles.image} source={onePic} key={Math.random()}/> )}
              </Swiper> : <Image style = {styles.image} source = {this.state.picture}/>
            }

  {/* Continue Button */}
            <TouchableHighlight style = {[styles.button, {opacity: this.state.clickable?1:.5}]} onLongPress = {() => this.buttonPressed()}>
              <Text style={styles.buttonText}>Click to Continue</Text>
            </TouchableHighlight>
          </View>

  {/* Hidden Debugger Component */}
          {this.state.debugger && 
          <Debugger state={this.state} turn={this.turn} stage={this.stage}
              stopAudio = {() => this.DEBUG_stopAudio()} 
              lastTurn = {() => this.DEBUG_lastTurn()} 
              nextTurn = {() => this.DEBUG_nextTurn()} 
              toggleIsNearOverride={() => this.DEBUG_toggleIsNearOverride()}/>}
          <TouchableOpacity style={[styles.debuggerToggle, {opacity: this.state.debugger?1:0, height: this.state.debugger?30:5}]} onPress={() => this.DEBUG_toggleDebugger()}/>
        </ScrollView>
      </View>
    );
  }


  /////////////////////////
 //// HELPER FUCTIONS ////
/////////////////////////
  isNear(targetLat, targetLong, radius){
    return ( this.distTo(targetLat, targetLong) <= radius);
  }

  distTo(targetLat, targetLong){
    let lastLat = this.state.lastPos.latitude;
    let lastLong =  this.state.lastPos.longitude;
    let φ1 = lastLat/180 * Math.PI, φ2 = targetLat/180 * Math.PI, Δλ = (targetLong-lastLong)/180 * Math.PI, R = 3959 * 5280;
    return( Math.acos( Math.sin(φ1)*Math.sin(φ2) + Math.cos(φ1)*Math.cos(φ2) * Math.cos(Δλ) ) * R ); //Old dist*364537.777
  }


  ////////////////////////////  
 //// DEBUGGING FUCTIONS ////
////////////////////////////
  DEBUG_toggleDebugger(){
    this.setState({ debugger: !this.state.debugger });
  }

  DEBUG_stopAudio(){
    this.state.audioFile.stop();
    this.setState({audioIsPlaying: false});
    this.update();
  }

  DEBUG_nextTurn(){
    Vibration.vibrate();
    BackgroundGeolocation.playSound(1300);

    if(Locations[this.stage].turns.length-1 <= this.turn){
      this.turn = 0;
      this.stage++;
    }else{
      this.turn++;
    }
    this.update();
  }

  DEBUG_lastTurn(){
    Vibration.vibrate();
    BackgroundGeolocation.playSound(1301);

    if(this.turn === 0){
      this.stage--;
      this.turn = Locations[this.stage].turns.length-1;
    }else{
      this.turn--;
    }
    this.update();
  }

  DEBUG_toggleIsNearOverride(){
    this.setState({ isNearOverride: !this.state.isNearOverride });
    // this.update(); //this breaks the end tour page
  }
}

  /////////////////////
 //// MAIN STYLES ////
/////////////////////
const styles = StyleSheet.create({

  container:{
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },

  titleBox:{
    width: d_window.width,
    height: 100 * Math.pow((d_window.height/scaleH), 1.25), //height
    justifyContent: 'center',
    alignItems: 'center',
  },

  title:{
    fontSize: 30 * (d_window.width/scale),
    textAlign: 'center',
    color: 'black',
    fontWeight: '300',
    paddingTop: 5 * Math.pow((d_window.height/scaleH), 2), //height
    paddingHorizontal: 45 * (d_window.width/scale),
  },

  line:{
    backgroundColor: 'black',
    height: .74 * (d_window.width/scale), //height
    width: 300 * (d_window.width/scale),
  },

  directionBox:{
    width: 325 * (d_window.width/scale),
    height: 107 * Math.pow((d_window.height/scaleH), 1.25), //height
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10 * Math.pow((d_window.height/scaleH), 2) - (d_window.height === 812? 10:0), //height
  },

  directions:{
    fontSize: 18 * (d_window.width/scale),
    color: 'gray',
    fontWeight: '300',
    textAlign: 'center',
  },

  dist:{
    fontSize: 15 * (d_window.width/scale),
    color: 'dimgray',
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 3 * Math.pow((d_window.height/scaleH), 2) - (d_window.height === 812? 4.44:0), //height
  },

  image:{
    height: 250 * (d_window.width/scale),
    width: d_window.width,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },

  button:{
    width: d_window.width/1.5,
    height: 36 * Math.pow((d_window.height/scaleH), 2), //height
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 30,
    // underlayColor = '#BBBBBB' 
  },

  buttonText:{
    fontSize: 15 * (d_window.width/scale),
    color: 'white',
    fontWeight: '100',
    textAlign: 'center',
  },

  debuggerToggle:{
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'gray',
    alignSelf: 'center',
    width: '100%'
  }
});

module.exports = AudioPage;
