'use strict';

import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  TouchableHighlight,
  View,
  Text,
  Dimensions,
  Image,
} from 'react-native'

const d_window = Dimensions.get('window');

class Page1 extends Component {

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.imageBox}>
          <Image
            source={require('../../../../images/tutorial1.jpg')}
            style={styles.image}
            />
        </View>

        <Text allowFontScaling = {false} style = {styles.text}>
          Directions will appear on the screen instructing you exactly what to do and what turns to make. Below, will be a counter identifying how far you are from each turn.
        </Text>

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
    marginBottom: 15 * Math.pow((d_window.height/667), 2),
    backgroundColor: 'lightgrey',
    borderRadius: 10 * (d_window.width/375),
  },

  image:{
    width: (d_window.width/1.25)/1.375,
    height: (d_window.width/.7597)/1.375,
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
});

module.exports = Page1;
