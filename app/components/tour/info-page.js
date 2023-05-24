// LATER: add geolocation or merge with audio page
//       check location before making continue button clickable 
import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  Linking,
  TouchableHighlight,
} from 'react-native'
import { sharedStyles, MyTheme, Scales } from '../helpers/shared_styles';

var Swiper = require('../helpers/Swiper');

class InfoPage extends Component{

  constructor(props){
    super(props);
    this.state = {
      loc: props.route.params.loc,
      url: null,
    }
  }

  navToAudio(){
    this.props.navigation.navigate('Tour', {
      screen: 'Audio Tour',
      params: {
        stage: this.props.route.params.stage,
      }
    })
  }
  
  onPress(){
    Alert.alert('SAFETY', '\n1) You must have a passenger to follow and read the directions as the come up on the phone screen.\n\n 2) If you miss a turn, safely navigate through adjacent roads, and proceed back to the instructed route.\n\n 3) Some locations have limited parking. Please be cautious of your surroundings, and pay attention to the specified parking directions.\n\n 4) Some markers are on private property. Be courteous to others, and be mindful of trespassing.\n\n 5) Drive safely. The developer, the Chatham Township Historical Society, and contributors to the app hold no liability for any incidents that may occur while using this app.'
    ,[{ text: 'Ok, I Understand', onPress: () => this.navToAudio()},
    ]);
  }

  componentDidMount(){
    let linkStart = "http://maps.apple.com/?daddr=";
    let address = this.state.loc.address.replace(/\s/g, "+");
    let linkEnd = ",NJ&dirflg=d&t=m";
    this.setState({url: linkStart + address + linkEnd});
  }

  render() {
    return(
      <View style = {sharedStyles.container}>
        {Scales.hasNotch && <View style = {sharedStyles.headerBorder}/>}
        <Text style = {styles.titleText}>{this.state.loc.title}</Text>

        <Text style = {styles.subtext}>
          <Text > Please navigate to</Text>
          <Text style = {styles.textBold} onPress={() => Linking.openURL(this.state.url)}> {this.state.loc.address} </Text>
          <Text >then click the button below to start the tour.</Text>
        </Text>

        {this.state.loc.squareAtPic.length>1 ?
          <Swiper width={styles.image.width} height={styles.image.width} >
            {this.state.loc.squareAtPic.map( onePic => <Image style={styles.image} source={onePic} key={Math.random()}/> )}
          </Swiper> : <Image style = {styles.image} source = {this.state.loc.squareAtPic[0]}/>
        }

        <TouchableHighlight style = {sharedStyles.button}
          underlayColor = {sharedStyles.button.underlayColor} 
          onPress = {() => this.onPress()}>
          <Text style={sharedStyles.buttonText}> Click to Start the Tour! </Text> 
        </TouchableHighlight>

      </View>
    );
  }
}

const styles = StyleSheet.create({

  titleText:{
    textAlign: 'center',
    color: 'black',
    fontWeight: MyTheme.titleFont.weight,
    fontSize: MyTheme.titleFont.size,
    paddingHorizontal: MyTheme.titleFont.paddingHorizontal,
  },

  subtext:{
    fontSize: 20 * Scales.font,
    color: 'black',
    fontWeight: MyTheme.defaultText.weight,
    textAlign: 'center',
    paddingHorizontal: '8.5%', //Done //>9% @ 20 makes a fourth line
  },

  textBold:{
    color: sharedStyles.clickable.color,
    fontWeight: Scales.fontWeight('300'),
  },

  image:{
    width: .33 * Scales.height,
    height: undefined,
    aspectRatio: 1,
  },

});

module.exports = InfoPage;
