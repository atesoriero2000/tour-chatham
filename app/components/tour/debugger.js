import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native'

const d_window = Dimensions.get('window');

class Debugger extends Component {

    constructor(props){
    }
    
    return(){
        <View>
            {showButtons && 
            <View>
                <TouchableOpacity style = {[debuggerStyles.button, {left: 15}]} onPress={() => this.DEBUG_stopAudio()}>
                    <Text style={{color: 'whitesmoke'}}>{'X'}</Text>
                </TouchableOpacity>
                <TouchableOpacity style = {[debuggerStyles.button, {left: 45}]} onPress={() => this.DEBUG_lastTurn()}>
                    <Text style={{color: 'whitesmoke'}}>{'<'}</Text>
                </TouchableOpacity>
                <TouchableOpacity style = {[debuggerStyles.button, {left: 75}]} onPress={() => this.DEBUG_nextTurn()}>
                    <Text style={{color: 'whitesmoke'}}>{'>'}</Text>
                </TouchableOpacity>
                <TouchableOpacity style = {[debuggerStyles.button, {left: 105, backgroundColor: this.state.isNearOverride?'tomato':'gray'}]} onPress={() => this.DEBUG_toggleIsNearOverride()}>
                    <Text style={{color: 'whitesmoke'}}>{'@'}</Text>
                </TouchableOpacity>
            </View>
            }
            {true &&
            <View style={{alignItems: 'center', justifyContent: 'center', width: d_window.width, zIndex: 1, paddingTop: 285}}>
                <Text style = {debuggerStyles.title}>
                    DEBUGGER
                </Text><Text/>

                <Text> Stage/Turn:   {Turns.stage},{Turns.turn}</Text>

                <Text style = {debuggerStyles.subtitle}>
                    CURRENT TARGET
                </Text>
                <Text> Longitude: {this.state.currentTargetPos.longitude}</Text>
                <Text> Latitude: {this.state.currentTargetPos.latitude}</Text>
                <Text> distToCurrent: {JSON.stringify(Math.round(this.state.distToCurrent))} FT</Text>

                <Text style = {debuggerStyles.subtitle}>
                    NEXT TARGET
                </Text>
                <Text> Longitude: {this.state.nextTargetPos.longitude}</Text>
                <Text> Latitude: {this.state.nextTargetPos.latitude}</Text>
                <Text/>
                <Text> distToNext: {JSON.stringify(Math.round(this.state.distToNext))} FT</Text>
                <Text> nextRadius: {JSON.stringify(Math.round(this.state.nextRadius))} FT</Text>
                <Text> isNear: {JSON.stringify(this.state.isNear)} </Text>

                <Text style = {debuggerStyles.subtitle}>
                    LAST
                </Text>
                <Text> Longitude: {this.state.lastPos.longitude}</Text>
                <Text> Latitude: {this.state.lastPos.latitude}</Text>
                <Text> Accuracy: {JSON.stringify(Math.round(this.state.lastPos.accuracy))} FT</Text>
                <Text/>
            </View>
            }
        </View>
    }
}



  //////////////////////////  
 //// DEBUGGING STYLES ////
//////////////////////////
const debuggerStyles = StyleSheet.create({

    button: {
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      top: 270 * (d_window.width/scale),
      left: 15 * (d_window.width/scale),
      backgroundColor: 'gray',
      height: 30 * (d_window.width/scale),
      width: 30 * (d_window.width/scale),
      borderRadius: 15 * (d_window.width/scale),
    },
  
    title:{
      fontSize: 50 * (d_window.width/scale),
      color: 'black',
      fontWeight: '100',
      textAlign: 'center',
      marginTop: 30 * (d_window.width/scale),
    },
  
    subtitle:{
      fontSize: 20 * (d_window.width/scale),
      color: 'black',
      fontWeight: '500',
      textAlign: 'center',
      paddingTop: 20 * (d_window.width/scale),
    },
  });


//   export default Debugger; // for variable
module.exports = Debugger; // for component
