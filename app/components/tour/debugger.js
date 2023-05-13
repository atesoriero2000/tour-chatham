import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native'

import { sharedStyles, MyTheme, Scales } from '../helpers/shared_styles';

//TODO: remove, what is this?
var scale = 450;

class Debugger extends Component {

    constructor(props){
        super(props);
    }
    
    render(){
        return(
            <View style = {styles.container}>
                <Text style = {styles.title}>DEBUGGER</Text>
                
                <View style = {styles.buttonBar}>
                    <TouchableOpacity style = {styles.button} onPress={() => this.props.stopAudio()}>
                        <Text style={styles.buttonText}>{'X'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style = {styles.button} onPress={() => this.props.lastTurn()}>
                        <Text style={styles.buttonText}>{'<'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style = {styles.button} onPress={() => this.props.nextTurn()}>
                        <Text style={styles.buttonText}>{'>'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style = {[styles.button, {backgroundColor: this.props.state.isNearOverride?'tomato':'gray'}]} onPress={() => this.props.toggleIsNearOverride()}>
                        <Text style={styles.buttonText}>{'@'}</Text>
                    </TouchableOpacity>
                </View>

                <Text style = {styles.subtitle}>CURRENT TARGET</Text>
                <Text>Stage: {this.props.stage}, Turn: {this.props.turn}</Text>
                <Text>Longitude: {this.props.state.currentTargetPos.longitude}</Text>
                <Text>Latitude: {this.props.state.currentTargetPos.latitude}</Text>
                <Text>distToCurrent: {JSON.stringify(Math.round(this.props.state.distToCurrent))} FT</Text>

                <Text style = {styles.subtitle}>NEXT TARGET</Text>
                <Text>Longitude: {this.props.state.nextTargetPos.longitude}</Text>
                <Text>Latitude: {this.props.state.nextTargetPos.latitude}</Text>
                <Text>distToNext: {JSON.stringify(Math.round(this.props.state.distToNext))} FT</Text>
                <Text>nextRadius: {JSON.stringify(Math.round(this.props.state.nextRadius))} FT</Text>
                <Text>isNear: {JSON.stringify(this.props.state.isNear)} </Text>

                <Text style = {styles.subtitle}>LAST LOCATION</Text>
                <Text>Longitude: {this.props.state.lastPos.longitude}</Text>
                <Text>Latitude: {this.props.state.lastPos.latitude}</Text>
                <Text>Accuracy: {JSON.stringify(Math.round(this.props.state.lastPos.accuracy))} FT</Text>
                <Text>{Scales.width}, {Scales.height}</Text>
            </View>
       )
    }
}



  //////////////////////////  
 //// DEBUGGING STYLES ////
//////////////////////////
const styles = StyleSheet.create({

    container: {
        alignItems: 'center',
        justifyContent: 'center',
        width: Scales.width,
        marginTop: 100,
        paddingBottom: 25
    },

    title:{
        fontSize: 50 * (Scales.width/scale),
        color: 'black',
        fontWeight: '200',
        textAlign: 'center',
      },

    buttonBar: {
        flex: 10,
        width: Scales.width,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: "row",
        marginTop: 10,
        // backgroundColor: "lightgrey",
    },

    button: {
        justifyContent: 'center',   //Vertical
        alignItems: 'center',       //Horizontal
        backgroundColor: 'gray',
        marginHorizontal: 5,
        height: 30,
        width: 30,
        borderRadius: 15,
    },

    buttonText: {
        color: 'whitesmoke'
    },
  
    subtitle:{
      fontSize: 20 * (Scales.width/scale),
      color: 'black',
      fontWeight: '500',
      textAlign: 'center',
      paddingTop: 20 * (Scales.width/scale),
    },
  });


//   export default Debugger; // for variable
module.exports = Debugger; // for component
