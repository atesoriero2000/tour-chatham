// comes from selection page or tour page
// has a picture of the location, title and address saying to nav to this and click button to startPic
// button click hander onClick() navs to audio page and passes turn and stage props

import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  Alert,
  Linking,
} from 'react-native'

const d_window = Dimensions.get('window');

var Swiper = require('../helpers/Swiper');

class InfoPage extends Component{

  constructor(props){
    super(props);
    this.state = {
      stage: props.route.params.stage,
      title: props.route.params.title,
      pic: props.route.params.pic,
      address: props.route.params.address,
      url: null,
    }
  }

  navToAudio(){
    this.props.navigation.navigate('Tour', {
      screen: 'Audio Tour',
      params: {
        stage: this.state.stage,
      }
    })
  }
  
  onPress(){
    Alert.alert('SAFETY', '\n1) You must have a passenger to follow and read the directions as the come up on the phone screen.\n\n 2) If you miss a turn, safely navigate through adjacent roads, and proceed back to the instructed route.\n\n 3) Some locations have limited parking. Please be cautious of your surroundings, and pay attention to the specified parking directions.\n\n 4) Some markers are on private property. Be courteous to others, and be mindful of trespassing.\n\n 5) Drive safely. The developer, the Chatham Township Historical Society, and contributors to the app hold no liability for any incidents that may occur while using this app.'
    ,[
      { text: 'Ok, I Understand', onPress: () => this.navToAudio()},
    ]);
  }

  linkUrl(url){
    Linking.canOpenURL(url).then(supported => {
      if (!supported) console.log('Can\'t handle url: ' + url);
      else return Linking.openURL(url);
    }).catch(err => console.log('An error occurred', err));
  }

  componentDidMount(){
    let linkStart = "http://maps.apple.com/?daddr=";
    let address = this.state.address.replace(/\s/g, "+");
    let linkEnd = ",NJ&dirflg=d&t=m";
    this.setState({url: linkStart + address + linkEnd});
  }

  render() {
    return(
      <View style = {styles.container}>

        <Text allowFontScaling = {false} style = {styles.text}>{this.state.title}</Text>

        <View style = {{
          // NOTE: Add padding to view not text or onPress position will be ghosting
          paddingHorizontal: 20 * (d_window.width/375),
          paddingTop: 25 * Math.pow((d_window.height/667), 2),
        }}>
          <Text allowFontScaling = {false} style = {styles.subtext}>
            <Text allowFontScaling = {false} > Please navigate to</Text>
            <Text allowFontScaling = {false} style = {styles.text_bold} onPress={() => this.linkUrl(this.state.url)}> {this.state.address} </Text>
            <Text allowFontScaling = {false} >then click the button below to start the tour.</Text>
          </Text>
        </View>


        {Array.isArray(this.state.pic)?

          <Swiper
            showsButtons = {false}
            loop = {true}
            height={d_window.width / 1.5}
            width={d_window.width / 1.5}
            autoplay={true}
            autoplayTimeout={2.5}
            >
              {this.state.pic.map( onePic => <Image style={styles.image} source={onePic} key={Math.random()}/> )}

          </Swiper>:
          <Image style = {styles.image} source = {this.state.pic}/>
        }


        <TouchableOpacity style = {styles.button} onPress = {() => this.onPress()}>
          <Text allowFontScaling = {false} style={styles.buttonText}> Click To Start Tour! </Text>
        </TouchableOpacity>

      </View>
    );
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
    fontSize: 30 * (d_window.width/375),
    color: 'black',
    fontWeight: '300',
    textAlign: 'center',
    paddingHorizontal: 25 * (d_window.width/375),
    paddingTop: 20 * Math.pow((d_window.height/667), 2),
  },

  text_bold:{
    fontSize: 20 * (d_window.width/375),
    color: '#6565FF',
    fontWeight: '300',
    textAlign: 'center',
  },

  subtext:{
    fontSize: 20 * (d_window.width/375),
    color: 'black',
    fontWeight: '200',
    textAlign: 'center',
    marginBottom: 25 * (d_window.width/375),
  },

  button:{
    marginTop: 25 * (d_window.width/375),
    width: d_window.width/1.5,
    height: 36 * Math.pow((d_window.height/667), 2),
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText:{
    fontSize: 15 * (d_window.width/375),
    color: 'white',
    fontWeight: '100',
    textAlign: 'center',
  },

  image:{
    height: d_window.width / 1.5,
    width: d_window.width / 1.5,
    backgroundColor: 'transparent',
    alignSelf: 'center',
  },

});

module.exports = InfoPage;
