import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
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

var scale = 450;
var scaleH = 800;

var Swiper = require('../helpers/Swiper');
var Locations = require('../helpers/turns');

//TODO: Use better conditional formatting
const d_window = Dimensions.get('window');

//TODO: REMOVEEEEE PLEASEEEE
var doneAtAudio = false;
var isNearLastTurn = true;
// var firstAudio = true;

const mode = 'debug'; // debug, demo, tester1, tester2, release

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
      
      tourEnded: false,

      isNearOverride: false, //for debugging
    };
  }



  ///////////////////////
 //// INIT FUCTIONS ////
///////////////////////

  componentDidMount(){
    this.props.navigation.setOptions({ 
      headerLeft: () => ( <Button title='End Tour' onPress={() => this.endTourButton()} /> ),
      headerRight: () => ( <Button title='Return Home' onPress={() => this.returnHomeButton()} /> ),
    })
    activateKeepAwake();
    Sound.setCategory('Playback', false);
    Sound.setActive(true); //TODO: Check if should turn off after audio is finished cause it is rn

    //####### set turns and stage to passed value in props ############
    Turns.stage = this.props.route.params.stage;
    Turns.turn = Turns.stages[Turns.stage].loc.length-1; //Grab last turn (atAudio)
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
    BackgroundGeolocation.requestPermission(); // NOTE: might need await NOT NEEDED
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
      if(Turns.stage === 14 && doneAtAudio){
        this.showEndScreen();
        return; //Needed to stop tour
      }
      /*------------------*/
      /* ! Play atAudio ! */
      /*------------------*/
      let currentStage = Turns.stages[Turns.stage];
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
        Turns.turn = 0;
        Turns.stage++;
        doneAtAudio = false;
        isNearLastTurn = false;
        this.setState({ title: Turns.stages[Turns.stage].title, picture: Turns.stages[Turns.stage].loc[0].picture});
        this.triggerAudio(Turns.stages[Turns.stage].toAudio, true);
        this.update();
      }
    }
  }

  update(){
    //TODO: better stage and turn tracker
    let currentStage = Turns.stages[Turns.stage];
    let currentTurn = currentStage.loc[Turns.turn];

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
    if(this.state.picture !== Turns.stages[Turns.stage].atPic)   // || currentStage.loc.length-1 > Turns.turn){
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
    let lastTurn = currentStage.loc[currentStage.loc.length-1];
    let radius = (isNearLastTurn ? 1150 : 200);
    isNearLastTurn = (this.state.isNearOverride||this.isNear(lastTurn.latitude, lastTurn.longitude, radius));
    this.setState({ clickable: (!this.state.audioIsPlaying && (currentStage.loc.length-1 === Turns.turn) && isNearLastTurn )});

    /*----------------------*/
    /* ! UPDATE NEXT TURN ! */
    /*----------------------*/
    // Set our next turn to either the next turn in the array or
    // if we are on the last turn of the array already, the first next turn of the next location
    // this alows us to non restrictivly update state and not leave extrainious states that are not updated
    // exeption: on last turn of last location cannot look ahead so we use Turns.stage instead of Turns.stage+1
    let nextTurn = (currentStage.loc.length-1 > Turns.turn) ? currentStage.loc[Turns.turn+1] : Turns.stages[ (Turns.stage===14)?14:Turns.stage+1 ].loc[1];

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
    if(this.state.isNear && (currentStage.loc.length-1 > Turns.turn) ){
      Vibration.vibrate();
      BackgroundGeolocation.playSound(1300); //default voicemail sound
      Turns.turn++;
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
      picture: [].concat.apply([], Turns.stages.map(pic => pic.atPic)),
      tourEnded: true,
    });

    this.triggerAudio(Turns.endAudio, false);
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
       { text: 'Go', onPress: () => { this.linkUrl("http://maps.apple.com/?daddr=Chatham%20Township%20Historical%20Society,+Chatham,+NJ&dirflg=d&t=m") }, style: 'cancel' } ] );
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
      <ScrollView>
        <View style = {styles.container}>
        { /* TODO: add condition for debug mode*/ }
          <View style = {styles.titleBox}>
            <Text style = {styles.title}>{this.state.title}</Text>
          </View>

          <View style = {styles.line}/>

          <View style = {styles.directionBox}>
            <Text style = {styles.directions}>{this.state.directions}</Text>
          </View>

          <Text style = {styles.dist}>
            {doneAtAudio?'':('In: ' + ( (Turns.turn === 0)?'0':JSON.stringify(Math.round(this.state.distToCurrent)) ) + ' FT')}
          </Text>


          {Array.isArray(this.state.picture)?

            <View style={styles.imageBox}>
              <Swiper
                showsButtons = {false}
                loop = {true}
                height={250 * (d_window.width/scale)}
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
            height: 36 * Math.pow((d_window.height/scaleH), 2), //height
            backgroundColor: 'gray',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            zIndex: 100000,
            top: (162 + 310) * (d_window.height/scaleH), //height
            opacity: this.state.clickable?1:.05,
          }}
          underlayColor = '#BBBBBB'
          onPress = {() => this.buttonPressed()}>
            <Text style={styles.buttonText}>Click to Continue</Text>
          </TouchableHighlight>


        </View>
      </ScrollView>
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

  linkUrl(url){
    Linking.canOpenURL(url).then(supported => {
      if (!supported) console.log('Can\'t handle url: ' + url);
      else return Linking.openURL(url);
    }).catch(err => console.log('An error occurred', err));
  }

  ////////////////////////////  
 //// DEBUGGING FUCTIONS ////
////////////////////////////
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
    // marginBottom: 10 * (d_window.width/scale), //height
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
    width: 150 * (d_window.width/scale),
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

  imageBox:{
    position: 'absolute',
    top: 310 * (d_window.width/scale),
    height: 250 * (d_window.width/scale),
    width: d_window.width,
    alignItems: 'center',
    justifyContent: 'center',
  },

  image:{
    height: 250 * (d_window.width/scale),
    width: d_window.width,
    alignSelf: 'center',
  },

  button:{
    width: d_window.width/1.5,
    height: 36 * (d_window.width/scale),
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },

  buttonText:{
    fontSize: 15 * (d_window.width/scale),
    color: 'white',
    fontWeight: '100',
    textAlign: 'center',
  },
});

  //////////////////////////  
 //// DEBUGGING STYLES ////
//////////////////////////
const debuggerStyles = StyleSheet.create({

  button: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 270 * (d_window.width/scale),
    left: 15 * (d_window.width/scale),
    backgroundColor: 'gray',
    height: 30 * (d_window.width/scale),
    width: 30 * (d_window.width/scale),
    borderRadius: 15 * (d_window.width/scale),
  },

  title:{
    fontSize: 50 * (d_window.width/scale),
    color: 'black',
    fontWeight: '100',
    textAlign: 'center',
    marginTop: 30 * (d_window.width/scale),
  },

  subtitle:{
    fontSize: 20 * (d_window.width/scale),
    color: 'black',
    fontWeight: '500',
    textAlign: 'center',
    paddingTop: 20 * (d_window.width/scale),
  },
});

module.exports = AudioPage;
