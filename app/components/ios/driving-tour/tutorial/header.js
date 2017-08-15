'use strict';

import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  Dimensions,
} from 'react-native'

import Icon from 'react-native-vector-icons/EvilIcons';

class Header extends Component {

  render() {
    return (
      <View style={styles.container}>

        <Text style={styles.title}>Tutorial</Text>

        <Icon
          name={'close'}
          size={40 * (Dimensions.get('window').width/375)}
          color={'#157EFB'}
          onPress={()=>this.props.onPress()}
          style={styles.exitButton}/>

      </View>
    );
  }
}

const styles = StyleSheet.create({

  container:{
    alignItems: 'center',
  },

  title:{
    position: 'absolute',
    bottom: (247 + 1) * (Dimensions.get('window').height/667),
    fontSize: 30 * (Dimensions.get('window').width/375),
    fontWeight: '100',
  },

  exitButton:{
    position: 'absolute',
    bottom: 247 * (Dimensions.get('window').height/667),
    right: 101 * (Dimensions.get('window').width/375),
  },
});

module.exports = Header;
