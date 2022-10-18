/**
 * Chatham Township Historical Society's Driving Tour App
 * Created by: Anthony Tesoriero
 * https://github.com/atesoriero2000
 *
 * Powered by React Native
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'

import Icon from 'react-native-vector-icons/Ionicons';
import BackgroundGeolocation from "react-native-background-geolocation";

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

var Welcome = require('./app/components/ios/welcome');
var Tour = require('./app/components/ios/tour');
var About = require('./app/components/ios/about');


const Tab = createBottomTabNavigator();

//Testing imports
// var Start = require('./app/components/ios/driving-tour/start');

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
      visible: false,
    };
  }

  doNothing(){
    // This is a very complex method not to be messed with
    // Hint: it does nothing
    return;
  }

  permissionsPopup(){
    // NOTE: needed to force permissions popup on startup
    // TODO: FIXME: XXX: Removed for 0.70.3 setup
    // navigator.geolocation.requestAuthorization();
    return;
  }
  
  render() {
    return(
      <NavigationContainer>
        <Tab.Navigator> {/* <TabBarIOS selectedTab={this.state.selectedTab}> */}

          <Tab.Screen  //Welcome Tab
            // selected = {this.state.selectedTab === 'welcome'}
            name = 'Home'
            component={Welcome}
            // iconName = {'ios-home-outline'}
            // selectedIconName = {'ios-home'}
            // onPress = { () => this.setState({ selectedTab: 'welcome' }) }
            />

            {/* <Welcome toTour = { () => this.setState({ selectedTab: 'tour' }) }/> */}
          {/* </Tab.Screen> */}


          <Tab.Screen //Tour Tab
            // selected = {this.state.selectedTab === 'tour'}
            name = 'Tour'
            component={Tour}
            // iconName = {'ios-car-outline'}
            // selectedIconName = {'ios-car'}
            // onPress = { () => this.setState({ selectedTab: 'tour'}) }
            />

            {/* <Tour toAbout = { () => this.setState({ selectedTab: 'about' }) }/> */}
          {/* </Tab.Screen> */}


          <Tab.Screen //About Tab
            // selected = {this.state.selectedTab === 'about'}
            name='More'
            component={About}
            // systemIcon = {'more'}
            // onPress = { () => this.setState({ selectedTab: 'about' }) }
            />

            {/* <About/> */}
          {/* </Tab.Screen> */}

        </Tab.Navigator>        {/* </TabBarIOS> */}
      </NavigationContainer>
    );
  }
};

// export default App;
module.exports = App;
