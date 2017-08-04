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

var Location = require('./start-loc');
var InfoPage = require('./info-page');
var Turns = require('./turns');
// var backIcon = require('./back_chevron.png');

var active = true;

class SelectionPage extends Component{

  constructor(props){
    super(props);
    this.state = {
      intervalID: setInterval(()=>this.check(), 1000),
    }
  }

  check(){
    if(this.props.unmount().b && active){
      this.props.navigator.popToTop();
    }
  }

  componentWillUnmount(){
    clearInterval(this.state.intervalID);
  }

  alert(props){
    Alert.alert(
      'Course Confirmation',
      '\nFrom this location to the end, it will take about ' + props.time + ' minutes.\nYou may stop and pick up where you left off at any time.\nAll locations listed before this will not be toured. Is this ok?',
      [
        {text: 'Back to selections'},
        {text: 'Yes this work', onPress: () => this.navToInfo(props), style: 'cancel'},
      ],
    );
  }

  navToInfo(props){
    active = false;
    this.props.navigator.push({
      title: 'Drive to Start Point',
      component: InfoPage,
      leftButtonTitle: 'Selections',
      //leftButtonIcon: back_chevron,
      onLeftButtonPress: () => {
        this.props.navigator.pop();
        active=true;
      },

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
              stage = {0} unmount = {this.props.unmount} time = {10} onPress = {(props) => this.alert(props)}/>

            <Location
              pic = {Turns.stages[1].squareAtPic} title = {'The Johnson House Marker'} address = {'805 Fairmount Ave, Chatham Township'}
              stage = {1} unmount = {this.props.unmount} time = {20} onPress = {(props) => this.alert(props)}/>

            <Location
              pic = {Turns.stages[2].squareAtPic} title = {'The Isaac Clark Farmstead Marker'} address = {'788 River Road, Chatham Township'}
              stage = {2} unmount = {this.props.unmount} time = {30} onPress = {(props) => this.alert(props)}/>

            <Location
              pic = {Turns.stages[3].squareAtPic} title = {'The Bey’s Boxing Camp Marker'} address = {'516 River Road, Chatham Township'}
              stage = {3} unmount = {this.props.unmount} time = {40} onPress = {(props) => this.alert(props)}/>

            <Location
              pic = {Turns.stages[4].squareAtPic} title = {'The Price-Baldwin House Marker'} address = {'48 Southern Blvd, Chatham Township'}
              stage = {4} unmount = {this.props.unmount} time = {50} onPress = {(props) => this.alert(props)}/>

            <Location
              pic = {Turns.stages[5].squareAtPic} title = {'The Chatham Colony Association'} address = {'25 Spring Street, Chatham Township'}
              stage = {5} unmount = {this.props.unmount} time = {60} onPress = {(props) => this.alert(props)}/>

            <Location
              pic = {Turns.stages[6].squareAtPic} title = {'The Lewis Noe Farmstead Marker'} address = {'184 Southern Blvd, Chatham Township'}
              stage = {6} unmount = {this.props.unmount} time = {70} onPress = {(props) => this.alert(props)}/>

            <Location
              pic = {Turns.stages[7].squareAtPic} title = {'The Noe Pond Marker'} address = {'395 Southern Blvd, Chatham Township'}
              stage = {7} unmount = {this.props.unmount} time = {80} onPress = {(props) => this.alert(props)}/>

            <Location
              pic = {Turns.stages[8].squareAtPic} title = {'The Greenhouse Industry Marker'} address = {'405 Southern Blvd, Chatham Township'}
              stage = {8} unmount = {this.props.unmount} time = {90} onPress = {(props) => this.alert(props)}/>

            <Location
              pic = {Turns.stages[9].squareAtPic} title = {'The Elias Boudinot House Marker'} address = {'461 Green Village Road, Green Village'}
              stage = {9} unmount = {this.props.unmount} time = {10} onPress = {(props) => this.alert(props)}/>

            <Location
              pic = {Turns.stages[10].squareAtPic} title = {'The Cockrem Farm Marker'} address = {'486 Green Village Road, Green Village'}
              stage = {10} unmount = {this.props.unmount} time = {11} onPress = {(props) => this.alert(props)}/>

            <Location
              pic = {Turns.stages[11].squareAtPic} title = {'The Green Village Marker'} address = {'536 Green Village Road, Green Village'}
              stage = {11} unmount = {this.props.unmount} time = {12} onPress = {(props) => this.alert(props)}/>

            <Location
              pic = {Turns.stages[12].squareAtPic} title = {'The Gibbons Horse Barn Marker'} address = {'340 Loantaka Way, Madison'}
              stage = {12} unmount = {this.props.unmount} time = {13} onPress = {(props) => this.alert(props)}/>

            <Location
              pic = {Turns.stages[13].squareAtPic} title = {'The Loantaka School Marker'} address = {'245 Loantaka Way, Madison'}
              stage = {13} unmount = {this.props.unmount} time = {14} onPress = {(props) => this.alert(props)}/>

            <Location
              pic = {Turns.stages[14].squareAtPic} title = {'The Boisaubin House Marker'} address = {'65 Treadwell Ave, Madison'}
              stage = {14} unmount = {this.props.unmount} time = {5} onPress = {(props) => this.alert(props)}/>

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
    marginBottom: 10, //TODO CHECK
    //backgroundColor: '#424ac1',
  },
});

module.exports = SelectionPage;
