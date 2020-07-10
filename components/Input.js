import React from 'react';
import PropTypes from 'prop-types';

import {
  TextInput,
  StyleSheet
} from 'react-native';

function Input(props) {
  return (
    <TextInput {...props} style={{...props.style, ...styles.input}}/>
  )
}

const styles = StyleSheet.create({

  input: {
    height: 40,
    width: '100%',
    
  }

});

Input.propTypes = {
  style: PropTypes.object,
};

export default Input;
