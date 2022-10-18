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

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
    };
  }

  //TODO
  // permissionsPopup(){
  //   // NOTE: needed to force permissions popup on startup
  //   // TODO: FIXME: XXX: Removed for 0.70.3 setup
  //   navigator.geolocation.requestAuthorization();
  // }

  render() {
    const MyTheme = {
      dark: false,
      colors: {
        primary: 'rgb(255, 45, 85)',
        background: 'white',
        card: 'white',
        text: 'rgb(28, 28, 30)',
        border: 'rgb(199, 199, 204)',
        notification: 'rgb(255, 69, 58)',
      },
    }

    return(
      <NavigationContainer theme={MyTheme}>
        <Tab.Navigator initialRouteName='Home' screenOptions={{
          lazy: false, 
          headerShown: false,
          tabBarActiveTintColor: 'tomato',
          tabBarStyle: {paddingTop: 8}
        }}>

          <Tab.Screen name='Home' component={Welcome} options={{
            headerTitle: 'Welcome!',
            headerShown: true,
            // headerStyle: { height: 98 },
            tabBarIcon: ({ focused, color, size }) => (
              <Icon name='home' color={color} size={size}/>
            )}}/>

          <Tab.Screen name='Tour' component={Tour} options={{
            tabBarIcon: ({ focused, color, size }) => (
              <Icon name='car' color={color} size={size+4}/>
            )}}/>

          <Tab.Screen name='About' component={About} options={{
            tabBarIcon: ({ focused, color, size }) => (
              <Icon name='information-circle' color={color} size={size+2}/>
            )}}/>
            
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
};

module.exports = App;
