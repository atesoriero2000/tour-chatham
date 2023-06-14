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
      currentTargetPos: 'unknown',
      distToCurrent: 0,
      isNear: false, //next turn
      clickable: true, //needed (componentDidMount manually calls buttonPressed to start the tour)
      audioIsPlaying: false,
      doneAtAudio: false, //needed to trigger at audio first
      directions: 'NONE',
      isNearLastTurn: false, //used for setting clickable

      isNearOverride: false, //for debugging
      distToNext: 0, //for debugger
      nextTargetPos: 'unknown', //for debugger
      lastLocation: {activity: {type: 'unknown', confidence: 'unknown'}}, //for debugger
    };
  }


  ////////////////////////
 //// INIT FUNCTIONS ////
////////////////////////

  componentDidMount(){
    activateKeepAwake();
    this.props.navigation.setOptions({ headerLeft: () => ( <Button title='End Tour' color={'red'} onPress={() => this.endTourButton()} /> )})
    Sound.setCategory('Playback', true);//NOTE bug patch needed with https://github.com/zmxv/react-native-sound/issues/788
    Sound.setActive(true); // Only once per session, set to false only when you don't want any more background audio

    //####### set turns and stage to passed value in props ############
    // LATER: move to state instead of class var
    this.stage = this.props.route.params.stage;
    this.turn = Locations[this.stage].turns.length-1; // Grab last turn (atAudio)
    this.startGeolocation();
    this.buttonPressed(); // Starts the tour (triggers atAudio)
  }

  startGeolocation(){
    BackgroundGeolocation.logger.destroyLog();
    BackgroundGeolocation.start().then((state) => console.log('[start] STATUS:', state)).catch( (error) => console.error("[start] ERROR: ", error)) //LATER restart or prevent tour to continue
    BackgroundGeolocation.onLocation(
      (location) => {
        console.log("[onLocation] success: ", location);
        this.setState({lastPos: location.coords, lastLocation: location});
        this.update();
      }, (error) => console.error("***** onLocation FAILED *****:    ", error)); //LATER if onLocation fails multiple times (restart location?, or stop tour with alert? return to home page)

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
       this.props.navigation.setOptions({ headerRight: () => {} });


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
        this.props.navigation.setOptions({ headerRight: () => ( <Button title='Directions' onPress={() => this.appleDirections()}/> ) });

        console.log(this.state.isNear, this.state.isNearOverride, this.state.isNearLastTurn)
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
    // Sets the next turn to look ahead to.
    // When a user is within the specified radius of this next turn, the turn counter increments
    // if we are at the last turn of the stage, it uses the first turn of the next stage
    // if we are at the last turn of the last stage, it uses the first turn of the last stage as a placeholder as nextTurn is not needed anymore
    let nextTurn = (currentStage.turns.length-1 > this.turn) ? currentStage.turns[this.turn+1] : Locations[(this.stage===14)?14:this.stage+1].turns[0];

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
      console.log(this.state.isNear)
      Vibration.vibrate();
      BackgroundGeolocation.playSound(1300); //default voicemail sound
      this.turn++;
    }
  }

  triggerAudio(audioFile, updateOnFinish){1
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
    this.state.audioFile.stop();
    this.triggerAudio(endAudio, false); //false prevents update on audio finish callback 
    // this.triggerAudio( (this.stage == 14) ? endAudio1 : endAudio2, false); // LATER
    // Say: "Thank you for taking the Chatham Township Historical Society Marker Tour"
    // Old: "Congratulations, you have completed the Chatham Township Historical Society Marker Tour"
    this.props.navigation.setOptions({
      headerLeft: () => (<Button title='Exit' color={'rgb(75,75,75)'} onPress={() => this.props.navigation.popToTop()}/> ), //LATER remove and use continue button with changed text "Click to Exit/Finish" and onPress
      headerRight: () => ( <Button title='To Museum' color={sharedStyles.swiper.activeColor} onPress={() => Linking.openURL("http://maps.apple.com/?daddr=Chatham%20Township%20Historical%20Society,+Chatham,+NJ&dirflg=d&t=m")}/> ),
    });
    this.setState({
      doneAtAudio: true, //needed to hide distance counter
      title: 'Thank You\nfor taking the tour!',
      directions: 'To exit this page, click the "Exit" button in the top left corner. For directions to the Red Brick Schoolhouse Museum, click the "To Museum" button in the top right corner.',
      picture: [].concat.apply([], Locations.map(loc => loc.atPic)),
    });
  }

  endTourButton(){
    Alert.alert( 'End Tour Warning', 'Are you sure you want to end the tour?',
        [{ text: 'Cancel', style: 'cancel' },
         { text: 'End Tour', onPress: () => { this.showEndScreen() }, style: 'destructive'}, ] );
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
    //return false if any input is null, if not return isNear
    return (!(!targetLat||!targetLong||!radius) && (this.distTo(targetLat, targetLong) <= radius));
  }

  distTo(targetLat, targetLong){ //LATER handle null values
    let lastLat = this.state.lastPos.latitude;
    let lastLong =  this.state.lastPos.longitude;
    let φ1 = lastLat/180 * Math.PI, φ2 = targetLat/180 * Math.PI, Δλ = (targetLong-lastLong)/180 * Math.PI, R = 3959 * 5280;
    return( Math.acos( Math.sin(φ1)*Math.sin(φ2) + Math.cos(φ1)*Math.cos(φ2) * Math.cos(Δλ) ) * R ); //Old dist*364537.777
  }

  appleDirections(){
    let address = Locations[this.stage].address.replace(/\s/g, "+");
    Alert.alert( 'Apple Maps Directions', '\nUse Apple Maps to navigate to ' + this.state.title + ' as the tour continues in the background?',
      [{ text: 'Cancel', style: 'default' },
       { text: 'Go', onPress: () => { Linking.openURL("http://maps.apple.com/?daddr=" + address + ",NJ&dirflg=d&t=m") }, style: 'cancel' } ] );
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
    height: 130 * Scales.horizontal, //needed fixed val
    // backgroundColor: 'lightgreen',
    flexGrow: (Scales.hasNotch?.2:0),  
  },

  line:{
    backgroundColor: 'black',
    height: StyleSheet.hairlineWidth,
    width: '66%',
  },

  directionsBox: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%', // 4,3 longest direction (2,1 is also long)
    height: 100 * Scales.horizontal, //Done needed fixed val
    marginTop: 5 * Scales.horizontal, //LATER

    // backgroundColor: 'pink',
  },

  directions:{
    fontSize: 15.6 * Scales.font,
    color: MyTheme.defaultText.color,
    fontWeight: MyTheme.defaultText.weight,
    textAlign: 'center',

    // backgroundColor: 'lightgreen',
    // width: '100%',
  },

  dist:{
    fontSize: 13 * Scales.font,
    color: 'dimgray',
    fontWeight: MyTheme.defaultText.boldWeight,
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
