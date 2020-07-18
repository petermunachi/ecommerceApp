/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
// In App.js in a new project
import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  AsyncStorage,
  StyleSheet
} from 'react-native';
import { NavigationContainer  } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

/* Routes */
import Home from './routes/Home';
import Sell from './routes/Sell';
import Profile from './routes/Profile';
import Notification from './routes/Notification';

/* Screens */
import SignupScreen from './screens/auth/SignupScreen';
import LoginScreen from './screens/auth/LoginScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const App = () =>{

  const [isLoggedIn, setIsLoggedIn] = useState('true');

  useEffect(() => {

    const checkLoggedIn = async () => {
      try {
        const value = await AsyncStorage.getItem('loggedIn');
        if (value !== null) setIsLoggedIn(value);

      } catch (error) {
        console.error(error);
      }

    };
    checkLoggedIn();

  }, [])


  function WishListScreen() {
    return (
      <View style={{ flex: 1,  paddingTop: 70 }}>
        <Text>You have no Item in WishList !</Text>
      </View>
    );
  }


  return (

    <NavigationContainer>    
      {
        isLoggedIn == 'true' ? (

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
            <Tab.Screen name="Notification" component={Notification} />
            <Tab.Screen name = "Sell" component={Sell} />
            <Tab.Screen name="WishList" component={WishListScreen} />
            <Tab.Screen name="Profile" component={Profile} />

          </Tab.Navigator>

        ):(
          <Stack.Navigator initialRouteName="LoginScreen">
            <Stack.Screen 
              name="LoginScreen" 
              component={LoginScreen} 
              options={{ 
                headerShown: false
              }}
            />
            <Stack.Screen 
              name="SignupScreen"
              component={SignupScreen} 
              options={{ 
                headerShown: false
              }}
            />
          </Stack.Navigator>
        )
      }


       
    </NavigationContainer>
   
  );


}

const styles = StyleSheet.create({
  lottie: {
    width: 100,
    height: 100,
  }
});

export default App;

