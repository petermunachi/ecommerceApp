/* eslint-disable react/display-name */
// In App.js in a new project
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Header from '../components/layout/Header';

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
          headerTitle: props => <Header {...props} />,
         
        }}
      />

      
    </Stack.Navigator>
  );
}

export default Profile;
