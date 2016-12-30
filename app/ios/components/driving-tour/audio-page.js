'use strict';

import React, { Component, } from 'react'
import {
  AppRegistry,
  StyleSheet,
  NavigatorIOS,
  Text,
  View,
  VibrationIOS,
} from 'react-native'

const geoOpt = {enableHighAccuracy: true, timeout: 1000, maximumAge: 1000};

class AudioPage extends Component {


  constructor(props){
    super(props);
    this.state ={
      initialPos: 'unknown',
      lastPos: 'unknown',
    };

    var intervalID = setInterval(() => {
      navigator.geolocation.getCurrentPosition((position) => {
        this.setState({lastPos: position.coords});
      }, (error) => alert(JSON.stringify(error)), geoOpt);
    }, 1000);
  }


  IsNear(targetLat, targetLong, radius){

    let lastLat = this.state.lastPos.latitude;
    let lastLong =  this.state.lastPos.longitude;

    return ( Math.sqrt((lastLong-targetLong)^2 + (lastLat-targetLat)^2) <= (radius/(364537+7/9)) )

  }

  componentWillUnmount(){
    //navigator.geolocation.clearWatch(this.watchID);
    clearInterval(this.intervalID);
    this.props.navigator.popToTop();
    //TODO pop to top stack navigatorIos

  }

  componentWillUpdate(){


    // navigator.geolocation.getCurrentPosition(
    //   (position) => {
    //     let lastLong = JSON.stringify(position.coords.longitude);
    //     let lastLat = JSON.stringify(position.coords.latitude);
    //     this.setState({lastLong: lastLong});
    //     this.setState({lastLat: lastLat});
    //   },
    //     (error) => alert(JSON.stringify(error)), geoOpt);


  //  _getLocation();
  //  if(this.IsNear(-74.4243418426146, 40.71324971508301, 25)){
  if(this.IsNear(this.state.initialPos.latitude, this.state.initialPos.longitude, 25)){
    //  this.setState({isNear: 'true'});
      VibrationIOS.vibrate();
     } else {
    //  this.setState({isNear: 'false'});
    }
  }


  //watchID: ?number = null;
  componentDidMount(){

    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({initialPos: position.coords});
    }, (error) => alert(JSON.stringify(error)), geoOpt);

    // this.watchID = navigator.geolocation.watchPosition((position) => {
    //   this.setState({lastLong: position.coords.longitude, lastLat: position.coords.latitude});
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
          TARGET
        </Text>
        <Text> Longitude: -74.4243418426146</Text>
        <Text> Latitude: 40.71324971508301</Text>


        <Text style = {styles.location}>
          LAST
        </Text>
        <Text> Longitude: {this.state.lastPos.longitude}</Text>
        <Text> Latitude: {this.state.lastPos.latitude}</Text>
        <Text> isNear: {JSON.stringify(this.IsNear(this.state.initialPos.latitude, this.state.initialPos.longitude, 25))} </Text>

      </View>
    )
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
    padding: 50
  },

});

module.exports = AudioPage;
