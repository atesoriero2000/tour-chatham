'use strict';

import React, { Component } from 'react'
import {
  StyleSheet,
  TouchableHighlight,
  View,
  Text,
  Dimensions,
  Modal,
  Linking,
  Image,
  Button,
} from 'react-native'

import { BlurView, VibrancyView } from '@react-native-community/blur';
// import Icon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/EvilIcons';

const d_window = Dimensions.get('window');

var Swiper = require('../../Swiper');

class TutorialPopup extends Component {

    navToSelection(){
        this.props.closePopup();
        this.props.navigation.navigate('Tour', {screen: 'Select a Start Point'});
          //TODO
          // leftButtonIcon: this.state.backIcon,
            //   Icon.getImageSource('ios-arrow-back-outline', 35, '#157EFB').then( (backIcon) => this.setState({ backIcon }));
    }

    render() {
        return (
            <BlurView blurType="dark" blurAmount={10} style={styles.overlay}>
                <View style={styles.modal}>
                    <Swiper showsButtons = {true} index = {0} loop = {false}
                        height={d_window.height/1.13 - (d_window.height === 812 ? 95:0)}
                        width={d_window.width/1.25}>

                        {/* Page 1 */}
                        <View style={styles.container}>
                            <View style={styles.imageBox}>
                                <Image source={require('../../../images/tutorial1.jpg')} style={styles.image} />
                            </View>
                            <Text allowFontScaling = {false} style = {styles.text}>
                                Directions will appear on the screen instructing you exactly
                                what to do and what turns to make. The bottom of the screen
                                will indicate the distance until the next turn.
                            </Text>
                        </View>

                        {/* Page 2 */}
                        <View style = {styles.container}>
                            <View style={styles.imageBox}>
                                <Image source={require('../../../images/tutorial2.jpg')} style={styles.image} />
                            </View>
                            <Text allowFontScaling = {false} style = {styles.text}>
                                On the next page you will pick your starting location.
                                You will only visit the locations listed after
                                (any locations listed before the selected location will not be toured).
                            </Text>
                            <TouchableHighlight style = {styles.button}
                                onPress = {() => this.navToSelection()}
                                underlayColor = '#BBBBBB'>
                                <Text allowFontScaling = {false} style = {styles.buttonText}>Click to Continue</Text>
                            </TouchableHighlight>
                        </View>

                    </Swiper>
                </View>

                {/* Header (absolute Positioning) */}
                <View style={styles.container}>
                    <Text allowFontScaling = {false} style={styles.title}>Tutorial</Text>
                    <Icon name={'close'} size={40 * (d_window.width/375)} color={'#157EFB'} style={styles.exitButton}
                        onPress={() => this.props.closePopup()} />
                </View>
                
            </BlurView>
        )
    }
}

const styles = StyleSheet.create({

    overlay:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    modal:{
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        width: d_window.width/1.25,
        height: d_window.height/1.13 - (d_window.height === 812 ? 95:0),
        borderRadius: 15 * (d_window.width/375),
        backgroundColor: 'whitesmoke',
    },

    container:{
        alignItems: 'center',
    },

    imageBox:{
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 57 * (d_window.height/667) + (d_window.height === 812 ? 0:0),
        marginBottom: 15 * Math.pow((d_window.height/667), 2),
        // marginBottom: 21 * Math.pow((d_window.height/667), 2) - (d_window.height === 812 ? 10:0),
        backgroundColor: 'lightgrey',
        borderRadius: 10 * (d_window.width/375),
    },

    image:{
        width: (d_window.width/1.25)/1.375,
        height: (d_window.width/.7597)/1.375,
        // height: (d_window.width/.9413)/1.375,
        margin: 10 * (d_window.width/375),
        borderRadius: 5 * (d_window.width/375),
    },

    text:{
        textAlign: 'center',
        fontSize: 15 * (d_window.width/375),
        fontWeight: '500',
        color: 'black',
        paddingHorizontal: 20 * (d_window.width/375),
    },

    button:{
        width: d_window.width/1.25,
        height: 35 * Math.pow((d_window.height/667), 1.5),
        backgroundColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22 * Math.pow((d_window.height/667), 2) - (d_window.height === 812 ? 10:0),
    },
    
    buttonText:{
        fontSize: 16 * (d_window.width/375),
        color: 'white',
        fontWeight: '100',
        textAlign: 'center',
    },

    title:{
        position: 'absolute',
        bottom: (247 + 1) * (d_window.height/667) - (d_window.height === 812 ? 40:0),
        fontSize: 30 * (d_window.width/375),
        fontWeight: '100',
    },
    
      exitButton:{
        position: 'absolute',
        bottom: 247 * (d_window.height/667) - (d_window.height === 812 ? 40:0),
        right: 101 * (d_window.width/375),
    },
});

module.exports = TutorialPopup;