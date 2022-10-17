/**
 * Chatham Township Historical Society's Driving Tour App
 * Created by: Anthony Tesoriero
 * https://github.com/atesoriero2000
 *
 * Powered by React Native
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component, } from 'react'
// import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

// import {
//   AppRegistry,
//   TabBarIOS,
//   View,
//   Text
// } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import BackgroundGeolocation from "react-native-background-geolocation";

var Welcome = require('./app/components/ios/welcome');
var Tour = require('./app/components/ios/tour');
var About = require('./app/components/ios/about');

//Testing imports
import { BlurView, VibrancyView } from '@react-native-community/blur';
import {
  Dimensions,
  Modal
} from 'react-native';
import { parseSync } from '@babel/core';
const d_window = Dimensions.get('window');
var Page1 = require('./app/components/ios/driving-tour/tutorial/page1');
var Page2 = require('./app/components/ios/driving-tour/tutorial/page2');
var Header = require('./app/components/ios/driving-tour/tutorial/header');
var Swiper = require('./app/components/Swiper');


class App extends Component {

   constructor(props){
    super(props);
    this.state = {
      selectedTab: 'welcome',
      mountTabs: setInterval( () => {

        if(this.state.selectedTab === 'welcome') this.setState({ selectedTab: 'tour' });
        else if(this.state.selectedTab === 'tour') this.setState({ selectedTab: 'about' });

        else if(this.state.selectedTab === 'about'){
          this.setState({ selectedTab: 'welcome' });
          this.permissionsPopup();
          clearInterval(this.state.mountTabs);
        }
      }, 5),
      visible: true,
    };
  }

  doNothing(){
    // This is a very complex method not to be messed with
    // Hint: it does nothing
    return;
  }

  permissionsPopup(){
    // NOTE: needed to force permissions popup on startup
    // navigator.geolocation.requestAuthorization();
    return;
  }
  
  render() {
    return(
      <SafeAreaView>
        {/* TUTORIAL */}
        <Modal
          animationType={'fade'}
          transparent={true}
          visible={this.state.visible}>

            <BlurView
              blurType="dark"
              blurAmount={10}
              style={styles.overlay}>

              <View style={styles.modal}>

                {/* <Swiper
                  showsButtons = {true}
                  index = {0}
                  loop = {false}
                  height={d_window.height/1.13 - (d_window.height === 812 ? 95:0)}
                  width={d_window.width/1.25}>

                  <Page1/>
                  <Page2 onPress={() => {
                    this.doNothing();
                    // this.setItem(lMonthKey, JSON.stringify(currentDate.getMonth()) );
                    // this.setItem(lYearKey, JSON.stringify(currentDate.getYear()) );
                  }}/>

              </Swiper> */}
              <Text>HI!!!!</Text>
              <Icon.Button
                name="ios-arrow-back-outline"
                backgroundColor="#3b5998"
                onPress={() => this.setState({ visible: true })}>
                Login with Facebook
              </Icon.Button>
            </View>{/* modalformat */}

            {/* TUTORIAL HEADER */}
            <Header onPress={() => this.setState({visible:false})}/>

          </BlurView>{/* overlay */}
        </Modal>{/* popup */}

        {/* <Tour/> */}
      
      </SafeAreaView>
    );
  //   return(
  //     <TabBarIOS selectedTab={this.state.selectedTab}>

  //       <Icon.TabBarItemIOS  //Welcome Tab
  //         selected = {this.state.selectedTab === 'welcome'}
  //         title = {'Home'}
  //         iconName = {'ios-home-outline'}
  //         selectedIconName = {'ios-home'}
  //         onPress = { () => this.setState({ selectedTab: 'welcome' }) }>

  //         <Welcome toTour = { () => this.setState({ selectedTab: 'tour' }) }/>
  //       </Icon.TabBarItemIOS>


  //       <Icon.TabBarItemIOS //Tour Tab
  //         selected = {this.state.selectedTab === 'tour'}
  //         title = {'Tour'}
  //         iconName = {'ios-car-outline'}
  //         selectedIconName = {'ios-car'}
  //         onPress = { () => this.setState({ selectedTab: 'tour'}) }>

  //         <Tour toAbout = { () => this.setState({ selectedTab: 'about' }) }/>
  //       </Icon.TabBarItemIOS>


  //       <TabBarIOS.Item //About Tab
  //         selected = {this.state.selectedTab === 'about'}
  //         systemIcon = {'more'}
  //         onPress = { () => this.setState({ selectedTab: 'about' }) }>

  //         <About/>
  //        </TabBarIOS.Item>

  //      </TabBarIOS>
  //   );
  }
};

const styles = StyleSheet.create({

  container:{
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  overviewContainer:{
    width: d_window.width,
    height: d_window.height,
    alignItems: 'center',
    // justifyContent: 'center',
  },

  overviewText1:{
    textAlign: 'center',
    fontSize: 17 * (d_window.width/375),
    fontWeight: '100',
    color: 'grey',
    marginHorizontal: 30 * (d_window.width/375),
    marginTop: 65 + (21) * Math.pow((d_window.height/667), 2.5) + (d_window.height === 812? 27:0),
  },

  clickable:{
    fontSize: 14 * (d_window.width/375),
    fontWeight: '100',
    color: '#9090FF',
    textDecorationLine: 'underline',
    marginTop: 2 * Math.pow((d_window.height/667), 2.5),
    marginBottom: 16 * Math.pow((d_window.height/667), 2.5),
  },

  image:{
    width: d_window.width,
    height: 240 * (d_window.width/375),
  },

  overviewText2:{
    textAlign: 'center',
    fontSize: 15 * (d_window.width/375),
    fontWeight: '100',
    color: 'grey',
    marginHorizontal: 35 * (d_window.width/375),
    marginTop: 15 * Math.pow((d_window.height/667), 2.5) + (d_window.height === 812? 10:0),
    marginBottom: 14 * Math.pow((d_window.height/667), 2.5),
  },

  button:{
    width: d_window.width,
    height: 36 * Math.pow((d_window.height/667), 2),
    backgroundColor: 'grey',
    opacity: .5,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },

  buttonText:{
    fontSize: 17 * (d_window.width/375),
    color: 'white',
    fontWeight: '100',
    textAlign: 'center',
  },


//MODAL
  overlay:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  modal:{
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: d_window.width/1.25,
    height: d_window.height/1.13 - (d_window.height === 812 ? 95:0),
    borderRadius: 15 * (d_window.width/375),
    backgroundColor: 'whitesmoke',
  },
});
// export default App;
module.exports = App;
