// comes from selection page or tour page
// has a picture of the location, title and address saying to nav to this and click button to startPic
// button click hander onClick() navs to audio page and passes turn and stage props

import React, { Component, } from 'react'
import {
  AppRegistry,
  StyleSheet,
  NavigatorIOS,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  Alert,
  Linking,
} from 'react-native'

var AudioPage = require('./audio-page');
var Turns = require('./turns');

var atEnd = false;

class InfoPage extends Component{

  constructor(props){
    super(props);
    this.state = {
      url: null,
      //intervalID: setInterval(()=>this.check(), 1000),
    }
  }

  componentDidMount(){
    let linkStart = "http://maps.apple.com/?daddr=";
    let address = this.props.address.replace(/\s/g, "+");
    let linkEnd = ",NJ&dirflg=d&t=m";
    this.setState({url: linkStart + address + linkEnd});
  }

  render() {
    return(
      <View style = {styles.container}>

        <Text style = {styles.text}> {this.props.title} </Text>

        <View style = {{
          //Add padding to view not text or onPress position will be ghosting
          paddingHorizontal: 25 * (Dimensions.get('window').width/375),
          paddingTop: 25 * (Dimensions.get('window').width/375),
        }}>
          <Text style = {styles.subtext}>
            <Text> Please navigate to</Text>
            <Text style = {styles.text_bold} onPress={() => this.linkUrl(this.state.url)}> {this.props.address} </Text>
            <Text>then click the button below to start the tour.</Text>
          </Text>
        </View>

        <Image style = {styles.image} source = {this.props.pic}/>

        <TouchableOpacity style = {styles.button} onPress = {() => this.onPress()}>
          <Text style={styles.buttonText}> Click To Start Tour! </Text>
        </TouchableOpacity>

      </View>
    );
  }

  linkUrl(url){
    Linking.canOpenURL(url).then(supported => {
      if (!supported) console.log('Can\'t handle url: ' + url);
      else return Linking.openURL(url);
    }).catch(err => console.error('An error occurred', err));
  }

  check(){
    if(this.props.unmount().b){
      this.props.navigator.popToTop();
    }
  }

  componentWillUnmount(){
    clearInterval(this.state.intervalID);
  }

  onPress(){
    Alert.alert('SAFTEY', '\n1) Please make sure you have a passenger. You will need a passenger to follow and read the directions as the come up on the phone screen.\n\n 2) If you miss a turn, safely navigate through adjacent road and proceed back to the instructed route.\n\n 3) Some locations have limited/ample parking. Please be cautious of your surrounding and pay attention to the specified parking directions.\n\n 4) some markers are on private property. Be courteous to others and mindful of trespassing.\n\n 5) Drive safely, the developer, the Chatham Township Historical Society, and associates of the app hold no liability for any incidents while using this app.',[
      { text: 'Ok, I Understand', onPress: () => this.navToAudio()},
    ]);
  }

  navToAudio(){
    this.props.navigator.push({
      title: 'Audio Tour',
      component: AudioPage,

      leftButtonTitle: 'End Tour',
      onLeftButtonPress: () => {
        if(!atEnd){
          Alert.alert(
            'End Tour Warning',
            'Are you sure you want to end the tour?',
            [
              {text: 'Cancel'},
              {text: 'End Tour', onPress: () => this.props.navigator.popToTop(), style: 'destructive'},
            ],
          );
        }else this.props.navigator.popToTop();
      },

      rightButtonTitle: 'Return Home',
      onRightButtonPress: () => this.linkUrl("http://maps.apple.com/?daddr=24+Southern+Blvd,+Chatham,+NJ&dirflg=d&t=m"),
        // Alert.alert('Direction Back to Start',
        // '\nThese next directions take approx 9 minutes to travel and 4.5 miles\n\n Turn around on Treadwell Ave and proceed back to Woodland Ave\n\n Turn left onto Woodland Ave and proceed approx 1.4 miles. Then turn right onto Green Village Road\n\n Continue along onto Southern Blvd to Fairmount Ave and turn left onto Fairmount. The school is on the right',
        // [{text: 'Close'}]),

      passProps: {
        stage: this.props.stage,
        changeAtEnd: (val) => atEnd = val,
      },
    });
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    //backgroundColor: '#424ac1',
  },

  text:{
    fontSize: 30 * (Dimensions.get('window').width/375),
    color: 'black',
    fontWeight: '300',
    textAlign: 'center',
    paddingHorizontal: 25 * (Dimensions.get('window').width/375),
    paddingTop: 20 * (Dimensions.get('window').width/375),
  },

  text_bold:{
    fontSize: 20 * (Dimensions.get('window').width/375),
    color: 'black',
    fontWeight: '300',
    textAlign: 'center',
  },

  subtext:{
    fontSize: 20 * (Dimensions.get('window').width/375),
    color: 'black',
    fontWeight: '200',
    textAlign: 'center',
  },

  button:{
    width: Dimensions.get('window').width/1.5,
    height: 36 * (Dimensions.get('window').width/375),
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText:{
    fontSize: 15 * (Dimensions.get('window').width/375),
    color: 'white',
    fontWeight: '100',
  },

  image:{
    margin: 25 * (Dimensions.get('window').width/375),
    height: Dimensions.get('window').width / 1.5,
    width: Dimensions.get('window').width / 1.5,
    backgroundColor: 'red',
  },

});

module.exports = InfoPage;
