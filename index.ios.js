/**
 * Sample React Native App
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

var Welcome = require('./app/ios/components/welcome');
var Tour = require('./app/ios/components/tour');
var About = require('./app/ios/components/about');

class scout_project extends Component {

   constructor(props){
    super(props);
    this.state = {
      selectedTab: 'welcome'
    };
  }

  render() {
    return(
      <TabBarIOS selectedTab={this.state.selectedTab}>

        <TabBarIOS.Item //Welcome Tab
          selected = {this.state.selectedTab === 'welcome'}
          systemIcon = {'featured'}

          onPress= {() => {
              this.setState({
                selectedTab: 'welcome'
              });
            }}>
          <Welcome />
        </TabBarIOS.Item>


        <TabBarIOS.Item //Tour Tab
          selected = {this.state.selectedTab === 'tour'}
          systemIcon = {'featured'}

          onPress= {() => {
              this.setState({
                selectedTab: 'tour'
              });
            }}>
          <Tour />
        </TabBarIOS.Item>


        <TabBarIOS.Item //About Tab
          selected = {this.state.selectedTab === 'about'}
          systemIcon = {'featured'}

          onPress= {() => {
              this.setState({
                selectedTab: 'about'
              });
            }}>
          <About />
        </TabBarIOS.Item>



      </TabBarIOS>
    );
  }
}


AppRegistry.registerComponent('scout_project', () => scout_project);
