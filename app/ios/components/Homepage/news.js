'use strict';

import React, { Component, } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NavigatorIOS,
  ScrollView
} from 'react-native'

class News extends Component {

  constructor(props){
    super(props);
    this.state = {
      intervalID: setInterval(()=>this.check(), 1000),
    }
  }

  componentWillUnmount(){
    this.props.navigator.popToTop();
    clearInterval(this.state.intervalID);
  }

  check(){
    if(this.props.unmount().a){
      this.props.navigator.popToTop();
    }
  }

  render() {
    return (
      <ScrollView>
        <View style = {styles.container}>
          <Text style = {styles.text}>
          NEWS
          </Text>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({

  container:{
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center'
    //backgroundColor: '#424ac1',
  },

  text:{
    marginHorizontal: 20,
    marginVertical: 200,
    fontSize: 50,
    color: 'black',
    fontWeight: '100',
  //  textAlign: 'center',
  },
});

module.exports = News;
