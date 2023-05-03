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
    // border: 'black',
    notification: 'rgb(255, 69, 58)',
  },
}

const sharedStyles = StyleSheet.create({
  
    container:{
  
      flex: 1,
      alignItems: 'center', //center vertically
      // justifyContent: 'center',
      // alignContent: 'space-around',

      width: '100%',
      height: '100%',
      // backgroundColor: 'yellow', //TODO

    },
    
    button:{
      position: 'absolute',
      bottom: 35,
      width: '100%',
      height: 36 * Math.pow((d_window.height/667), 2),
      backgroundColor: 'gray',
      justifyContent: 'center',
      alignItems: 'center',
      opacity: 1,
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

  export {sharedStyles, MyTheme, d_window};