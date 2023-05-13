import { style } from 'deprecated-react-native-prop-types/DeprecatedImagePropType';
import { 
    StyleSheet,
    Dimensions,
    // PixelRatio,
} from 'react-native'

const {width, height, scale, fontScale} = Dimensions.get('window');

const Scales = {
  font: width/390,
  vertical: height / 844, //TODO remove??

  radius: width / 390,
  horizontal: width / 390,
  icon: width / 390,

  hasNotch: true, //TODO use platform

  width: width, 
  height: height,
  scale: scale,
  fScale: fontScale,
}
// const fontScale = height / 844;


// console.log(35*1.6011544452661226)

//1.6011544452661226
//884 /667 = 1.265367316341829 ^2 = 1.6011544452661226

// LOG  {"fontScale": 1, "height": 844, "scale": 3, "width": 390}

//Scalable:
/*
icon size (tab bar)
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

//Fonts:
/*


*/
// import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
// import { useHeaderHeight } from '@react-navigation/elements';

// const tabBarHeight = useBottomTabBarHeight();
// const headerHeight = useHeaderHeight();



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
    weight: (Scales.scale == 3) ? '200' : '100',
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
    
    // button:{
    //   bottom: 0, 
    //   marginBottom: '7.69%',
    //   width: '100%',
    //   height: 55 * fontScale, // TODO scalable (dependant on text size?)
    //   backgroundColor: 'gray',
    //   justifyContent: 'center',
    //   alignItems: 'center',
    //   opacity: 1,
    //   underlayColor: '#BBBBBB',
    // },

    button:{
      // bottom: 0, 
      // marginBottom: 10,
      width: '100%',
      height: 55 * Scales.horizontal,
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
      height:.395 * width*14/10.51,
      width: width,
      // backgroundColor: 'lightblue',
      justifyContent: 'center',
      alignItems: 'center',
      activeColor: '#007aff',
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