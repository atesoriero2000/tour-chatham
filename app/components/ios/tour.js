'use strict';

import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  NavigatorIOS,
  Dimensions,
  Image,
} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons';
const d_window = Dimensions.get('window');

var Start = require('./driving-tour/start');

class Tour extends Component {

  constructor(props){
    super(props);
    this.state = {
      helpIcon: false,
      infoIcon: false,
    };
  }

  componentWillMount(){
    Icon.getImageSource('ios-help-circle-outline', 25, '#157EFB').then( (helpIcon) => this.setState({ helpIcon }));
    Icon.getImageSource('ios-information-circle-outline', 25, '#157EFB').then( (infoIcon) => this.setState({ infoIcon }));
  }

  setOnHelpPress(func){
    this.setState({onHelpPress: func});
  }

  render() {

    if(this.state.helpIcon && this.state.infoIcon){
      return (
        <NavigatorIOS
          style = {styles.container}
          initialRoute = {{
            title: 'Start the Tour!',
            component: Start,
            rightButtonIcon: this.state.helpIcon,
            onRightButtonPress: () => this.state.onHelpPress(),
            leftButtonIcon: this.state.infoIcon,
            onLeftButtonPress: () => this.props.toAbout(),
            passProps: { setOnHelpPress: (func) => this.setOnHelpPress(func) }
          }}
        />
      );
    }
    return (
      <Image style={{ height: d_window.height, width: d_window.width, alignSelf: 'center' }} source={require('../../images/tour_start_flash.png')} />
    );

  }
}

const styles = StyleSheet.create({

  container:{
    flex: 1,
  },
});

module.exports = Tour;
