//comes from tour page
//here there will be a scroll view of all locations
//each button passes props to an onClick() handler which nvigates to info page and passes props to it
// props include title, stage, turn, picture, address

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
  Alert,
} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons';

const d_window = Dimensions.get('window');

var Location = require('./start-loc');
var InfoPage = require('./info-page');
var Turns = require('../../turns');

class SelectionPage extends Component{

  constructor(props){
    super(props);
    this.state = {

    }
  }

  componentWillMount(){
    Icon.getImageSource('ios-arrow-back-outline', 35, '#157EFB').then( (backIcon) => this.setState({ backIcon }));
  }

  alert(props){
    Alert.alert(
      'Course Confirmation',
      '\nFrom this location to the end of the list, it will take about ' + props.time + ' minutes.\nYou may stop and pick up where you left off at any time.\nAll locations listed before this will not be toured. Is that ok?',
      [
        {text: 'Cancel'},
        {text: 'Yes this works', onPress: () => this.navToInfo(props), style: 'cancel'},
      ],
    );
  }

  navToInfo(props){
    this.props.navigator.push({
      title: 'Drive to Start Point',
      component: InfoPage,
      leftButtonIcon: this.state.backIcon,
      onLeftButtonPress: () => this.props.navigator.pop(),
      passProps: {
        stage: props.stage,
        title: props.title,
        pic: props.pic,
        address: props.address,
      },
    });
  }

  render() {
    return(
      <View style = {styles.container}>
        <ScrollView>

              {Turns.stages.map( (location, index) => {
                return (
                  <Location
                    pic = {location.squareAtPic} title = {location.title} address = {location.address}
                    stage = {index} time = {location.time} onPress = {(props) => this.alert(props)} key = {Math.floor((Math.random() * 1000000) + 1)} /> );
              })}

        </ScrollView>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    marginBottom: 10 * (d_window.height/667),
  },
});

module.exports = SelectionPage;
