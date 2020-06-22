// In App.js in a new project
import React, {useState, useEffect} from 'react';
import { View, Text, Button, AsyncStorage } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Header from '../components/layout/Header';

//SCREENS
import HomeScreen from '../screens/HomeScreen';
import SubCategoryScreen from '../screens/SubCategoryScreen';
import ProductsListScreen from '../screens/ProductsListScreen';
import ProductScreen from '../screens/ProductScreen';



const Stack = createStackNavigator();


function Home() {
  const [initialRoute, setInitialRoute] = useState('HomeScreen');

  const readData = async () => {
    try {
      const value = await AsyncStorage.getItem('FIRSTROUTE')

      if (value === null) {
        setInitialRoute('Details');

        setTimeout(function () {
          setInitialRoute('Home');
        }, 3000)
      }
    } catch (e) {
      console.log('hadjkhdkjhdk');
      console.log(e);
      alert(e)
    }
  }


  useEffect(() => {
    readData()
  }, [])

  return (
    <Stack.Navigator initialRouteName={initialRoute}>

      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerTitle: props => <Header {...props} /> }}
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
