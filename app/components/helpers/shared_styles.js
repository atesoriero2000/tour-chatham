import { 
    StyleSheet,
    Dimensions,
} from 'react-native'

const d_window = Dimensions.get('window');


const MyTheme = {
  dark: false,
  colors: {
    primary: 'rgb(255, 45, 85)',
    background: 'white',
    card: 'whitesmoke',
    text: 'rgb(28, 28, 30)',
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)',
    swiper: '#007aff',
  },

  defaultText: {
    color: 'grey',
    weight: '100',
    clickableColor: '#9090FF',
    paddingHorizontal: 35,
    titleFontSize: 35,
  },

  about: {
    headerSize: 57,
    textSize: 17,
    titleSize: 35,
    labelSize: 16,
    fineTextSize: 14,
  },

  tutorialFont: {
    titleSize: 30,
    textSize: 16,
    paddingHorizontal: 30,
  },

  start: {
    topTextSize: 19,
    bottomTextSize: 17,
    clickableTextSize: 15,
  },
}

//Scalable:
/*
font size
paddingHorizontal
icon size (tab bar and tutorial)
tutorial popup border radius?
font wieght? 
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

const sharedStyles = StyleSheet.create({
  
    container:{ //flex direction column by default
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
      // backgroundColor: 'yellow',
    },
    
    button:{
      position: 'absolute',
      bottom: 35, // TODO  scalable
      width: '100%',
      height: 35 * Math.pow((d_window.height/667), 2), // TODO scalable
      backgroundColor: 'gray',
      justifyContent: 'center',
      alignItems: 'center',
      opacity: 1,
      underlayColor: '#BBBBBB',
    },
  
    buttonText:{
      fontSize: 20,
      color: 'white',
      fontWeight: '100',
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
  });

  export {sharedStyles, MyTheme, d_window};