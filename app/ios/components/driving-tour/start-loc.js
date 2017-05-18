// Component of selectionPage
// receive props Image, Title, stage, turn, Adress, unmount,
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

var InfoPage = require('./info-page');

class Location extends Component{

  constructor(props){
    super(props);
    this.state = {

    }
  }

  NavToInfo(){
    this.props.navigator.push({
      title: 'Drive to Starting Location',
      component: InfoPage,
      passProps: {
        unmount: this.props.unmount,
        stage: this.props.stage,
        turn: this.props.turn,
        title: this.props.title,
        pic: this.props.pic,
        adress: this.props.adress,
      },
    });
  }

  render() {
    return(

      <TouchableOpacity onPress = {() => this.NavToInfo()}>
        <View style = {styles.container}>

          <Text>HI</Text>



        </View>
      </TouchableOpacity>

    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    width: Dimensions.get('window').width,
    height: 75,
    margin: 10,
    backgroundColor: 'gray',
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


});

module.exports = Location;
//AppRegistry.registerComponent('Location', () => Location);
