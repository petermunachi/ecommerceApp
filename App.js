/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
// In App.js in a new project
import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native';
import { NavigationContainer  } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import AnimatedLoader from "react-native-animated-loader";


import NetInfo from '@react-native-community/netinfo';


/*Screens */
import Home from './routes/Home';
import Sell from './routes/Sell';


function ProfileScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Profile!</Text>
    </View>
  );
}
function NotificationScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Notification!</Text>
    </View>
  );
}

function WishListScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>WishList!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();


export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isConnected: false,
      isLoading: false,

    };

  }

  componentDidMount() {
    NetInfo.fetch().then(state => {
      
      this.setState({isConnected: state.isConnected})
    });

  }
  
  render() {
     const { isLoading } = this.state;
    return (
      <NavigationContainer>
        < AnimatedLoader 
          visible = { isLoading }
          overlayColor = "rgba(255,255,255,0.75)"
          animationStyle = {styles.lottie}
          speed = { 1 }
        />
        
       
        <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'Home') {
                  iconName = focused ? 'md-home' : 'ios-home';
                } else if (route.name === 'Notification') {
                  iconName = focused ? 'ios-notifications' : 'ios-notifications-outline';
                } else if (route.name === 'Sell') {
                  iconName = focused ? 'ios-add-circle' : 'ios-add-circle-outline';
                } else if (route.name === 'WishList') {
                  iconName = focused ? 'ios-star' : 'ios-star-outline';
                } else if (route.name === 'Profile') {
                  iconName = focused ? 'md-person' : 'md-person';
                }

                // You can return any component that you like here!
                return <Ionicons name={iconName} size={size} color={color} />;
              },
            })}
            tabBarOptions={{
              activeTintColor: 'tomato',
              inactiveTintColor: 'gray',
              keyboardHidesTabBar: true
            }}
         >

          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Notification" component={NotificationScreen} />

          {/* SELL SCREEN TAB */}
          < Tab.Screen name = "Sell" component={Sell} />
          {/* < Tab.Screen name = "Sell"
              component = {SellScreen}
              listeners = {
                ({navigation,route}) => ({
                  tabPress: e => {
                    this.setState({isLoading: true});
                    e.preventDefault();
                    if (this.state.isConnected) navigation.jumpTo('Sell')
                    this.setState({isLoading: false });
                  },
                })
              }
          /> */}


          <Tab.Screen name="WishList" component={WishListScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />

        </Tab.Navigator>
      </NavigationContainer>
    );
  }


}

const styles = StyleSheet.create({
  lottie: {
    width: 100,
    height: 100,
  }
});
