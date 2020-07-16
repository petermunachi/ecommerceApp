/* eslint-disable react/display-name */
// In App.js in a new project
import React, {useState} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';


import Header from '../components/layout/Header';
import Constants from '../Constants/constants';

//SCREENS
import HomeScreen from '../screens/home/HomeScreen';
import SubCategoryScreen from '../screens/home/SubCategoryScreen';
import ProductsListScreen from '../screens/home/ProductsListScreen';
import ProductScreen from '../screens/home/ProductScreen';


const Stack = createStackNavigator();

function Home() {
  

  return (
    <Stack.Navigator headerMode={'float'} mode={ "modal" } initialRouteName={"HomeScreen"} >

      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ 
          headerTitle: props => <Header {...props} title='Home' />,
          // headerTransparent: true,
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

      <Stack.Screen
        name="SubCategoryScreen"
        component={SubCategoryScreen}
        options={{ headerTitle: props => <Header {...props} title='Sub-Category' />,
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

      <Stack.Screen
        name="ProductsListScreen"
        component={ProductsListScreen}
        options={{
          headerTitle: props => <Header {...props} title="Products List" />,
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

      <Stack.Screen
        name="ProductScreen"
        component={ProductScreen}
        options={{ headerTitle: props => <Header {...props} /> }}
      />
      

    </Stack.Navigator>
  );
}

export default Home;
