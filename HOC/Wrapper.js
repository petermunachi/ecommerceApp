import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import {
  StyleSheet,
  AsyncStorage
} from 'react-native';

import LoginScreen from '../screens/auth/LoginScreen';
import SignupScreen from '../screens/auth/SignupScreen';


function Wrapper(props) {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {

        const value = await AsyncStorage.getItem('loggedIn');
        if (value !== null) {
            // We have data!!
            // console.log(value);
            setIsOnline(value);
        }
      } catch (error) {
        // Error retrieving data
      }
    };

    checkLoggedIn();
  }, [isOnline, props])

  const activateLoginHandler = (status) => {
    setIsOnline(status)
  }

  return (
    <>
      
    </>
  );
}

const styles = StyleSheet.create({
  
});

Wrapper.propTypes = {
  children: PropTypes.object,
};

export default Wrapper;
