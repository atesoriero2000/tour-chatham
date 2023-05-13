// comes from selection page
// TODO: add geolocation or merge with audio page
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
      <View style = {styles.container}>
        <View style = {sharedStyles.headerBorder}/>
        <Text style = {styles.text}>{this.state.loc.title}</Text>

        <View style = {{
          // TODO: Note: Add padding to view not text or onPress position will be ghosting
          paddingHorizontal: 20 * (Scales.width/375),
          paddingTop: 25 * Math.pow((Scales.height/667), 2),
        }}>
          <Text style = {styles.subtext}>
            <Text > Please navigate to</Text>
            <Text style = {styles.text_bold} onPress={() => Linking.openURL(this.state.url)}> {this.state.loc.address} </Text>
            <Text >then click the button below to start the tour.</Text>
          </Text>
        </View>


        {this.state.loc.squareAtPic.length>1 ?
          <Swiper height={Scales.width / 1.5} width={Scales.width / 1.5} activeColor={MyTheme.colors.swiper}>
              {this.state.loc.squareAtPic.map( onePic => <Image style={styles.image} source={onePic} key={Math.random()}/> )}
          </Swiper> : <Image style = {styles.image} source = {this.state.loc.squareAtPic[0]}/>
        }


        <TouchableHighlight style = {styles.button} 
          underlayColor = {sharedStyles.button.underlayColor} 
          onPress = {() => this.onPress()}>
          <Text style={styles.buttonText}> Click To Start Tour! </Text>
        </TouchableHighlight>

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
    fontSize: 30 * (Scales.width/375),
    color: 'black',
    fontWeight: '300',
    textAlign: 'center',
    paddingHorizontal: 25 * (Scales.width/375),
    paddingTop: 20 * Math.pow((Scales.height/667), 2),
  },

  text_bold:{
    fontSize: 20 * (Scales.width/375),
    color: '#6565FF',
    fontWeight: '300',
    textAlign: 'center',
  },

  subtext:{
    fontSize: 20 * (Scales.width/375),
    color: 'black',
    fontWeight: '200',
    textAlign: 'center',
    marginBottom: 25 * (Scales.width/375),
  },

  button:{
    marginTop: 25 * (Scales.width/375),
    width: Scales.width/1.5,
    height: 36 * Math.pow((Scales.height/667), 2),
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText:{
    fontSize: 15 * (Scales.width/375),
    color: 'white',
    fontWeight: '100',
    textAlign: 'center',
  },

  image:{
    height: Scales.width / 1.5,
    width: Scales.width / 1.5,
    backgroundColor: 'transparent',
    alignSelf: 'center',
  },

});

module.exports = InfoPage;
