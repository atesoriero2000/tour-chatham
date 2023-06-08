import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
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
import { sharedStyles, MyTheme, Scales } from '../helpers/shared_styles';

var Swiper = require('../helpers/Swiper');
var Locations = require('../helpers/turns');
var endAudio = new Sound('page_27_tony.mp3', Sound.MAIN_BUNDLE);

class AudioPage extends Component {

  constructor(props){
    super(props);
    this.state = {

      lastPos: 'unknown',
      lastLocation: {activity: {type: 'unknown', confidence: 'unknown'}}, //for debugger
      currentTargetPos: 'unknown',
      distToCurrent: 0,
      nextTargetPos: 'unknown',
      distToNext: 0,
      isNear: false, //next turn
      clickable: true,

      audioIsPlaying: false,
      doneAtAudio: false,
      directions: 'NONE',

      tourEnded: false,
      isNearLastTurn: false,
      isNearOverride: false, //for debugging
    };
  }



  ////////////////////////
 //// INIT FUNCTIONS ////
////////////////////////

  componentDidMount(){
    this.props.navigation.setOptions({ 
      headerLeft: () => ( <Button title='End Tour' color={'red'} onPress={() => this.endTourButton()} /> ),
      headerRight: () => ( <Button title='Return Home' onPress={() => this.returnHomeButton()}/> ), //TODO
    })
    activateKeepAwake();
    Sound.setCategory('Playback', true);//NOTE bug patch needed with https://github.com/zmxv/react-native-sound/issues/788
    Sound.setActive(true); // Only once per session, set to false only when you don't want any more background audio

    //####### set turns and stage to passed value in props ############
    // LATER: move to state instead of class var
    this.stage = this.props.route.params.stage;
    this.turn = Locations[this.stage].turns.length-1; // Grab last turn (atAudio)
    this.startGeolocation();
    this.buttonPressed(); // Starts tour (triggers atAudio)
  }

  startGeolocation(){
    BackgroundGeolocation.logger.destroyLog();
    BackgroundGeolocation.start().then((state) => console.log('[start] STATUS:', state)).catch( (error) => console.error("[start] ERROR: ", error)) //LATER restart or prevent tour to continue
    BackgroundGeolocation.onLocation(
      (location) => {
        console.log("[onLocation] success: ", location);
        this.setState({lastPos: location.coords, lastLocation: location});
        this.update();
      }, (error) => console.error("***** onLocation FAILED *****:    ", error));

    BackgroundGeolocation.watchPosition(
      (location) => console.log("[watchPosition] success: ", location),
      (error) => console.error("***** watchPosition FAILED *****:    ", error), {
        interval: 1000, //in ms 
        desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_NAVIGATION, timeout: 60000 });
    BackgroundGeolocation.changePace(true); //IMPORTANT!! Instantly starts sending location updates
  }

  stopGeolocation(){
    BackgroundGeolocation.stopWatchPosition(); //VERY necessary
    BackgroundGeolocation.removeAllListeners(); //remove onLocation listener
    BackgroundGeolocation.stop();
  }



  ////////////////////////
 //// MAIN FUNCTIONS ////
////////////////////////
  buttonPressed(){
    if(this.state.clickable){ // Button does nothing if audio is playing or if not at location
      
      /*------------------------*/
      /* ! Handle End of Tour ! */
      /*------------------------*/
      // if its the last stage and we've played the atAudio and it is finished playing
      if(this.stage === 14 && this.state.doneAtAudio){
        this.showEndScreen();
        return; //Needed to stop tour
      }

      /*------------------*/
      /* ! Play atAudio ! */
      /*------------------*/
      let currentStage = Locations[this.stage];
      if(!this.state.doneAtAudio && currentStage.atAudio !== null){ // If has not done the at location audio and there is at audio
        this.triggerAudio(currentStage.atAudio, true); //true highlights button after audio finish
        this.setState({
          doneAtAudio: true, // hides dist counter immediately
          title: currentStage.title,
          picture: currentStage.atPic,
          directions: 'Remain at the location until the audio is finished, then click the button to continue'});

      /*------------------------*/
      /* ! Handle Next Marker ! */
      /*------------------------*/
      }else{ // has done at location audio or doesn't have any
        BackgroundGeolocation.changePace(true); //IMPORTANT!! Instantly starts sending location updates
        this.turn = 0;
        this.stage++;
        this.setState({
          doneAtAudio: false,
          isNearLastTurn: false,
          title: Locations[this.stage].title,
          picture: Locations[this.stage].turns[0].picture});
        this.triggerAudio(Locations[this.stage].toAudio, true);
        this.update(); //update screen immediately
      }
    }
  }

  update(){
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
    // update picture and directions every time except when atPic and message is being displayed
    // (atPic gets manually set and cleared in buttonPressed)
    if(this.state.picture !== Locations[this.stage].atPic)
      this.setState({ 
        picture: currentTurn.picture, 
        directions: currentTurn.direction });

    /*-------------------*/
    /* ! BUTTON UPDATE ! */
    /*-------------------*/
    // for clickable, when near last turn in location but radius increases when true.
    // decreases radius on stage change in onPress() (changes lastTurn)
    // radius increases so that the button doesn't turn of when the driver parks a little far away but will turn off if they drive far past the spot.
    // if audio is not playing and we are close to the last turn
    let lastTurn = currentStage.turns[currentStage.turns.length-1];
    let radius = (this.state.isNearLastTurn ? 1150 : 200); //hysteresis
    this.setState({ 
      isNearLastTurn: (this.state.isNearOverride || this.isNear(lastTurn.latitude, lastTurn.longitude, radius)),
      clickable: (!this.state.audioIsPlaying && (currentStage.turns.length-1 === this.turn) && this.state.isNearLastTurn) });

    /*----------------------*/
    /* ! UPDATE NEXT TURN ! */
    /*----------------------*/
    // Set our next turn to either the next turn in the array or
    // if we are on the last turn of the array already, the first next turn of the next location
    // this allows us to non restrictively update state and not leave extraneous states that are not updated
    // exception: on last turn of last location cannot look ahead so we use this.stage instead of this.stage+1
    let nextTurn = (currentStage.turns.length-1 > this.turn) ? currentStage.turns[this.turn+1] : Locations[(this.stage===14)?14:this.stage+1].turns[1];

    /*------------------*/
    /* ! UPDATE STATE ! */
    /*------------------*/
    this.setState({
      nextTargetPos: {latitude: nextTurn.latitude, longitude: nextTurn.longitude},
      distToNext: this.distTo(nextTurn.latitude, nextTurn.longitude),
      isNear: this.state.isNearOverride || this.isNear(nextTurn.latitude, nextTurn.longitude, nextTurn.radius),
      nextRadius: nextTurn.radius, //for debugging only
    });

    /*-------------------------*/
    /* ! UPDATE CURRENT TURN ! */
    /*-------------------------*/
    // Only will increment turn counter if isNear is true and if not the last turn
    if(this.state.isNear && (currentStage.turns.length-1 > this.turn) ){
      Vibration.vibrate();
      BackgroundGeolocation.playSound(1300); //default voicemail sound
      this.turn++;
    }
  }


  triggerAudio(audioFile, updateOnFinish){
    audioFile.setVolume(1).play(() => {
      this.setState({ audioIsPlaying: false });
      if(updateOnFinish) this.update(); // This updates button immediately after audio finishes
    });
    this.setState({ audioFile, audioIsPlaying: true, clickable: false }); // clickable set so button greys immediately changes
  }


  ////////////////////////////
 //// END TOUR FUNCTIONS ////
////////////////////////////
  showEndScreen(){
    this.stopGeolocation(); //needed to stop update() from running
    this.setState({
      clickable: false,
      title: 'Thankyou for taking the Tour!',
      directions: 'To exit this page, click the "End Tour" button in the top left corner. For direction back to the Schoolhouse, click the "Return Home" button in the top right corner.',
      picture: [].concat.apply([], Locations.map(loc => loc.atPic)),
      tourEnded: true,
    });
    //TODO change End Tour Button to leave
    this.triggerAudio(endAudio, false); //false prevents update on audio finish
  }

  endTourButton(){
    //TODO showEndScreen??
    if(!this.state.tourEnded)
      Alert.alert( 'End Tour Warning', 'Are you sure you want to end the tour?',
        [{ text: 'Cancel', style: 'cancel' },
         { text: 'End Tour', onPress: () => { this.props.navigation.popToTop() }, style: 'destructive'} ] );
     else this.props.navigation.popToTop();
  }

  returnHomeButton(){
    //TODO: Figure out better functionality
    //maybe add show end screen
    Alert.alert( 'Direction Back to Start', '\nThese next directions take approx 9 minutes to travel and 4.5 miles\n\n Line2 \n\n Line3 \n\n Would you like to go?',
      [{ text: 'Close', style: 'default' },
       { text: 'Go', onPress: () => { Linking.openURL("http://maps.apple.com/?daddr=Chatham%20Township%20Historical%20Society,+Chatham,+NJ&dirflg=d&t=m") }, style: 'cancel' } ] );
  }

  componentWillUnmount(){
    this.state.audioFile.stop();
    Sound.setActive(false);
    this.stopGeolocation();
    deactivateKeepAwake();
  }

  
  ////////////////////////////
 //// ##### RENDER ##### ////
////////////////////////////

  render() {
    return (
      <View style = {sharedStyles.container}>
        {Scales.hasNotch && <View style = {sharedStyles.headerBorder}/>}
        <ScrollView>
          <View style = {styles.tourContainer}>

            <View style = {styles.titleBox}>
              <Text style = {sharedStyles.locationTitleText}>{this.state.title}</Text>
            </View>

            <View style = {styles.line}/>

            <View style = {styles.directionsBox}>
              <Text style = {styles.directions}>{this.state.directions}</Text>
            </View>


            <Text style = {styles.dist}>
              {this.state.doneAtAudio?'':('In: ' + ( (this.turn === 0)?'0':JSON.stringify(Math.round(this.state.distToCurrent)) ) + ' FT')}
            </Text>

  {/* Turns / Locations Image */}
            {Array.isArray(this.state.picture) ?
              <Swiper paginationStyle={{bottom: 20 * Scales.horizontal}}>
                  {this.state.picture.map( onePic => <Image style={sharedStyles.swiper} source={onePic} key={Math.random()}/> )}
              </Swiper> : <Image style = {sharedStyles.swiper} source = {this.state.picture}/>
            }

  {/* Continue Button */}
            <TouchableHighlight style = {[sharedStyles.button, {opacity: this.state.clickable?1:.5}, styles.button]}
              underlayColor={sharedStyles.button.underlayColor}
              onPress={() => this.buttonPressed()}>
              <Text style={sharedStyles.buttonText}>Click to Continue</Text>
            </TouchableHighlight>
          </View>

  {/* Hidden Debugger Component */}
          <Debugger state={this.state} turn={this.turn} stage={this.stage} stopAudio = {()=>this.DEBUG_stopAudio()} lastTurn = {()=>this.DEBUG_lastTurn()} nextTurn = {()=>this.DEBUG_nextTurn()} toggleIsNearOverride={()=>this.DEBUG_toggleIsNearOverride()}/>
        </ScrollView>
      </View>
    );
  }


  //////////////////////////
 //// HELPER FUNCTIONS ////
//////////////////////////
  isNear(targetLat, targetLong, radius){
    return ( this.distTo(targetLat, targetLong) <= radius);
  }

  distTo(targetLat, targetLong){
    let lastLat = this.state.lastPos.latitude;
    let lastLong =  this.state.lastPos.longitude;
    let φ1 = lastLat/180 * Math.PI, φ2 = targetLat/180 * Math.PI, Δλ = (targetLong-lastLong)/180 * Math.PI, R = 3959 * 5280;
    return( Math.acos( Math.sin(φ1)*Math.sin(φ2) + Math.cos(φ1)*Math.cos(φ2) * Math.cos(Δλ) ) * R ); //Old dist*364537.777
  }


  /////////////////////////////
 //// DEBUGGING FUNCTIONS ////
/////////////////////////////

  DEBUG_stopAudio(){
    this.state.audioFile.stop();
    this.setState({audioIsPlaying: false});
    this.update();
  }

  DEBUG_nextTurn(){
    // LATER prevent overflow and play through at audio
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
    // LATER prevent overflow and play through at audio
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
  }
}

  /////////////////////
 //// MAIN STYLES ////
/////////////////////

const styles = StyleSheet.create({

  tourContainer:{
    width: Scales.width, //int value needed 
    height: Scales.height - Scales.headerHeight - Scales.tabBarHeight, //needed
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },

  titleBox: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 120 * Scales.horizontal, //needed fixed val   // TODO: make bigger like info page
    // backgroundColor: 'lightgreen',
    flexGrow: (Scales.hasNotch?.2:0),  
  },

  line:{
    backgroundColor: 'black',
    height: StyleSheet.hairlineWidth, //TODO line too close to directions on 4,3
    width: '66%',
  },

  directionsBox: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '83%', //TODO 4,3 longest direction
    height: 100 * Scales.horizontal, //Done needed fixed val

    // backgroundColor: 'pink',
  },

  directions:{
    fontSize: 15.6 * Scales.font,
    color: MyTheme.defaultText.color,
    fontWeight: Scales.fontWeight('300'),
    textAlign: 'center',

    // backgroundColor: 'lightgreen',
    // width: '100%',
  },

  dist:{
    fontSize: 13 * Scales.font,
    color: 'dimgray',
    fontWeight: Scales.fontWeight('500'),
    textAlign: 'center',

    // backgroundColor: 'lightblue',
    // width: '100%',
  },

  button:{
    width: '66%',
    marginVertical: (Scales.hasNotch?15:0) * Scales.horizontal, //LATER maybe make buttonBox and do flexGrow?
  },

});

module.exports = AudioPage;
