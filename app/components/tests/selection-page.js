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

var AudioPage = require('../audio-page');
var Turns = require('../turns');

var valid = true;

class SelectionPageTest extends Component{

  constructor(props){
    super(props);
    this.state = {
      intervalID: setInterval(()=>this.check(), 1000),
      turn: 0,
      stage: 0,
    }
  }


  NavToAudio(){
    valid = false;
    this.props.navigator.push({
      title: 'Audio Tour',
      component: AudioPage,
      leftButtonTitle: 'End Tour',
      onLeftButtonPress: () => {this.props.navigator.popToTop(); valid = true;},

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

        <Text style = {styles.text}>Location: {this.state.stage+1}</Text>
        <Slider style = {styles.slider}
          step = {1}
          maximumValue = {13}
          minimumValue = {0}
          value = {this.state.stage}
          onValueChange = {(value) =>{this.setState({stage: value, turn: 0})}}
      />

        <Text style = {styles.text}>Turn: {this.state.turn+1}</Text>
        <Slider style = {styles.slider}
          step = {1}
          minimumValue = {0}
          maximumValue = {Turns.stages[this.state.stage].loc.length-1}
          value = {this.state.turn}
          onValueChange = {(value) => this.setState({turn: value})}
        />

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
    //backgroundColor: '#424ac1',
  },

  text:{
    fontSize: 30,
    color: 'black',
    fontWeight: '300',
    textAlign: 'center',
    paddingTop: 25,
  },

  button:{
    width: Dimensions.get('window').width/1.5,
    height: 36,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    marginTop: 30,
  },

  buttonText:{
    fontSize: 15,
    color: 'white',
    fontWeight: '100',
  },

  slider: {
    width: 300,
    height: 10,
    margin: 10,
  },

});

module.exports =  SelectionPageTest;
