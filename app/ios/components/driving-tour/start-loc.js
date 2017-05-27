// Component of selectionPage
// receive props Image, Title, stage, turn, Adress, unmount,
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

          <Image style = {styles.image} source = {this.props.pic}/>

          <View style = {styles.contents}>

            <Text style = {styles.text}> {this.props.title} </Text>
            <Text style = {styles.buttonText}> {this.props.adress} </Text>

          </View>
        </View>
      </TouchableOpacity>

    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width/5,
    marginTop: 10 * (Dimensions.get('window').width/375),
    backgroundColor: 'lightgray',
  },

  content:{
    flex: 2,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    height: 50 * (Dimensions.get('window').width/375),
  },

  text:{
    fontSize: 17 * (Dimensions.get('window').width/375),
    color: 'black',
    fontWeight: '300',
    textAlign: 'left',
  },

  buttonText:{
    fontSize: 15 * (Dimensions.get('window').width/375),
    color: 'grey',
    fontWeight: '100',
    textAlign: 'left',
    paddingTop: 2 * (Dimensions.get('window').width/375),
  },

  image:{
    margin: 25/2 * (Dimensions.get('window').width/375),
    height: 50 * (Dimensions.get('window').width/375),
    width: 50 * (Dimensions.get('window').width/375),
    backgroundColor: 'red',
  },

});

module.exports = Location;
//AppRegistry.registerComponent('Location', () => Location);
