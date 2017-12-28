/**
 * Chatham Township Historical Society's Driving Tour App
 * Created by: Anthony Tesoriero
 * https://github.com/atesoriero2000
 *
 * Powered by React Native
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  TabBarIOS,
  View,
  Text
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import BackgroundGeolocation from "react-native-background-geolocation";

var Welcome = require('./app/components/ios/welcome');
var Tour = require('./app/components/ios/tour');
var About = require('./app/components/ios/about');

export default class App extends Component {

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
    };
  }

  permissionsPopup(){
    BackgroundGeolocation.configure({ // NOTE: needed tp force permissions popup on startup
      locationAuthorizationRequest: 'WhenInUse',
      debug: false,
      logLevel: BackgroundGeolocation.LOG_LEVEL_OFF,
    }, (state) => {
      console.log("- BackgroundGeolocation is configured and ready: ", state.enabled);
      if (!state.enabled) BackgroundGeolocation.start();
    });
    BackgroundGeolocation.stop();
  }

  render() {
    return(
      <TabBarIOS selectedTab={this.state.selectedTab}>

        <Icon.TabBarItemIOS  //Welcome Tab
          selected = {this.state.selectedTab === 'welcome'}
          title = {'Home'}
          iconName = {'ios-home-outline'}
          selectedIconName = {'ios-home'}
          onPress = { () => this.setState({ selectedTab: 'welcome' }) }>

          <Welcome toTour = { () => this.setState({ selectedTab: 'tour' }) }/>
        </Icon.TabBarItemIOS>


        <Icon.TabBarItemIOS //Tour Tab
          selected = {this.state.selectedTab === 'tour'}
          title = {'Tour'}
          iconName = {'ios-car-outline'}
          selectedIconName = {'ios-car'}
          onPress = { () => this.setState({ selectedTab: 'tour'}) }>

          <Tour toAbout = { () => this.setState({ selectedTab: 'about' }) }/>
        </Icon.TabBarItemIOS>


        <TabBarIOS.Item //About Tab
          selected = {this.state.selectedTab === 'about'}
          systemIcon = {'more'}
          onPress = { () => this.setState({ selectedTab: 'about' }) }>

          <About/>
         </TabBarIOS.Item>

       </TabBarIOS>
    );
  }
}
