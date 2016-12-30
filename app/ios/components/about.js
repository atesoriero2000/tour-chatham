'use strict';

import React, { Component, } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  ScrollView
} from 'react-native'

class About extends Component {

  render() {
    return (
      <ScrollView>
        <View style = {styles.container}>

        <View style = {styles.top}>
          <View style = {styles.left}>
            <Text style = {styles.text}>
                This app was created by Tony Tesoriero, a Local Chatham Resident, as his Eagle Scout Project.
            </Text>
          </View>

          <View style = {styles.right}>
            <Image style = {styles.logo} source={require('image!tony')} />
          </View>
        </View>



          <View style = {styles.bottom}>
              <Text style = {styles.text}>  Thanks to all who helped! ~ </Text>
              <Text style = {styles.text}> Catarina Dematos </Text>
          </View>


        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  top:{
    flex: 2,
    flexDirection: "row",
    backgroundColor: "blue",
    height: 300,
  },


  bottom:{
    flex: 2,
    flexDirection: "column",
    backgroundColor: "red",
    height: 1000,
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  right:{
    flex: 1,

  },
  left:{
    flex: 1,


  },


  container:{
    flex: 2,
    flexDirection: "column",
    //justifyContent: 'flex-start'
    //backgroundColor: '#424ac1',
  },

    logo:{
      margin: 20,
      width: 100,
      height: 200,
      //transform: [{translateX:200, translateY:20}]//REMEBER THIS SHIT BRO
    },

  textHeader:{
    marginHorizontal: 20,
    fontSize: 50,
    color: 'black',
    fontWeight: '100',
    textAlign: 'right',
  },

  text:{
    padding: 50,
    fontSize: 18,
    color: 'black',
    fontWeight: '100',

  }
});

module.exports = About;
