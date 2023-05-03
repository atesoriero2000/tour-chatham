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
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MyTheme } from './app/components/helpers/shared_styles';

var Welcome = require('./app/components/welcome');
var Start = require('./app/components/tour/start');
var SelectionPage = require('./app/components/tour/selection-page');
var InfoPage = require('./app/components/tour/info-page');
var AudioPage = require('./app/components/tour/audio-page');
var About = require('./app/components/about');

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


import { activateKeepAwake, deactivateKeepAwake } from 'expo-keep-awake';//TODO

class App extends Component {
  constructor(props){
    super(props);
  }

  render() {

    activateKeepAwake(); //TODO

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
              <Stack.Navigator screenOptions={{headerShown: true }}>
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