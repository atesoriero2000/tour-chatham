import { 
    StyleSheet,
    Dimensions,
} from 'react-native'

import { useTheme } from '@react-navigation/native';

const d_window = Dimensions.get('window');


const MyTheme = {
  dark: false,
  colors: {
    primary: 'rgb(255, 45, 85)',
    background: 'white',
    card: 'whitesmoke',
    text: 'rgb(28, 28, 30)',
    border: 'rgb(199, 199, 204)',
    // border: 'black',
    notification: 'rgb(255, 69, 58)',
  },
}

const sharedStyles = StyleSheet.create({
  
    container:{
      alignItems: 'center',
      justifyContent: 'center',
      flex: 5,
    },
  
    text:{
      paddingHorizontal: 25 * (d_window.width/375),
      paddingTop: 25 * Math.pow((d_window.height/667), 2),
      paddingBottom: 15 * Math.pow((d_window.height/667), 2),
      fontSize: 35 * (d_window.width/375),
      color: 'black',
      fontWeight: '100',
      textAlign: 'center',
      justifyContent: 'center',
    },
  
    border:{
      width: d_window.width,
      height: 13 * Math.pow((d_window.height/667), 2),
      marginBottom: 21.5 * Math.pow((d_window.height/667), 2),
    },
  
    logo:{
      width: d_window.width,
      height: 275 * (d_window.width/375),
    },
  
    button:{
      width: d_window.width,
      height: 36 * Math.pow((d_window.height/667), 2),
      backgroundColor: 'gray',
      justifyContent: 'center',
      alignItems: 'center',
      // marginTop: 21.5 * Math.pow((d_window.height/667), 2) + (d_window.height === 812? 10:0),
      opacity: 0.75,
      // underlayColor = '#BBBBBB'
    },
  
    buttonText:{
      fontSize: 20 * (d_window.width/375),
      color: 'white',
      fontWeight: '200',
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

  export {sharedStyles, MyTheme};