import { capInsets, style } from 'deprecated-react-native-prop-types/DeprecatedImagePropType';
import { 
    StyleSheet,
    Dimensions,
} from 'react-native'

const {width, height, scale, fontScale} = Dimensions.get('window');

  // insets and hasNotch set in welcome.js
var Scales = {
  font: width/390,
  vertical: height / 844,

  radius: width / 390,
  horizontal: width / 390,
  icon: width / 390,

  width: width, 
  height: height,
  scale: scale,
  fScale: fontScale,
}

//Scalable:
/*
*/

/* Test:
font weight
*/

//Color:
/*

Swiper: #007aff
Tutorial popup: #157EFB
Start page clickable: #9090FF
Info page: #6565FF

*/




const MyTheme = {
  dark: false,
  colors: {
    primary: 'rgb(255, 45, 85)',
    background: 'white',
    card: 'whitesmoke',
    text: 'rgb(28, 28, 30)',
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)',
  },

  defaultText: {
    color: 'grey',
    weight: '200', //(Scales.scale == 2) ? '200' : '100', //TODO DPI or something (5s to thick, SE 3rd not)
    titleWeight: '100',
    clickableColor: '#9090FF', //TODO move to styles
  },

  about:{
    labelWeight: '500'
  },
  selection:{
    titleWeight: '300'
  },
}


const sharedStyles = StyleSheet.create({
  
    container:{ //flex direction column by default
      // flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
      // backgroundColor: 'yellow',
    },

    button:{
      width: '100%',
      height: 60 * Scales.horizontal,
      backgroundColor: 'gray',
      justifyContent: 'center',
      alignItems: 'center',
      opacity: 1,
      underlayColor: '#BBBBBB',
    },
  
    buttonText:{
      fontSize: 20 * Scales.font,
      color: 'white',
      fontWeight: MyTheme.defaultText.weight,
      justifyContent: 'center',
      alignItems: 'center',
    },

    headerBorder:{
      position: 'absolute',
      width: '100%',
      opacity: 1,
      zIndex: 1,
      height: Scales.hasNotch ? StyleSheet.hairlineWidth : 0,
      backgroundColor: MyTheme.colors.border,
      top: 0,
    },

    clickable:{ //TODO
      // color: MyTheme.defaultText.clickableColor,
      // textDecorationLine: 'underline',
    },

    swiper: {
      // aspectRatio: 1400/1051,
      // height:.395 * width*14/10.51,
      // height: Math.pow(height,1/2)*7.1,
      height: 285 * Scales.vertical, //TODO maybe check??
      width: width,
      // backgroundColor: 'lightblue',
      justifyContent: 'center',
      alignItems: 'center',
      activeColor: '#007aff',
      // activeColor: 'green',
    },

    // swiperImage: {
    //   width: 100%
    // },

    box: {
    flex: 1,
    // backgroundColor: 'blue',

    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  });

  export {sharedStyles, MyTheme, Scales};