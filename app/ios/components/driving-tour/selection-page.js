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
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native'

var Location = require('./start-loc');

class SelectionPage extends Component{

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

  render() {
    return(
      <ScrollView>
        <View style = {styles.container}>
            <Location
              pic = {null} title = {'My Title'} adress = {'Adress'}
              stage = {1} turn = {1}
              unmount = {this.props.unmount} navigator = {this.props.navigator}/>

        </View>
      </ScrollView>
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

module.exports = SelectionPage;
