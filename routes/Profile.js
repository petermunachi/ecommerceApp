/* eslint-disable react/display-name */
// In App.js in a new project
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { LinearGradient } from 'expo-linear-gradient';

import Header from '../components/layout/Header';
import Constants from '../Constants/constants';

//SCREENS
import ProfileScreen from '../screens/profile/ProfileScreen';

const Stack = createStackNavigator();

function Profile() {
  
  return (
    <Stack.Navigator headerMode={'float'} mode={ "modal" } initialRouteName={"ProfileScreen" } >

      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ 
          headerShown: false
        //   headerTitle: props => <Header {...props} title='Profile' />,
        //  // headerTransparent: true,
        //   headerStatusBarHeight: Constants.statusBarHeight,
        //   headerBackground: () => (
        //     <LinearGradient
        //       colors = {
        //         [Constants.headerPrimaryGradient, Constants.headerSecondaryGradient]
        //       }
        //       locations = {[0, 0.8]}
        //       start={[0, 0]}
        //       end={[0, 0.2]}
        //       style={{
        //         flex: 1,
        //         // justifyContent: 'center',
        //       }}
        //     />
        //   ),
         
        }}
      />

      
    </Stack.Navigator>
  );
}

export default Profile;
