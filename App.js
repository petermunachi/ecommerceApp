// In App.js in a new project
import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Entypo } from '@expo/vector-icons';
import HomeScreen from './screens/HomeScreen';
import Home from './routes/Home';




function ProfileScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Profile!</Text>
    </View>
  );
}
function NotificationScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Notification!</Text>
    </View>
  );
}
function SellScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Sell!</Text>
    </View>
  );
}
function WishListScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>WishList!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = focused
                  ? 'md-home'
                  : 'ios-home';
              } else if (route.name === 'Notification') {
                iconName = focused ? 'ios-notifications' : 'ios-notifications-outline';
              } else if (route.name === 'Sell') {
                iconName = focused ? 'ios-add-circle' : 'ios-add-circle-outline';
              } else if (route.name === 'WishList') {
                  iconName = focused ? 'ios-star' : 'ios-star-outline';
              } else if (route.name === 'Profile') {
                iconName = focused ? 'ios-person' : 'md-person';
              }

              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
          }}
        >

        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Notification" component={NotificationScreen} />
        <Tab.Screen name="Sell" component={SellScreen} />
        <Tab.Screen name="WishList" component={WishListScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />

      </Tab.Navigator>
    </NavigationContainer>
  );
}
