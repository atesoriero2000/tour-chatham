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

class AudioPage extends Component {

  constructor(props){
    super(props);
    this.state = {
      initialLong: 'unknown',
      initialLat: 'unknown',
      lastLong: 'unknown',
      lastLat: 'unknown',
    };
  }

  watchID: ?number = null;

  IsNear(targetLat,targetLong, radius){

    var lastLat = this.state.lastLat;
    var lastLong =  this.state.lastLong;

    return ( (lastLong-targetLong)^2 + (lastLat-targetLat)^2 <= radius/(364537+(7/9)) )

    // var targetLat = -74.4243418426146
    // var targetLong = 40.71324971508301

  }

  componentWillUnmount(){
    navigator.geolocation.clearWatch(this.watchID);
  }

  componentWillUpdate(){

    if(this.IsNear(-74.4243418426146, 40.71324971508301, 25)){
      VibrationIOS.vibrate();
    }
  }

  componentDidMount(){
    navigator.geolocation.getCurrentPosition(
      (position) => {
        var initialLong = JSON.stringify(position.coords.longitude);
        var initialLat= JSON.stringify(position.coords.latitude)
        this.setState({initialLong});
        this.setState({initialLat});
      },
        (error) => alert(JSON.stringify(error)),
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
      );


    this.watchID = navigator.geolocation.watchPosition((position) => {
      var lastLong = JSON.stringify(position.coords.longitude);
      var lastLat= JSON.stringify(position.coords.latitude);
      this.setState({lastLong});
      this.setState({lastLat});
    },
      alert("Cannot get position"),
      {enableHighAccuracy: true}
    );
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
        <Text> Longitude: {this.state.initialLong}</Text>
        <Text> Latitude: {this.state.initialLat}</Text>


        <Text style = {styles.location}>
          TARGET
        </Text>
        <Text> Longitude: -74.4243418426146</Text>
        <Text> Latitude: 40.71324971508301</Text>


        <Text style = {styles.location}>
          LAST
        </Text>
        <Text> Longitude: {this.state.lastLong}</Text>
        <Text> Latitude: {this.state.lastLat}</Text>

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
