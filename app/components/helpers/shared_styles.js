import { 
    StyleSheet,
    Dimensions,
} from 'react-native'
const d_window = Dimensions.get('window');

export default StyleSheet.create({
  
    container:{
      alignItems: 'center',
      justifyContent: 'center',
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
      marginTop: 21.5 * Math.pow((d_window.height/667), 2) + (d_window.height === 812? 10:0),
      opacity: 0.5,
    },
  
    halfButton:{
      width: d_window.width/2,
      height: 36 * Math.pow((d_window.height/667), 2),
      backgroundColor: 'gray',
      justifyContent: 'center',
      alignItems: 'center',
    },
  
    halfButtonView:{
      flex: 2,
      flexDirection: 'row',
      width: d_window.width,
      height: 36 * Math.pow((d_window.height/667), 2),
      justifyContent: 'center',
      marginTop: 21.5 * Math.pow((d_window.height/667), 2),
      opacity: 0.5,
    },
  
    buttonText:{
      fontSize: 17 * (d_window.width/375),
      color: 'white',
      fontWeight: '100',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });