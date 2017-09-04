'use strict';

import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  TouchableHighlight,
  View,
  Text,
  Dimensions,
  Button,
  Image,
} from 'react-native'

const d_window = Dimensions.get('window');

class Page2 extends Component {

  render() {
    return (
      <View style = {styles.container}>

        <View style={styles.imageBox}>
          <Image
            source={require('../../../../images/tutorial2.jpg')}
            style={styles.image}
          />
        </View>

        <Text allowFontScaling = {false} style = {styles.text}>
          On the next page you will pick your starting location. The tour will tour only the locations listed after. (Any locations listed before the selected location will not be toured.)
        </Text>


        <TouchableHighlight style = {styles.button}
          onPress = {() => this.props.onPress()}
          underlayColor = '#BBBBBB'>

          <Text allowFontScaling = {false} style = {styles.buttonText}>Click to Continue</Text>

        </TouchableHighlight>

      </View>
    );
  }
}

const styles = StyleSheet.create({

  container:{
    alignItems: 'center',
  },

  imageBox:{
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 57 * (d_window.height/667),
    marginBottom: 21 * Math.pow((d_window.height/667), 2),
    backgroundColor: 'lightgrey',
    borderRadius: 10 * (d_window.width/375),
  },

  image:{
    width: (d_window.width/1.25)/1.375,
    height: (d_window.width/.9413)/1.375,
    margin: 10 * (d_window.width/375),
    borderRadius: 5 * (d_window.width/375),
  },

  text:{
    textAlign: 'center',
    fontSize: 15 * (d_window.width/375),
    fontWeight: '500',
    color: 'black',
    paddingHorizontal: 20 * (d_window.width/375),
  },

  button:{
    width: d_window.width/1.25,
    height: 35 * Math.pow((d_window.height/667), 1.5),
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22 * Math.pow((d_window.height/667), 2),
  },

  buttonText:{
    fontSize: 16 * (d_window.width/375),
    color: 'white',
    fontWeight: '100',
    textAlign: 'center',
  },
});

module.exports = Page2;
