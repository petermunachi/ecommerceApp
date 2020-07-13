/* eslint-disable react/display-name */
// In App.js in a new project
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Header from '../components/layout/Header';
import Constants from '../Constants/constants';
import { LinearGradient } from 'expo-linear-gradient';



//SCREENS
import NotificationScreen from '../screens/notification/NotificationScreen';

const Stack = createStackNavigator();

function Notification() {
  
  return (
    <Stack.Navigator headerMode={'float'} mode={ "modal" } initialRouteName={"NotificationScreen" } >

      <Stack.Screen
        name="NotificationScreen"
        component={NotificationScreen}
        options={{ 
          headerTitle: props => <Header {...props} title='Notification' />,
          headerTransparent: true,
          headerStatusBarHeight: Constants.statusBarHeight,
          headerBackground: () => (
            <LinearGradient
              colors = {
                [Constants.headerPrimaryGradient, Constants.headerSecondaryGradient]
              }
              locations = {[0, 0.8]}
              start={[0, 0]}
              end={[0, 0.2]}
              style={{
                flex: 1,
                // justifyContent: 'center',
              }}
            />
          ),
         
        }}
      />

      
    </Stack.Navigator>
  );
}

export default Notification;
