/* eslint-disable react/display-name */
// In App.js in a new project
import React from 'react';
import { createStackNavigator, HeaderBackButton  } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import Header from '../components/layout/Header';

//SCREENS
import SellScreen from '../screens/sell/SellScreen';
import StateScreen from '../screens/sell/StateScreen';
import LGAScreen from '../screens/sell/LGAScreen';

const Stack = createStackNavigator();

function Sell() {

  const navigation = useNavigation();
  
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
        name="StateScreen"
        component={StateScreen}
        options={{
          headerTitle: props => <Header {...props} />,
          headerLeft: (props) => (
            <HeaderBackButton
              {...props}
              onPress={() => {
                // Do something
                navigation.navigate('SellScreen')
                
              }}
            />
          ),
        }}
      />

      <Stack.Screen
        name = "LGAScreen"
        component={LGAScreen}
        options={{
          headerTitle: props => <Header {...props} />,
          headerLeft: (props) => (
            <HeaderBackButton
              {...props}
              onPress={() => {
                // Do something
                navigation.navigate('StateScreen')
                
              }}
            />
          ),
        }}
      />

      
    </Stack.Navigator>
  );
}

export default Sell;
