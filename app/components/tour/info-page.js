// LATER: add geolocation check location if near specified location
//        add alert if pressed and not near
//        or merge with audio page
import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  Linking,
  TouchableHighlight,
} from 'react-native'
import { sharedStyles, MyTheme, Scales } from '../helpers/shared_styles';
import BackgroundGeolocation from "react-native-background-geolocation";

var Swiper = require('../helpers/Swiper');

class InfoPage extends Component{

  constructor(props){
    super(props);
    this.state = {
      loc: props.route.params.loc,
      url: null,
    }
  }

  async permissionsPopup(){
     // Force permission request 
     // Will either: 
     //       do nothing if permissions are already set,
     //       show permissions request popup (set in Info.plist),
     //       or if location is set to never, throw error and show denied popup (set in App.ios.js) 
    try{
      const status = await BackgroundGeolocation.requestPermission(); 
      console.log("[requestPermission] STATUS: ", status);
    } catch (error) {
      console.error("[requestPermission] ERROR: ", error)
      return;
    };

    // Next request temporary precise location (needed for tour to work)
    // If iPhone doesn't support precise location, or precise location is defaulted on, request passes successfully and proceeds to navToAudio()
    // If neither, it will show popup (set in Info.plist)
    //        if accepted, proceeds to navToAudio()
    //        if denied, Precise Location is off popup is shown and permissionsPopup() is recursively called until request is accepted
    try {
      const status = await BackgroundGeolocation.requestTemporaryFullAccuracy("Driving")
      console.log('[requestTemporaryFullAccuracy] STATUS:', status)
      if (status) {
        Alert.alert('Precise Location is off', 'Allow precise location to start the tour',
        [{ text: 'Ok, I Understand', onPress: () => this.permissionsPopup()}, ]);
        return;
      }
    } catch (error) {
      console.error("[requestTemporaryFullAccuracy] ERROR: ", error) //Always undefined
      return;
    };

    this.navToAudio();
  }

  navToAudio(){
    this.props.navigation.navigate('Tour', {
      screen: 'Audio Tour',
      params: {
        stage: this.props.route.params.stage,
      }
    })
  }
  
  onPress(){
    Alert.alert('SAFETY', '\n1) You must have a passenger to follow and read the directions as the come up on the phone screen.\n\n 2) If you miss a turn, safely navigate through adjacent roads, and proceed back to the instructed route.\n\n 3) Some locations have limited parking. Please be cautious of your surroundings, and pay attention to the specified parking directions.\n\n 4) Some markers are on private property. Be courteous to others, and be mindful of trespassing.\n\n 5) Drive safely. The developer, the Chatham Township Historical Society, and contributors to the app hold no liability for any incidents that may occur while using this app.'
    ,[{ text: 'Ok, I Understand', onPress: () => this.permissionsPopup()},
    ]);
  }

  componentDidMount(){
    let linkStart = "http://maps.apple.com/?daddr=";
    let address = this.state.loc.address.replace(/\s/g, "+");
    let linkEnd = ",NJ&dirflg=d&t=m";
    this.setState({url: linkStart + address + linkEnd});
  }

  render() {
    return(
      <View style = {sharedStyles.container}>
        {Scales.hasNotch && <View style = {sharedStyles.headerBorder}/>}
        <Text style = {sharedStyles.locationTitleText}>{this.state.loc.title}</Text>

        <Text style = {styles.subtext}>
          <Text > Please navigate to</Text>
          <Text style = {sharedStyles.clickable} onPress={() => Linking.openURL(this.state.url)}> {this.state.loc.address} </Text>
          <Text >then click the button below to start the tour.</Text>
        </Text>

        {this.state.loc.squareAtPic.length>1 ?
          <Swiper width={styles.image.width} height={styles.image.width} >
            {this.state.loc.squareAtPic.map( onePic => <Image style={styles.image} source={onePic} key={Math.random()}/> )}
          </Swiper> : <Image style = {styles.image} source = {this.state.loc.squareAtPic[0]}/>
        }

        <TouchableHighlight style = {sharedStyles.button}
          underlayColor = {sharedStyles.button.underlayColor} 
          onPress = {() => this.onPress()}>
          <Text style={sharedStyles.buttonText}> Click to Start the Tour! </Text> 
        </TouchableHighlight>

      </View>
    );
  }
}

const styles = StyleSheet.create({

  subtext:{
    fontSize: 20 * Scales.font,
    color: MyTheme.defaultText.color,
    fontWeight: MyTheme.defaultText.weight,
    textAlign: 'center',
    paddingHorizontal: '8.5%', //Done //>9% @ 20 makes a fourth line
  },

  image:{
    width: .33 * Scales.height,
    height: undefined,
    aspectRatio: 1,
  },

});

module.exports = InfoPage;
