//comes from tour page
//here there will be a scroll view of all locations
//each button passes props to an onClick() handler which nvigates to info page and passes props to it
// props include title, stage, turn, picture, adress

import React, { Component, } from 'react'
import {
  AppRegistry,
  StyleSheet,
  NavigatorIOS,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  VibrationIOS,
  Image,
  Slider,
} from 'react-native'

var AudioPage = require('./audio-page');

class SelectionPage extends Component{

  constructor(props){
    super(props);
    this.state = {
      intervalID: setInterval(()=>this.check(), 1000),
      turn: 0,
      stage: 0,
      value: null,
    }
  }


  NavToAudio(){
    this.props.navigator.push({
      title: 'Audio Tour',
      component: AudioPage,
      passProps: {
        unmount: this.props.unmount,
        stage: this.state.stage,
        turn: this.state.turn,
      },
    });
  }

  check(){
    if(this.props.unmount().b){
      this.props.navigator.popToTop();
    }
  }

  componentWillUnmount(){
    //this.props.navigator.popToTop();
    clearInterval(this.state.intervalID);
  }

  render() {
    return(
      <View style = {styles.container}>

        <Slider style = {styles.slider}
        onValueChange = {(value) =>{this.setState({stage: value})}}
        step = {1}
        minimumValue = {0}
        maximumValue = {13}
        maximumTrackTintColor = {'blue'}
        value = {this.state.stage}/>

        <Slider
          style = {styles.slider}
          step = {1}
          minimumValue = {0}
          maximumValue = {4}
          value = {this.state.turn}
          onValueChange = {(value) =>{this.setState({turn: value})}}
          disabled = {false}/>

          <Slider/>

        <TouchableOpacity style = {styles.button} onPress = {() => this.NavToAudio()}>
          <Text style={styles.buttonText}> Click To Continue </Text>
        </TouchableOpacity>
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
    backgroundColor: '#424ac1',
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
    bottom: 50,
    transform: [{translateY:50}],
  },

  buttonText:{
    fontSize: 15,
    color: 'white',
    fontWeight: '100',
  },

  slider: {
    height: 10,
    margin: 10,
  },

});

module.exports =  SelectionPage;
