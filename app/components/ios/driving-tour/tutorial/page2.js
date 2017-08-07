'use strict';

import React, { Component, } from 'react'
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

        <Text style = {styles.text}>
          On the next page you will pick your starting location. The tour will continue through only the locations listed after. (Any location listed before the location you select will not be played.)
        </Text>


        <TouchableHighlight style = {styles.button}
          onPress = {() => this.props.onPress()}
          underlayColor = '#BBBBBB'>

          <Text style = {styles.buttonText}>Click to Continue</Text>

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
    marginTop: 57 * (Dimensions.get('window').height/667),
    marginBottom: 15 * (Dimensions.get('window').height/667),
    backgroundColor: 'lightgrey',
    borderRadius: 10 * (Dimensions.get('window').width/375),
  },

  image:{
    width: (Dimensions.get('window').width/1.25)/1.375,
    height: (Dimensions.get('window').width/.9413)/1.375,
    margin: 10 * (Dimensions.get('window').width/375),
    borderRadius: 5 * (Dimensions.get('window').width/375),
  },

  text:{
    textAlign: 'center',
    fontSize: 15 * (Dimensions.get('window').width/375),
    fontWeight: '500',
    color: 'black',
    paddingHorizontal: 20 * (Dimensions.get('window').width/375),
  },

  button:{
    width: Dimensions.get('window').width/1.25,
    height: 35 * (Dimensions.get('window').height/667),
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 17 * (Dimensions.get('window').height/667),
  },

  buttonText:{
    fontSize: 16 * (Dimensions.get('window').width/375),
    color: 'white',
    fontWeight: '100',
    textAlign: 'center',
    margin: 10 * (Dimensions.get('window').width/375),
  },
});

module.exports = Page2;
