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
import {
  View,
  Image,
  Text,
  TouchableHighlight,
  Linking,
} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons';
import BackgroundGeolocation from "react-native-background-geolocation";

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

var Welcome = require('./app/components/welcome');
// var Tour = require('./app/components/tour');
var About = require('./app/components/about');

var Start = require('./app/components/tour/start');
var SelectionPage = require('./app/components/tour/selection-page');
var InfoPage = require('./app/components/tour/info-page');
var AudioPage = require('./app/components/tour/audio-page');

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MyTheme = {
  dark: false,
  colors: {
    primary: 'rgb(255, 45, 85)',
    background: 'white',
    // card: 'white',
    card: "lightgreen",
    text: 'rgb(28, 28, 30)',
    // border: 'rgb(199, 199, 204)',
    border: 'black',
    notification: 'rgb(255, 69, 58)',
  },
}

class App extends Component {
  constructor(props){
    super(props);
  }

  render() {

    //TODO: Tab Icon Sizes

    return(
      <NavigationContainer theme={MyTheme}>
        <Tab.Navigator initialRouteName='Home' screenOptions={{
          lazy: false, 
          headerShown: true,
          tabBarActiveTintColor: 'tomato',
          tabBarStyle: {paddingTop: 8} //done
        }}>

          <Tab.Screen name='Home' component={Welcome} options={{
            headerTitle: 'Welcome!',
            tabBarIcon: ({ focused, color, size }) => (
              <Icon name='home' color={color} size={size}/>
            )}}/>

{/* TODO: Clicking tab bar icon destroys stack  */}
          <Tab.Screen name='Tour' listeners={ ({navigation, route}) => ({
              tabPress: (e) => {
                e.preventDefault(); //Prevents popToTop on tabPress when tabs already focused (kills tour)
                navigation.jumpTo(route.name); // or navigation.navigate(route.name)
              }})}
            options={{
              headerShown: false,
              tabBarIcon: ({ focused, color, size }) => (
                <Icon name='car' color={color} size={size+6}/>
              )}}>
              
              {() =>
              <Stack.Navigator screenOptions={{
                // header: ({ navigation, route, options, back }) => { .... }
                headerShown: true, 
                headerShadowVisible: true, 
                headerLargeTitleShadowVisible: true,
                headerTransparent: false,
                translucent: false,
                }}>
                <Stack.Screen name='Start the Tour!' component={Start} />
                <Stack.Screen name='Select a Start Point' component={SelectionPage} />
                <Stack.Screen name='Drive to Start Point' component={InfoPage} />
                <Stack.Screen name='Audio Tour' component={AudioPage} />    
              </Stack.Navigator>
            }</Tab.Screen>

          <Tab.Screen name='About' component={About} options={{
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => (
              <Icon name='information-circle' color={color} size={size+2}/>
            )}}/>
  
        </Tab.Navigator>           
      </NavigationContainer>
    );
  }
};

module.exports = App;