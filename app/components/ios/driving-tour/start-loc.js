// Component of selectionPage
// receive props Image, Title, stage, turn, address, unmount,
import React, { Component, } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native'

const d_window = Dimensions.get('window');

class Location extends Component{

  constructor(props){
    super(props);
    this.state = {

    }
  }

  render() {
    return(

      <TouchableOpacity onPress = {() => this.props.onPress(this.props)}>
        <View style = {styles.container}>

          {
            Array.isArray(this.props.pic)?
              <Image style = {styles.image} source = {this.props.pic[0]}/>:
              <Image style = {styles.image} source = {this.props.pic}/>
          }

          <View style = {styles.contents}>

            <Text style = {styles.text}> {this.props.title} <Text style={styles.time}>({this.props.time} mins)</Text></Text>
            <Text style = {styles.buttonText}> {this.props.address} </Text>

          </View>
        </View>
      </TouchableOpacity>

    );
  }
}

const styles = StyleSheet.create({
  container:{
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    width: d_window.width,
    height: 75 * (d_window.height/667),
    marginTop: 10 * (d_window.height/667),
    backgroundColor: 'gainsboro', //#e6e6e6
  },

  content:{
    flex: 2,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    height: 50 * (d_window.height/667),
  },

  text:{
    fontSize: 16.3 * (d_window.width/375),
    color: 'black',
    fontWeight: '300',
    textAlign: 'left',
    letterSpacing: -.5 * (d_window.width/375),
  },

  time:{
    fontSize: 12.25 * (d_window.width/375),
    color: 'black',
    fontWeight: '300',
    textAlign: 'left',
    letterSpacing: -.65 * (d_window.width/375),
  },

  buttonText:{
    fontSize: 14 * (d_window.width/375),
    color: 'grey',
    fontWeight: '100',
    textAlign: 'left',
    marginTop: 2 * (d_window.height/667),
    letterSpacing: -.5  * (d_window.width/375),
  },

  image:{
    margin: 25/2 * (d_window.width/375),
    height: 50 * (d_window.width/375),
    width: 50 * (d_window.width/375),
    backgroundColor: 'transparent',
  },

});

module.exports = Location;
//AppRegistry.registerComponent('Location', () => Location);
