import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native'

import { sharedStyles, MyTheme, Scales } from '../helpers/shared_styles';

class Debugger extends Component {

    constructor(props){
        super(props);
        this.state = { 
            debugger: true,
        }
    }

    toggleDebugger(){
        this.setState({ debugger: !this.state.debugger });
    }

    render(){
        return(
            <View style={{}}>

                {this.state.debugger && 
                <View style = {styles.debuggerContainer}>
                    <Text style = {styles.title}>DEBUGGER</Text>
                    
                    <View style = {styles.buttonBar}>
                        <TouchableHighlight style = {styles.button} onPress={() => this.props.stopAudio()}>
                            <Text style={styles.buttonText}>{'X'}</Text>
                        </TouchableHighlight>
                        <TouchableHighlight style = {styles.button} onPress={() => this.props.lastTurn()}>
                            <Text style={styles.buttonText}>{'<'}</Text>
                        </TouchableHighlight>
                        <TouchableHighlight style = {styles.button} onPress={() => this.props.nextTurn()}>
                            <Text style={styles.buttonText}>{'>'}</Text>
                        </TouchableHighlight>
                        <TouchableHighlight style = {[styles.button, {backgroundColor: this.props.state.isNearOverride?'tomato':'gray'}]} onPress={() => this.props.toggleIsNearOverride()}>
                            <Text style={styles.buttonText}>{'@'}</Text>
                        </TouchableHighlight>
                    </View>

                    <View style ={styles.group}>
                        <Text style = {styles.subtitle}>CURRENT TARGET</Text>
                        <Text>Stage: {this.props.stage}, Turn: {this.props.turn}</Text>
                        <Text>Longitude: {this.props.state.currentTargetPos.longitude}</Text>
                        <Text>Latitude: {this.props.state.currentTargetPos.latitude}</Text>
                        <Text>distToCurrent: {JSON.stringify(Math.round(this.props.state.distToCurrent))} FT</Text>
                    </View>

                    <View style ={styles.group}>
                        <Text style = {styles.subtitle}>NEXT TARGET</Text>
                        <Text>Longitude: {this.props.state.nextTargetPos.longitude}</Text>
                        <Text>Latitude: {this.props.state.nextTargetPos.latitude}</Text>
                        <Text>distToNext: {JSON.stringify(Math.round(this.props.state.distToNext))} FT</Text>
                        <Text>nextRadius: {JSON.stringify(Math.round(this.props.state.nextRadius))} FT</Text>
                        <Text>isNear: {JSON.stringify(this.props.state.isNear)} </Text>
                    </View>

                    <View style ={styles.group}>
                        <Text style = {styles.subtitle}>LAST LOCATION</Text>
                        <Text>Longitude: {this.props.state.lastPos.longitude}</Text>
                        <Text>Latitude: {this.props.state.lastPos.latitude}</Text>
                        <Text>Accuracy: {JSON.stringify(Math.round(this.props.state.lastPos.accuracy))} FT</Text>
                        <Text>{Scales.width}, {Scales.height}</Text>
                    </View>

                </View>}

                <TouchableHighlight style={[styles.debuggerToggle, {opacity: this.state.debugger, height: (this.state.debugger?30:5)*Scales.horizontal}]} onLongPress={() => this.toggleDebugger()} onPress={()=>this.setState({debugger: false})}>
                    <Text style={styles.toggleText}>{this.state.debugger?'CLOSE DEBUGGER':''}</Text>  
                </TouchableHighlight>
            </View>
       )
    }
}



  //////////////////////////  
 //// DEBUGGING STYLES ////
//////////////////////////
const styles = StyleSheet.create({

    debuggerContainer: {
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: '100%',
        height: 500 * Scales.horizontal,
        // backgroundColor: 'rgb(50,50,50)',
    },

    title:{
        fontSize: 50 * Scales.font,
        color: 'black',
        fontWeight: '200',
        textAlign: 'center',
      },

    buttonBar: {
        width: '45%',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
    },

    button: {
        justifyContent: 'center',   //Vertical
        alignItems: 'center',       //Horizontal
        backgroundColor: 'gray',
        width: 30 * Scales.horizontal,
        aspectRatio: 1,
        borderRadius: 15 * Scales.horizontal,
    },

    buttonText: {
        color: 'whitesmoke',
        fontSize: 15 * Scales.font,
        fontWeight: '500',
    },

    group: {
        alignItems: 'center',
        justifyContent: 'center',
    },
  
    subtitle:{
      fontSize: 20 * Scales.font,
      color: 'black',
      fontWeight: '500',
      textAlign: 'center',
      paddingTop: '3%',
    },

    debuggerToggle:{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'tomato',
        width: '100%',
    },

    toggleText: {
        fontSize: 15 * Scales.font,
    }
  });


module.exports = Debugger; // for component
