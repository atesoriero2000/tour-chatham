// comes from selection page or tour page
// has a picture of the location, title and adress saying to nav to this and click button to startPic
// button click hander onClick() navs to audio page and passes turn and stage props

import React, { Component, } from 'react'
import {
  AppRegistry,
  StyleSheet,
  NavigatorIOS,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native'

var AudioPage = require('./audio-page');
var Turns = require('./turns');

class InfoPage extends Component{

  constructor(props){
    super(props);
    this.state = {
      intervalID: setInterval(()=>this.check(), 1000),
    }
  }

  check(){
    if(this.props.unmount().b){
      this.props.navigator.popToTop();
    }
  }

  componentWillUnmount(){
    clearInterval(this.state.intervalID);
  }

  NavToAudio(){
    this.props.navigator.push({
      title: 'Audio Tour',
      component: AudioPage,
      leftButtonTitle: 'End Tour',
      onLeftButtonPress: () => this.props.navigator.popToTop(),

      passProps: {
        unmount: this.props.unmount,
        stage: this.props.stage,
        turn: this.props.turn,
      },
    });
  }

  render() {
    return(
      <View style = {styles.container}>

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

module.exports = InfoPage;
