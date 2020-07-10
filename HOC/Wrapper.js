import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import {
  Text,
  StyleSheet,
  AsyncStorage
} from 'react-native';

import LoginScreen from '../screens/auth/LoginScreen';



function Wrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState('true');

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {

        const value = await AsyncStorage.getItem('loggedIn');
        if (value !== null) {
            // We have data!!
            console.log(value);
            setIsLoggedIn(value);
        }
      } catch (error) {
        // Error retrieving data
      }
    };

    checkLoggedIn();
  }, [isLoggedIn, props])

  const activateLoginHandler = (status) => {
    setIsLoggedIn(status)
  }


  return (
    <>
      {
        isLoggedIn == 'true' ? props.children : <LoginScreen onLogIn={activateLoginHandler} />
      }
    </>
  );
}

const styles = StyleSheet.create({
  
});

Wrapper.propTypes = {
  children: PropTypes.object,
};

export default Wrapper;
