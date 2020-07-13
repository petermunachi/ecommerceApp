/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
// In App.js in a new project
import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { NavigationContainer  } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

/*Screens */
import Home from './routes/Home';
import Sell from './routes/Sell';
import Profile from './routes/Profile';
import Notification from './routes/Notification';
import IndexScreen from './screens/IndexScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const App = () => {

  const [firstLoad, setFirstLoad] = useState(true)


  function WishListScreen() {
    return (
      <View style={{ flex: 1,  paddingTop: 70 }}>
        <Text>You have no Item in WishList !</Text>
      </View>
    );
  }


  useEffect(() => {
    if (firstLoad) {
      setTimeout(() => {
        setFirstLoad(false)
      }, 5000);
      
    }
    
  }, [firstLoad])

  

  
  return (

    <NavigationContainer>    
    
      {
        firstLoad == false ? (<Tab.Navigator
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

            </Tab.Navigator>)


        : (
            <Stack.Navigator>
              <Stack.Screen 
                name="Index" 
                component={IndexScreen}
                options={{ 
                  headerShown: false,
         
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

