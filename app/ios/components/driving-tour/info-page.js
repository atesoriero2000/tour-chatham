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
      //intervalID: setInterval(()=>this.check(), 1000),
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
        stage: this.props.stage,
      },
    });
  }

  render() {
    return(
      <View style = {styles.container}>

        <Text style = {styles.text}> {this.props.title} </Text>

        <Text style = {styles.subtext}>
          Please navigate to
            <Text selectable = {true} style = {styles.text_bold}> {this.props.adress} </Text>
          then click the button below to start the tour.
        </Text>

        <Image style = {styles.image} source = {this.props.pic}/>

        <TouchableOpacity style = {styles.button} onPress = {() => this.NavToAudio()}>
          <Text style={styles.buttonText}> Click To Continue </Text>
        </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 5,
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
    paddingHorizontal: 25,
  },

  text_bold:{
    fontSize: 20,
    color: 'black',
    fontWeight: '300',
    textAlign: 'center',
  },

  subtext:{
    fontSize: 20,
    color: 'black',
    fontWeight: '200',
    textAlign: 'center',
    paddingHorizontal: 25,
    paddingTop: 25,
  },

  directions:{
    fontSize: 15,
    color: 'black',
    fontWeight: '200',
    textAlign: 'center',
    paddingHorizontal: 25,
  },

  button:{
    width: Dimensions.get('window').width/1.5,
    height: 36,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText:{
    fontSize: 15,
    color: 'white',
    fontWeight: '100',
  },

  image:{
    margin: 25,
    height: Dimensions.get('window').width / 1.5,
    width: Dimensions.get('window').width / 1.5,
    backgroundColor: 'red',
  },

});

module.exports = InfoPage;
