
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
import IndexScreen from './screens/IndexScreen';

import {AuthContext} from './utils'


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const App = () =>{

  // const [isLoggedIn, setIsLoggedIn] = useState('');
  // const [loading, setLoading] = useState(true);

  

  function WishListScreen() {
    return (
      <View style={{ flex: 1,  paddingTop: 70 }}>
        <Text>You have no Item in WishList !</Text>
      </View>
    );
  }
  function AuthTab() {
    return (
      <Stack.Navigator>
        <Stack.Screen 
          name="LoginScreen" 
          component={LoginScreen} 
          options={{ 
            animationTypeForReplace: state.isSignout ? 'pop' : 'push',
            headerShown: false,
            tabBarVisible: false
          }}
        />
        <Stack.Screen 
          name="SignupScreen"
          component={SignupScreen} 
          options={{ 
            headerShown: false,
            tabBarVisible: false
          }}
        />
        

      </Stack.Navigator>

    );
  }

    const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userLoggedIn: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':

          if (action.token) {
            AsyncStorage.setItem('loggedIn', JSON.stringify(action.token));
          }
          return {
            ...prevState,
            isSignout: false,
            userLoggedIn: action.token,
          };
        case 'SIGN_OUT':
          AsyncStorage.removeItem('loggedIn')
          AsyncStorage.removeItem('city')
          return {
            ...prevState,
            isSignout: true,
            userLoggedIn: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userLoggedIn: null,
    }
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userLoggedIn;

      try {
        userLoggedIn = await AsyncStorage.getItem('loggedIn');
        // console.log(userLoggedIn);
      } catch (e) {
        // Restoring token failed
      }

     
      dispatch({ type: 'RESTORE_TOKEN', token: userLoggedIn });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        console.log("sign in", data);

        dispatch({ type: 'SIGN_IN', token: data });
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
     
    }),
    []
  );


  return (

    <AuthContext.Provider value={authContext}> 

      <NavigationContainer>   
     
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

        // initialRouteName={"Home"}

      >
        { state.isLoading == true ? (
            <Tab.Screen name="IndexScreen" component={IndexScreen} 
              options={{ 
                headerShown: false,
                tabBarVisible: false
              }}
            />

        ): state.userLoggedIn == null ? (

          <Tab.Screen name="Auth" component={AuthTab} 
            options={{ 
              headerShown: false,
              tabBarVisible: false
            }}
          />

        ):(
          <>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Notification" component={Notification} />
            <Tab.Screen name = "Sell" component={Sell} />
            <Tab.Screen name="WishList" component={WishListScreen} />
            <Tab.Screen name="Profile" component={Profile} />
          </>
        ) }

      </Tab.Navigator>

      </NavigationContainer>
       
    </AuthContext.Provider>
   
  );


}

const styles = StyleSheet.create({
  lottie: {
    width: 100,
    height: 100,
  }
});

export default App;

