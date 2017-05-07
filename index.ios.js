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
      selectedTab: 'welcome',
      unmount: {
        a: false,
        b: false,
        c: false,
      },
    };
  }

  componentWillUpdate(){
    console.log(this.state.unmount);
  }

  getUnmount(){
    return this.state.unmount
  }

  render() {
    return(
      <TabBarIOS selectedTab={this.state.selectedTab}>

        <TabBarIOS.Item //Welcome Tab
          selected = {this.state.selectedTab === 'welcome'}
          systemIcon = {'featured'}

          onPress= {() => {
              this.setState({
                selectedTab: 'welcome',
                unmount: {
                  a: false,
                  b: true,
                  c: true,
                },
              });
            }}>
          <Welcome unmount = {() => this.getUnmount()}/>
        </TabBarIOS.Item>


        <TabBarIOS.Item //Tour Tab
          selected = {this.state.selectedTab === 'tour'}
          systemIcon = {'featured'}

          onPress= {() => {
              this.setState({
                selectedTab: 'tour',
                unmount: {
                  a: true,
                  b: false,
                  c: true,
                },
              });
            }}>
          <Tour unmount = {() => this.getUnmount()}/>
        </TabBarIOS.Item>


        <TabBarIOS.Item //About Tab
          selected = {this.state.selectedTab === 'about'}
          systemIcon = {'more'}

          onPress= {() => {
              this.setState({
                selectedTab: 'about',
                unmount: {
                  a: true,
                  b: true,
                  c: false,
                },
              });
            }}>
          <About unmount ={() => this.state.getUnmount()}/>
        </TabBarIOS.Item>


      </TabBarIOS>
    );
  }
}


AppRegistry.registerComponent('scout_project', () => scout_project);
