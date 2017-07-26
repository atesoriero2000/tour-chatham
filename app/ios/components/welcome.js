'use strict';

import React, { Component, } from 'react'
import {
  AppRegistry,
  StyleSheet,
  View,
  Image,
  Text,
  Dimensions,
  TouchableHighlight,
  Button,
  Linking,
} from 'react-native'

class Welcome extends Component {

  render() {
    return (

      <View style = {styles.container}>

        <Text style = {styles.text}>
          The Chatham Historical Society Driving Tour
        </Text>

        <Image style = {styles.logo} source={require('../../images/chs_logo.jpg')} />
        {/* <Swiper
          showsButtons = {true}
          // dotColor = {'grey'}
          // activeDotColor = {'black'}
          index  = {0}
          loop = {true}
          autoplay={true}
          autoplayTimeout={2.5}> */}

        <TouchableHighlight style = {styles.button}
          onPress = {() => this.toNews()}
          underlayColor = '#BBBBBB'>

          <Text style = {styles.buttonText}>
            News ->
          </Text>

        </TouchableHighlight>

      </View>
    )
  }

  toNews(){
    let url = "http://www.chathamtownshiphistoricalsociety.org/programsmeetings.html";
    Linking.canOpenURL(url).then(supported => {
      if (!supported) console.log('Can\'t handle url: ' + url);
      else return Linking.openURL(url);
    }).catch(err => console.error('An error occurred', err));
  }
}

const styles = StyleSheet.create({

  logo:{
    width: Dimensions.get('window').width,
    height: 300 * (Dimensions.get('window').width/375),
  },

  container:{
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },

  text:{
    marginHorizontal: 20 * (Dimensions.get('window').width/375),
    marginBottom: 10 * (Dimensions.get('window').width/375),
    fontSize: 25 * (Dimensions.get('window').width/375),
    width: 300 * (Dimensions.get('window').width/375),
    color: 'black',
    fontWeight: '100',
    textAlign: 'center',
    justifyContent: 'center',
  },

  button:{
    width: Dimensions.get('window').width,
    height: 36 * (Dimensions.get('window').width/375),
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10 * (Dimensions.get('window').width/375),
    opacity: 0.5,
    bottom: -40 * (Dimensions.get('window').width/375),
  },

  buttonText:{
    fontSize: 18 * (Dimensions.get('window').width/375),
    color: 'white',
    fontWeight: '100',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

module.exports = Welcome;
