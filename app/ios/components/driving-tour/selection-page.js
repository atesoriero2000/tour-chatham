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
} from 'react-native'

var Location = require('./start-loc');
var InfoPage = require('./info-page');
//var backIcon = require('./back_chevron.png');

var pic1 = require('../../../images/Flower.jpg');
var pic2 = require('../../../images/Flower.jpg');
var pic3 = require('../../../images/Flower.jpg');
var pic4 = require('../../../images/Flower.jpg');
var pic5 = require('../../../images/Flower.jpg');
var pic6 = require('../../../images/Flower.jpg');
var pic7 = require('../../../images/Flower.jpg');
var pic8 = require('../../../images/Flower.jpg');
var pic9 = require('../../../images/Flower.jpg');
var pic10 = require('../../../images/Flower.jpg');
var pic11 = require('../../../images/Flower.jpg');
var pic12 = require('../../../images/Flower.jpg');
var pic13 = require('../../../images/Flower.jpg');
var pic14 = require('../../../images/Flower.jpg');

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

  NavToInfo(props){
    active = false;
    this.props.navigator.push({
      title: 'Drive to Start Point',
      component: InfoPage,
      leftButtonTitle: 'Selections',
      //leftButtonIcon: back_chevron.png,
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
              pic = {pic1} title = {'The Mount Vernon Schoolhouse'} address = {'24 Southern Blvd, Chatham Township'}
              stage = {0} unmount = {this.props.unmount} onPress = {(props) => this.NavToInfo(props)}/>

            <Location
              pic = {pic2} title = {'The Johnson House Marker'} address = {'805 Fairmount Ave, Chatham Township'}
              stage = {1} unmount = {this.props.unmount} onPress = {(props) => this.NavToInfo(props)}/>

            <Location
              pic = {pic3} title = {'The Isaac Clark Farmstead Marker'} address = {'788 River Road, Chatham Township'}
              stage = {2} unmount = {this.props.unmount} onPress = {(props) => this.NavToInfo(props)}/>

            <Location
              pic = {pic4} title = {'The Bey’s Boxing Camp Marker'} address = {'516 River Road, Chatham Township'}
              stage = {3} unmount = {this.props.unmount} onPress = {(props) => this.NavToInfo(props)}/>

            <Location
              pic = {pic5} title = {'The Price-Baldwin House Marker'} address = {'48 Southern Blvd, Chatham Township'}
              stage = {4} unmount = {this.props.unmount} onPress = {(props) => this.NavToInfo(props)}/>

            <Location
              pic = {pic6} title = {'The Chatham Colony Association'} address = {'Spring Street, Chatham Township'}
              stage = {5} unmount = {this.props.unmount} onPress = {(props) => this.NavToInfo(props)}/>

            <Location
              pic = {pic7} title = {'The Lewis Noe Farmstead Marker'} address = {'184 Southern Blvd, Chatham Township'}
              stage = {6} unmount = {this.props.unmount} onPress = {(props) => this.NavToInfo(props)}/>

            <Location
              pic = {pic8} title = {'The Noe Pond Marker'} address = {'395 Southern Blvd, Chatham Township'}
              stage = {7} unmount = {this.props.unmount} onPress = {(props) => this.NavToInfo(props)}/>

            <Location
              pic = {pic9} title = {'The Greenhouse Industry Marker'} address = {'405 Southern Blvd, Chatham Township'}
              stage = {8} unmount = {this.props.unmount} onPress = {(props) => this.NavToInfo(props)}/>

            <Location
              pic = {pic10} title = {'The Elias Boudinot House Marker'} address = {'461 Green Village Road, Green Village'}
              stage = {9} unmount = {this.props.unmount} onPress = {(props) => this.NavToInfo(props)}/>

            <Location
              pic = {pic11} title = {'The Cockrem Farm Marker'} address = {'486 Green Village Road, Green Village'}
              stage = {10} unmount = {this.props.unmount} onPress = {(props) => this.NavToInfo(props)}/>

            <Location
              pic = {pic12} title = {'The Green Village Marker'} address = {'536 Green Village Road, Green Village'}
              stage = {11} unmount = {this.props.unmount} onPress = {(props) => this.NavToInfo(props)}/>

            <Location
              pic = {pic13} title = {'The Gibbons Horse Barn Marker'} address = {'340 Loantaka Way, Madison'}
              stage = {12} unmount = {this.props.unmount} onPress = {(props) => this.NavToInfo(props)}/>

            <Location
              pic = {pic14} title = {'The Loantaka School Marker'} address = {'245 Loantaka Way, Madison'}
              stage = {13} unmount = {this.props.unmount} onPress = {(props) => this.NavToInfo(props)}/>

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
    marginBottom: 10,
    //backgroundColor: '#424ac1',
  },
});

module.exports = SelectionPage;
