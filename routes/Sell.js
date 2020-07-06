/* eslint-disable react/display-name */
// In App.js in a new project
import React from 'react';
import { createStackNavigator  } from '@react-navigation/stack';


import Header from '../components/layout/Header';

//SCREENS
import SellScreen from '../screens/sell/SellScreen';
import ListScreen from '../screens/sell/ListScreen';

const Stack = createStackNavigator();

function Sell() {
  
  return (
    <Stack.Navigator headerMode={'float'} mode={ "modal" } initialRouteName={"SellScreen" } >

      <Stack.Screen
        name="SellScreen"
        component={SellScreen}
        options={{ 
          headerTitle: props => <Header {...props} />,
         
        }}
      />

      <Stack.Screen
        name="ListScreen"
        component={ListScreen}
        options={{
          headerTitle: props => <Header {...props} />,
        }}
      />

      
    </Stack.Navigator>
  );
}

export default Sell;
