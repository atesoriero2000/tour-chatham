'use strict';

import React, { Component } from 'react'
import {
  StyleSheet,
  TouchableHighlight,
  View,
  Text,
  Dimensions,
  SafeAreaView, //needed
  Image,
} from 'react-native'
import { BlurView } from '@react-native-community/blur';
import Icon from 'react-native-vector-icons/EvilIcons';
import { sharedStyles, MyTheme, d_window } from '../helpers/shared_styles';
import { style } from 'deprecated-react-native-prop-types/DeprecatedImagePropType';
Icon.loadFont(); //needed

const { width, height } = d_window; //TODO remove

var Swiper = require('../helpers/Swiper');

class TutorialPopup extends Component {

    render() {
        return (
            <BlurView blurType="dark" blurAmount={10} style={styles.underlay}>
                <SafeAreaView/> 
                <View style={styles.modal}>
                    
                    <View style={headerStyles.box}>
                        {/* TODO icon size */}
                        <Icon name={'close'} size={40} color={MyTheme.colors.swiper} style={headerStyles.x} onPress={this.props.closePopup}/>
                        <Text style={headerStyles.title}>Tutorial</Text>
                    </View>

{/* TODO swiper height */}
                    <Swiper autoplay={false} showsButtons={true} loop={false} height={height * (parseFloat(styles.modal.height)/100)-headerStyles.box.height} width={width * parseFloat(styles.modal.width)/100} activeColor={MyTheme.colors.swiper}>
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
        <View style={pageStyles.page}>
            <View style={pageStyles.imageBox}>
                <Image source={require('../../images/tutorial1.jpg')} style={[pageStyles.image, {aspectRatio: 750/1234}]}/>
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
        <View style = {pageStyles.page}>
            <View style={pageStyles.imageBox}>
                <Image source={require('../../images/tutorial2.jpg')} style={[pageStyles.image, {aspectRatio: 750/996}]} />
            </View>
            <Text style = {pageStyles.text}>
                On the next page you will pick your starting location.
                You will only visit the locations listed after
                (any locations listed before the selected location will not be toured).
            </Text>
            {/* TODO button styling scalable  */}
            <TouchableHighlight style = {[sharedStyles.button, {bottom: 60}]}
                onPress = {props.navToSelection}
                underlayColor = {sharedStyles.button.underlayColor}>
                <Text style = {sharedStyles.buttonText}>Click to Continue</Text>
            </TouchableHighlight>
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
        // justifyContent:""
        justifyContent: 'flex-end',
        flexDirection: 'column',
        width: '85%',
        height: '80%',
        borderRadius: 25, //TODO scaling proportioned with box.height and x.left
        backgroundColor: 'whitesmoke',
    },
})

const headerStyles = StyleSheet.create({
    box: {
        position: 'absolute',
        top: 0,
        justifyContent: 'center',
        backgroundColor: '#E0E0E0',
        borderTopLeftRadius: styles.modal.borderRadius,
        borderTopRightRadius: styles.modal.borderRadius,
        height: 60, //TODO scalling?
        borderColor: 'slategray',
        borderBottomWidth: StyleSheet.hairlineWidth,
        width: '100%',
    },
    title:{
        fontSize: 30, //TODO font size
        fontWeight: '100',
        textAlign: 'center',

        // backgroundColor: 'blue',
        
    },
    x:{
        position: 'absolute',
        zIndex: 1,
        left: 5, //TODO Scalling? needs to be in propotion with border radius and box.height
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'red',
    },
})


//TODO XXX redo imagebox, text, and button formatting with flexbox, gap

const pageStyles = StyleSheet.create({
 
    page:{
        alignItems: 'center',
        justifyContent: 'flex-start',
        // backgroundColor: 'lightgreen',
        height: '100%',
        width: '100%',
    },

    imageBox:{
        // flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'lightgrey',
        width: '75%',
        marginVertical: 27, //TODO scalabe,
        padding: 10, //TODO scalable?
        borderRadius: 10,//TODO scalable?
    },

    image:{
        height: undefined, //needed
        width: '100%',
        borderRadius: 5, //TODO scalable?
    },


    text:{
        textAlign: 'center',
        fontSize: 16, //TODO font size
        fontWeight: '500',
        color: 'black',
        paddingHorizontal: MyTheme.text.paddingHorizontal-5, //TODO paddingHorizontal
        // backgroundColor: 'pink'
        // paddingVertical: 20,
    },
  
});

module.exports = TutorialPopup;