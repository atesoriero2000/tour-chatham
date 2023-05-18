'use strict';

import React, { Component } from 'react'
import {
  StyleSheet,
  TouchableHighlight,
  View,
  Text,
  SafeAreaView, //needed
  Image,
} from 'react-native'
import { BlurView } from '@react-native-community/blur';
import Icon from 'react-native-vector-icons/EvilIcons';
import { sharedStyles, MyTheme, Scales } from '../helpers/shared_styles';

// Icon.loadFont().catch(e => console.log(e)); //TODO needed?
const xSize = 40 * Scales.icon; 
var Swiper = require('../helpers/Swiper');

class TutorialPopup extends Component {
    render() {
        return (
            <BlurView blurType="dark" blurAmount={10} style={styles.underlay}>
                <SafeAreaView/> 
                <View style={styles.modal}>
                    <Icon name={'close'} size={xSize} color={sharedStyles.swiper.activeColor} style={xStyle.x} onPress={this.props.closePopup}/>
                    <View style={headerStyles.box}>
                        <Text style={headerStyles.title}>Tutorial</Text>
                    </View>

                    <Swiper autoplay={false} showsButtons={true} loop={false} height={Scales.height * (parseFloat(styles.modal.height)/100)-headerStyles.box.height} width={Scales.width * parseFloat(styles.modal.width)/100}>
                        <Page1/>
                        <Page2 navToSelection={this.props.navToSelection}/>
                    </Swiper>

                </View>                
            </BlurView>
        )
    }
}

const Page1 = (props) => {
    return(
        <View style={[sharedStyles.container, {justifyContent: 'flex-start'}]}>
            <View style={[pageStyles.imageBox, {flex: 14}]}>
                <View style={pageStyles.border}>
                    <Image source={require('../../images/tutorial1.jpg')} style={[pageStyles.image, {aspectRatio: 750/1234}]}/>
                </View>
            </View>
            <Text style = {pageStyles.text}>
                Directions will appear on the screen instructing you exactly
                what to do and what turns to make. The bottom of the screen
                will indicate the distance until the next turn.
            </Text>
        </View>
    )
}

const Page2 = (props) => {
    return(
        <View style = {[sharedStyles.container, {justifyContent: 'flex-start'}]}>
            <View style={[pageStyles.imageBox, {flex: 16}]}>
                <View style={pageStyles.border}>
                    <Image source={require('../../images/tutorial2.jpg')} style={[pageStyles.image, {aspectRatio: 750/996}]} />
                </View>
            </View>
            <Text style = {pageStyles.text}>
                On the next page you will pick your starting location.
                You will only visit the locations listed after
                (any locations listed before the selected location will not be toured).
            </Text>
            <View style = {pageStyles.buttonBox}>
                <TouchableHighlight style = {pageStyles.button}
                    onPress = {props.navToSelection}
                    underlayColor = {sharedStyles.button.underlayColor}>
                    <Text style = {sharedStyles.buttonText}>Click to Continue</Text>
                </TouchableHighlight>
            </View>
        </View>
    )
}



const styles = StyleSheet.create({
    underlay:{
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    modal:{
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        width: '85%',
        height: Scales.hasNotch ? '80%' : '91%',
        borderRadius: 25 * Scales.radius,
        backgroundColor: 'whitesmoke',
    },
})

const headerStyles = StyleSheet.create({
    box:{
        justifyContent: 'center',
        backgroundColor: '#E0E0E0',
        borderTopLeftRadius: styles.modal.borderRadius,
        borderTopRightRadius: styles.modal.borderRadius,
        height: 60 * Scales.horizontal,
        borderColor: 'slategrey',
        borderBottomWidth: StyleSheet.hairlineWidth,
        width: '100%',
    },
    title:{
        fontSize: 30 * Scales.font,
        fontWeight: MyTheme.defaultText.titleWeight,
        textAlign: 'center',
    },
})

const xStyle = StyleSheet.create({
    x:{
        position: 'absolute',
        zIndex: 1,
        top: (headerStyles.box.height - (2*62/500+1/1.83)*xSize)/2,
        left: (headerStyles.box.height - (2*113/500+1/1.83)*xSize)/2,
    },
})

const pageStyles = StyleSheet.create({

    imageBox:{
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        // backgroundColor: 'green',

    },

    border:{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'lightgray',
        width: '75%',
        padding: '3%',
        borderRadius: 10 * Scales.radius,
    },

    image:{
        // height: '100%',
        height: undefined, //needed
        width: '100%',
        borderRadius: 5 * Scales.radius,
    },

    text:{
        flex: 5,
        textAlign: 'center',
        fontSize: 16 * Scales.font,
        fontWeight: '500',
        color: 'black',
        paddingHorizontal: '9%',
        width: '100%',
        // backgroundColor: 'blue',
    },

    buttonBox:{
        flex: 5,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        // backgroundColor: 'green',
    },

    button:{
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 1,
        backgroundColor: sharedStyles.button.backgroundColor,
        height: sharedStyles.button.height,
    },
});

module.exports = TutorialPopup;