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
      '\nFrom this location to the end, it will take about ' + props.time + ' minutes.\nYou may stop and pick up where you left off at any time.\nAll locations listed before this will not be toured. Is this ok?',
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

            <Location
              pic = {Turns.stages[0].squareAtPic} title = {'The Mount Vernon Schoolhouse'} address = {'24 Southern Blvd, Chatham Township'}
              stage = {0} time = {90} onPress = {(props) => this.alert(props)}/>

            <Location
              pic = {Turns.stages[1].squareAtPic} title = {'The Johnson House Marker'} address = {'805 Fairmount Ave, Chatham Township'}
              stage = {1} time = {80} onPress = {(props) => this.alert(props)}/>

            <Location
              pic = {Turns.stages[2].squareAtPic} title = {'The Isaac Clark Farmstead Marker'} address = {'788 River Road, Chatham Township'}
              stage = {2} time = {75} onPress = {(props) => this.alert(props)}/>

            <Location
              pic = {Turns.stages[3].squareAtPic} title = {'The Bey’s Boxing Camp Marker'} address = {'516 River Road, Chatham Township'}
              stage = {3} time = {70} onPress = {(props) => this.alert(props)}/>

            <Location
              pic = {Turns.stages[4].squareAtPic} title = {'The Price-Baldwin House Marker'} address = {'48 Southern Blvd, Chatham Township'}
              stage = {4} time = {60} onPress = {(props) => this.alert(props)}/>

            <Location
              pic = {Turns.stages[5].squareAtPic} title = {'The Chatham Colony Association'} address = {'25 Spring Street, Chatham Township'}
              stage = {5} time = {55} onPress = {(props) => this.alert(props)}/>

            <Location
              pic = {Turns.stages[6].squareAtPic} title = {'The Lewis Noe Farmstead Marker'} address = {'184 Southern Blvd, Chatham Township'}
              stage = {6} time = {50} onPress = {(props) => this.alert(props)}/>

            <Location
              pic = {Turns.stages[7].squareAtPic} title = {'The Noe Pond Marker'} address = {'395 Southern Blvd, Chatham Township'}
              stage = {7} time = {40} onPress = {(props) => this.alert(props)}/>

            <Location
              pic = {Turns.stages[8].squareAtPic} title = {'The Greenhouse Industry Marker'} address = {'405 Southern Blvd, Chatham Township'}
              stage = {8} time = {35} onPress = {(props) => this.alert(props)}/>

            <Location
              pic = {Turns.stages[9].squareAtPic} title = {'The Elias Boudinot House Marker'} address = {'461 Green Village Road, Green Village'}
              stage = {9} time = {30} onPress = {(props) => this.alert(props)}/>

            <Location
              pic = {Turns.stages[10].squareAtPic} title = {'The Cockrem Farm Marker'} address = {'486 Green Village Road, Green Village'}
              stage = {10} time = {25} onPress = {(props) => this.alert(props)}/>

            <Location
              pic = {Turns.stages[11].squareAtPic} title = {'The Green Village Marker'} address = {'536 Green Village Road, Green Village'}
              stage = {11} time = {20} onPress = {(props) => this.alert(props)}/>

            <Location
              pic = {Turns.stages[12].squareAtPic} title = {'The Gibbons Horse Barn Marker'} address = {'336 Loantaka Way, Madison'}
              stage = {12} time = {15} onPress = {(props) => this.alert(props)}/>

            <Location
              pic = {Turns.stages[13].squareAtPic} title = {'The Loantaka School Marker'} address = {'245 Loantaka Way, Madison'}
              stage = {13} time = {10} onPress = {(props) => this.alert(props)}/>

            <Location
              pic = {Turns.stages[14].squareAtPic} title = {'The Boisaubin House Marker'} address = {'65 Treadwell Ave, Madison'}
              stage = {14} time = {5} onPress = {(props) => this.alert(props)}/>

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
