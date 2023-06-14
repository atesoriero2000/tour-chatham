import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native'

import { sharedStyles, MyTheme, Scales } from '../helpers/shared_styles';
const sigFigs = 4;

class Debugger extends Component {

    constructor(props){
        super(props);
        this.state = { 
            debugger: false,
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
                        <Text style = {styles.text}>Stage: {this.props.stage}, Turn: {this.props.turn}</Text>
                        <Text style = {styles.text}>Longitude: {this.props.state.currentTargetPos.longitude}</Text>
                        <Text style = {styles.text}>Latitude: {this.props.state.currentTargetPos.latitude}</Text>
                        <Text style = {styles.text}>distToCurrent: {JSON.stringify(Math.round(this.props.state.distToCurrent))} FT</Text>
                    </View>

                    <View style ={styles.group}>
                        <Text style = {styles.subtitle}>NEXT TARGET</Text>
                        <Text style = {styles.text}>Longitude: {this.props.state.nextTargetPos.longitude}</Text>
                        <Text style = {styles.text}>Latitude: {this.props.state.nextTargetPos.latitude}</Text>
                        <Text style = {styles.text}>distToNext: {JSON.stringify(Math.round(this.props.state.distToNext))} FT</Text>
                        <Text style = {styles.text}>nextRadius: {JSON.stringify(Math.round(this.props.state.nextRadius))} FT</Text>
                        <Text style = {styles.text}>isNear: {JSON.stringify(this.props.state.isNear)} </Text>
                    </View>

                    <View style ={styles.group}>
                        <Text style = {styles.subtitle}>LAST LOCATION</Text>
                        <Text style = {styles.text}>Longitude: {this.props.state.lastPos.longitude}</Text>
                        <Text style = {styles.text}>Latitude: {this.props.state.lastPos.latitude}</Text>
                        <Text style = {styles.text}>Accuracy: {JSON.stringify(Math.round(this.props.state.lastPos.accuracy*3.28084))} FT</Text>
                        <Text style = {styles.text}>Heading: {this.props.state.lastPos.heading} ± {this.props.state.lastPos.heading_accuracy}°</Text>
                        <Text style = {styles.text}>Speed: {(this.props.state.lastPos.speed*(this.props.state.lastPos.speed>0?2.23694:1)).toFixed(2)} ± {(this.props.state.lastPos.speed_accuracy*(this.props.state.lastPos.speed>0?2.23694:1)).toFixed(2)} MPH</Text>
                        <Text style = {styles.text}>Altitude: {(this.props.state.lastPos.altitude*3.28084).toFixed(2)} ± {(this.props.state.lastPos.altitude_accuracy*(this.props.state.lastPos.altitude_accuracy>0?3.28084:1)).toFixed()} FT</Text>
                        <Text style = {styles.text}>Activity: {this.props.state.lastLocation.activity.type} @ {this.props.state.lastLocation.activity.confidence}%</Text>
                        <Text style = {styles.text}>is_moving: {JSON.stringify(this.props.state.lastLocation.is_moving)}</Text>
                        <Text style = {styles.text}>odometer: {(this.props.state.lastLocation.odometer*3.28084).toFixed()} FT</Text>
                    </View>

                    <View style ={styles.group}>
                        <Text style = {styles.subtitle}>SCALES</Text>
                        <Text style = {styles.text}>Width: {Scales.width}, Height: {Scales.height}</Text>
                        <Text style = {styles.text}>Horizontal: {Scales.horizontal.toFixed(sigFigs)}, Vertical: {Scales.vertical.toFixed(sigFigs)}</Text>
                        <Text style = {styles.text}>Font: {Scales.font.toFixed(sigFigs)}, Icon: {Scales.icon.toFixed(sigFigs)}, Radius: {Scales.radius.toFixed(sigFigs)}</Text>
                        <Text style = {styles.text}>hasNotch: {JSON.stringify(Scales.hasNotch)}, pixel: {Scales.scale}, fScale: {Scales.fScale}</Text>
                        <Text style = {styles.text}>tabBarHeight: {Scales.tabBarHeight}, headerHeight: {Scales.headerHeight}</Text>
                        <Text style = {styles.text}>insets: {JSON.stringify(Scales.insets)}</Text>
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
        height: 750 * Scales.horizontal,
        paddingVertical: '3%',
        // backgroundColor: 'rgb(50,50,50)',
    },

    title:{
        fontSize: 50 * Scales.font,
        color: 'black',
        fontWeight: Scales.fontWeight('200'),
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
        fontWeight: Scales.fontWeight('500'),
    },

    group: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    
    text: {
        fontSize: 14 * Scales.font,
        color: 'black',
        textAlign: 'center',
        fontWeight: Scales.fontWeight('400'),
    },
  
    subtitle:{
      fontSize: 20 * Scales.font,
      color: 'black',
      fontWeight: Scales.fontWeight('500'),
      textAlign: 'center',
      paddingTop: '3%',
      paddingBottom: '1%'
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
