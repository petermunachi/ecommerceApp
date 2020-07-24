/* eslint-disable react/display-name */
// In App.js in a new project
import React from 'react';
import { createStackNavigator, HeaderBackButton  } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';



import Header from '../components/layout/Header';
import Constants from '../Constants/constants';

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
          headerShown: false,
          // headerTitle: props => <Header {...props} title='Sell' />,
          // // headerTransparent: true,
          // headerStatusBarHeight: Constants.statusBarHeight,
          // headerBackground: () => (
          //   <LinearGradient
          //     colors = {
          //       [Constants.headerPrimaryGradient, Constants.headerSecondaryGradient]
          //     }
          //     locations = {[0, 0.8]}
          //     start={[0, 0]}
          //     end={[0, 0.2]}
          //     style={{
          //       flex: 1,
          //       // justifyContent: 'center',
          //     }}
          //   />
          // ),
         
        }}
      />

      <Stack.Screen
        name="StateScreen"
        component={StateScreen}
        options={{
           headerShown: false,
          // headerTitle: props => <Header {...props} />,
          // headerLeft: (props) => (
          //   <HeaderBackButton
          //     {...props}
          //     onPress={() => {
          //       // Do something
          //       navigation.navigate('SellScreen')
                
          //     }}
          //   />
          // ),

        }}
      />

      <Stack.Screen
        name = "LGAScreen"
        component={LGAScreen}
        options={{
          headerShown: false,
          // headerTitle: props => <Header {...props} />,
          // headerLeft: (props) => (
          //   <HeaderBackButton
          //     {...props}
          //     onPress={() => {
          //       // Do something
          //       navigation.navigate('StateScreen')
                
          //     }}
          //   />
          // ),
        }}
      />

      
    </Stack.Navigator>
  );
}

export default Sell;
