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

  fontWeight: (weight) => {   
    let w = parseInt(weight) + (scale-3)*100;
    return ((w==0) ? '100' : w.toString())
  },
}


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
    weight: Scales.fontWeight('200'),
    titleWeight: Scales.fontWeight('100'),
  },
}


const sharedStyles = StyleSheet.create({
  
    container:{
      alignItems: 'center',
      justifyContent: 'space-evenly',
      width: '100%',
      height: '100%',
      // backgroundColor: 'yellow',
    },

    button:{
      width: '100%',
      height: 55 * Scales.horizontal,
      backgroundColor: 'gray',
      justifyContent: 'center',
      alignItems: 'center',
      opacity: 1,
      underlayColor: '#BBBBBB',
    },
  
    buttonText:{
      fontSize: 18 * Scales.font,
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
      height: StyleSheet.hairlineWidth,
      backgroundColor: MyTheme.colors.border,
      top: 0,
    },

    clickable:{ // concatenated in about.js and start.js
      fontWeight: Scales.fontWeight('200'),
      color: '#6565FF',
    },

    swiper: {
      height: 285 * Scales.vertical,
      width: width,
      justifyContent: 'center',
      alignItems: 'center',
      activeColor: '#007aff',
    },

    //Shared with info and audio page
    locationTitleText:{
      textAlign: 'center',
      color: 'black',
      fontWeight: Scales.fontWeight('300'),
      fontSize: 36 * Scales.font,
      paddingHorizontal: '11%',
    },
  });

  export {sharedStyles, MyTheme, Scales};