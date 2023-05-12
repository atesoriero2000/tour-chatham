import { 
    StyleSheet,
    Dimensions,
} from 'react-native'

const d_window = Dimensions.get('window');

// console.log(35*1.6011544452661226)

//1.6011544452661226
//884 /667 = 1.265367316341829 ^2 = 1.6011544452661226

// LOG  {"fontScale": 1, "height": 844, "scale": 3, "width": 390}

//Scalable:
/*
font size
icon size (tab bar and tutorial)
*/

/* Test:
border radius
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

  scrollView: {
    marginBottom: '5%', //TODO 
  },

  defaultText: {
    color: 'grey',
    weight: '200',
    clickableColor: '#9090FF',
  },

  start: {
    topTextSize: 19,
    bottomTextSize: 17,
    clickableTextSize: 15,
  },

  welcome: {
    titleFontSize: 35,
    titleFontWeight: '100',//TODO combine
  },

  tutorial: {
    titleSize: 30,
    textSize: 16,
  },

  about: {
    headerSize: 57,
    textSize: 16.5,
    titleSize: 35,
    labelSize: 16,
    fineTextSize: 14,
    headerWeight: '100',//TODO combine
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
      bottom: 0, 
      marginBottom: '7.69%',
      width: '100%',
      height: 55, // TODO scalable (dependant on text size?)
      backgroundColor: 'gray',
      justifyContent: 'center',
      alignItems: 'center',
      opacity: 1,
      underlayColor: '#BBBBBB',
    },
  
    buttonText:{
      fontSize: 20,
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

    clickable:{
      // color: MyTheme.defaultText.clickableColor,
      // textDecorationLine: 'underline',
    },
  });

  export {sharedStyles, MyTheme, d_window};