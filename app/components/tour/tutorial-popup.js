'use strict';

import React, { Component } from 'react'
import {
  StyleSheet,
  TouchableHighlight,
  View,
  Text,
  Dimensions,
  SafeAreaView,
  Image,
} from 'react-native'
import { BlurView, VibrancyView } from '@react-native-community/blur';
import Icon from 'react-native-vector-icons/EvilIcons';
Icon.loadFont(); //TODO: fix idk why its only needed once
//TODO: react-navigation offers modal views in Stack.Group

const d_window = Dimensions.get('window');
var Swiper = require('../helpers/Swiper');

class TutorialPopup extends Component {

    render() {
        return (
            <BlurView blurType="dark" blurAmount={10} style={styles.overlay}>
                <SafeAreaView/>
                <View style={styles.modal}>
                    <View style={styles.headerBar}>
                        <Icon name={'close'} size={40 * (d_window.width/375)} color={'#157EFB'} style={styles.exitButton} onPress={() => this.props.closePopup()} />
                        <Text style={styles.title}>Tutorial</Text>
                    </View>


                    <Swiper style={styles.swiper} autoplay={false} showsButtons={true} loop={false} height={600} width={d_window.width/1.25}>

                        {/* Page 1 */}
                        <View style={styles.page}>
                            <View style={styles.imageBox}>
                                <Image source={require('../../images/tutorial1.jpg')} style={styles.image} />
                            </View>
                            <Text style = {styles.text}>
                                Directions will appear on the screen instructing you exactly
                                what to do and what turns to make. The bottom of the screen
                                will indicate the distance until the next turn.
                            </Text>
                        </View>

                        {/* Page 2 */}
                        <View style = {styles.page}>
                            <View style={styles.imageBox}>
                                <Image source={require('../../images/tutorial2.jpg')} style={styles.image} />
                            </View>
                            <Text style = {styles.text}>
                                On the next page you will pick your starting location.
                                You will only visit the locations listed after
                                (any locations listed before the selected location will not be toured).
                            </Text>
                            <TouchableHighlight style = {styles.button}
                                onPress = {() => this.props.navToSelection()}
                                underlayColor = '#BBBBBB'>
                                <Text style = {styles.buttonText}>Click to Continue</Text>
                            </TouchableHighlight>
                        </View>

                    </Swiper>
                </View>                
            </BlurView>
        )
    }
}


const styles = StyleSheet.create({

    overlay:{
        flex: 1,
        // flexDirection: 'column',
        alignItems: 'center',
        // justifyContent: 'center',
    },

    modal:{
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        flex: 2,
        width: d_window.width/1.25,
        // height: d_window.height/1.13 - (d_window.height === 812 ? 95:0),
        // height: 1000000,
        borderRadius: 30 * (d_window.width/375),
        backgroundColor: 'whitesmoke',
        marginTop: 20,
        marginBottom: 100,
    },

    headerBar: {
        flex: -1, //TODO: Swiper doesnt repect style props or flex value
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'lightblue',
        // paddingTop: ,
        height: 75,
        width: d_window.width/1.25,        
    },

    title:{
        flex: 2,
        fontSize: 30 * (d_window.width/375),
        fontWeight: '100',
    },
    
    exitButton:{
        flex: 1,

        // margin: 10,
    },

    // swiper: {
    //     flex: -1,
    // },

    page:{
        // alignItems: 'center',
        // backgroundColor: 'lightgray',
        height: 500,
    },

    imageBox:{
        alignItems: 'center',
        justifyContent: 'center',
        // marginTop: 57 * (d_window.height/667) + (d_window.height === 812 ? 0:0),
        backgroundColor: 'lightgrey',
        borderRadius: 10 * (d_window.width/375),
    },

    image:{
        width: (d_window.width/1.25)/1.3, //TODO: preserve orrigial aspect ratios of pictures 
        height: (d_window.width/.7597)/1.3,
        margin: 10 * (d_window.width/375),
        borderRadius: 5 * (d_window.width/375),
    },

    text:{
        textAlign: 'center',
        fontSize: 15 * (d_window.width/375),
        fontWeight: '500',
        color: 'black',
        paddingHorizontal: 20 * (d_window.width/375),
        paddingVertical: 20,
    },

    button:{
        width: d_window.width/1.25,
        height: 35 * Math.pow((d_window.height/667), 1.5),
        backgroundColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center',
    },
    
    buttonText:{
        fontSize: 16 * (d_window.width/375),
        color: 'white',
        fontWeight: '100',
        textAlign: 'center',
    },

  
});

module.exports = TutorialPopup;