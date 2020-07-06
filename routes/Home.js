/* eslint-disable react/display-name */
// In App.js in a new project
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';


import Header from '../components/layout/Header';

//SCREENS
import HomeScreen from '../screens/home/HomeScreen';
import SubCategoryScreen from '../screens/home/SubCategoryScreen';
import ProductsListScreen from '../screens/home/ProductsListScreen';
import ProductScreen from '../screens/home/ProductScreen';

const Stack = createStackNavigator();

function Home() {

  return (
    < Stack.Navigator headerMode={'float'} mode={ "modal" } initialRouteName={ "HomeScreen" } >

      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ 
          headerTitle: props => <Header {...props} />,
         
        }}
      />

      <Stack.Screen
        name="SubCategoryScreen"
        component={SubCategoryScreen}
        options={{ headerTitle: props => <Header {...props} /> }}
      />

      <Stack.Screen
        name="ProductsListScreen"
        component={ProductsListScreen}
        options={{ headerTitle: props => <Header {...props} /> }}
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
