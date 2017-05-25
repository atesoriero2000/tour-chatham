//comes from tour page
//here there will be a scroll view of all locations
//each button passes props to an onClick() handler which nvigates to info page and passes props to it
// props include title, stage, turn, picture, adress

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
      title: 'Drive to Starting Location',
      component: InfoPage,
      leftButtonTitle: 'Selection Page',
      //leftButtonIcon: back_chevron.png,
      onLeftButtonPress: () => {
        this.props.navigator.pop();
        active=true;
      },

      passProps: {
        stage: props.stage,
        title: props.title,
        pic: props.pic,
        adress: props.adress,
      },
    });
  }

  render() {
    return(
      <View style = {styles.container}>
        <ScrollView>

            <Location
              pic = {null} title = {'The Mount Vernon Schoolhouse'} adress = {'24 Southern Blvd, Chatham Township'}
              stage = {0} unmount = {this.props.unmount} onPress = {(props) => this.NavToInfo(props)}/>

            <Location
              pic = {null} title = {'The Johnson House Marker'} adress = {'805 Fairmount Avenue, Chatham Township'}
              stage = {1} unmount = {this.props.unmount} onPress = {(props) => this.NavToInfo(props)}/>

            <Location
              pic = {null} title = {'The Isaac Clark Farmstead Marker'} adress = {'788 River Road, Chatham Township'}
              stage = {2} unmount = {this.props.unmount} onPress = {(props) => this.NavToInfo(props)}/>

            <Location
              pic = {null} title = {'The Bey’s Boxing Camp Marker'} adress = {'Adress'}
              stage = {3} unmount = {this.props.unmount} onPress = {(props) => this.NavToInfo(props)}/>

            <Location
              pic = {null} title = {'The Price-Baldwin House Marker'} adress = {'Adress'}
              stage = {4} unmount = {this.props.unmount} onPress = {(props) => this.NavToInfo(props)}/>

            <Location
              pic = {null} title = {'The Chatham Colony Association'} adress = {'Adress'}
              stage = {5} unmount = {this.props.unmount} onPress = {(props) => this.NavToInfo(props)}/>

            <Location
              pic = {null} title = {'The Lewis Noe Farmstead Marker'} adress = {'Adress'}
              stage = {6} unmount = {this.props.unmount} onPress = {(props) => this.NavToInfo(props)}/>

            <Location
              pic = {null} title = {'The Noe Pond Marker'} adress = {'Adress'}
              stage = {7} unmount = {this.props.unmount} onPress = {(props) => this.NavToInfo(props)}/>

            <Location
              pic = {null} title = {'The Greenhouse Industry Marker'} adress = {'Adress'}
              stage = {8} unmount = {this.props.unmount} onPress = {(props) => this.NavToInfo(props)}/>

            <Location
              pic = {null} title = {'The Elias Boudinot House Marker'} adress = {'Adress'}
              stage = {9} unmount = {this.props.unmount} onPress = {(props) => this.NavToInfo(props)}/>

            <Location
              pic = {null} title = {'The Cockrem Farm Marker'} adress = {'Adress'}
              stage = {10} unmount = {this.props.unmount} onPress = {(props) => this.NavToInfo(props)}/>

            <Location
              pic = {null} title = {'The Green Village Marker'} adress = {'Adress'}
              stage = {11} unmount = {this.props.unmount} onPress = {(props) => this.NavToInfo(props)}/>

            <Location
              pic = {null} title = {'The Gibbons Horse Barn Marker'} adress = {'Adress'}
              stage = {12} unmount = {this.props.unmount} onPress = {(props) => this.NavToInfo(props)}/>

            <Location
              pic = {null} title = {'The Loantaka School Marker'} adress = {'Adress'}
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

  text:{
    fontSize: 30,
    color: 'black',
    fontWeight: '300',
    textAlign: 'center',
    paddingTop: 25,
  },

  button:{
    width: Dimensions.get('window').width/1.5,
    height: 36,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    marginTop: 30,
  },

  buttonText:{
    fontSize: 15,
    color: 'white',
    fontWeight: '100',
  },

  slider: {
    width: 300,
    height: 10,
    margin: 10,
  },

});

module.exports = SelectionPage;
