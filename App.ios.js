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
import { MyTheme, Scales } from './app/components/helpers/shared_styles';

var Welcome = require('./app/components/welcome');
var Start = require('./app/components/tour/start');
var SelectionPage = require('./app/components/tour/selection-page');
var InfoPage = require('./app/components/tour/info-page');
var AudioPage = require('./app/components/tour/audio-page');
var About = require('./app/components/about');

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator(); 

class App extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    BackgroundGeolocation.ready({
      reset: true,
      persistMode: false,
      showsBackgroundLocationIndicator: true,
      debug: false, // <-- enable this hear sounds for background-geolocation life-cycle.
      logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE, //VERBOSE, OFF
      maxRecordsToPersist: 0,
      locationAuthorizationRequest: 'WhenInUse', //Always assumes we did proper permissions in info and App.ios.js
      
      desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_NAVIGATION,
      stationaryRadius: 5, //meters but usually takes ~200m at default 25
      distanceFilter: 1, ///meters, OR you can set locationUpdateInterval
      // locationUpdateInterval: 1000, //ANDROID ONLY
      // preventSuspend: true, //watchPosition already does this
      isMoving: true, //ensures immediate location updates
      disableElasticity: true, //Very Important, or else updates lessen with speed
      elasticityMultiplier: 0, //0=redundant to disableElasticity
      disableStopDetection: true, // disable accelerometer use and defaults to apples 15mins times
      pausesLocationUpdatesAutomatically: false, // needed 
      // stopTimeout: 5, //mins => default 5, disableStopDetection overrides this

      locationAuthorizationAlert: { 
        titleWhenNotEnabled: "Location Services are not enabled",
        titleWhenOff: "Location Services are off",
        instructions: "Location Services must be set to 'While Using the App' in settings",
        cancelButton: "Cancel",
        settingsButton: "Settings"
      }
    }).then((status) => {
      console.log("GEOLOCATION READY: ", status);
      BackgroundGeolocation.stop();
    }).catch( (error) => { console.error("***** GEOLOCATION READY FAILED *****", error) });

    BackgroundGeolocation.requestPermission()
    .then( (status) => console.log("[requestPermission] STATUS: ", status))
    .catch( (error) => {
      console.error("[requestPermission] ERROR: ", error)
      BackgroundGeolocation.requestPermission(); //forces locationAuthorizationAlert if request fails
    })
  }

  render() {
    return(
      <NavigationContainer theme={MyTheme}>
        <Tab.Navigator initialRouteName='Home' screenOptions={{
          lazy: true, //needed
          headerShown: true,
          tabBarActiveTintColor: 'tomato',
          tabBarStyle: {paddingTop: '2%'} //done
        }}>

          <Tab.Screen name='Home' component={Welcome} options={{
            headerTitle: 'Welcome!',
            tabBarIcon: ({ focused, color, size }) => (
              <Icon name='home' color={color} size={size * Scales.icon}/>
            )}}/>

          <Tab.Screen name='Tour' listeners={ ({navigation, route}) => ({
              tabPress: (e) => {
                e.preventDefault(); //Prevents popToTop on tabPress when tabs already focused (kills tour)
                navigation.jumpTo(route.name); // or navigation.navigate(route.name)
              }})}
            options={{
              headerShown: false,
              // headerTitleShadowVisible: false,
              tabBarIcon: ({ focused, color, size }) => (
                <Icon name='car' color={color} size={(size+6) * Scales.icon}/>
              )}}>
              
              {() =>
              //LATER animation value, and presentation
              <Stack.Navigator screenOptions={{headerShown: true, gestureEnabled: false}}>
                <Stack.Screen name='Start the Tour!' component={Start} />
                <Stack.Screen name='Select a Start Point' component={SelectionPage} />
                <Stack.Screen name='Drive to Start Point' component={InfoPage} />
                <Stack.Screen name='Audio Tour' component={AudioPage} />    
              </Stack.Navigator>
            }</Tab.Screen>

          <Tab.Screen name='About' component={About} options={{
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => (
              <Icon name='information-circle' color={color} size={(size+2) * Scales.icon}/>
            )}}/>
  
        </Tab.Navigator>           
      </NavigationContainer>
    );
  }
};

module.exports = App;