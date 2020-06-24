import React from 'react';
import PropTypes from 'prop-types';

import {
  TextInput,
  StyleSheet
} from 'react-native';

function Input(props) {
  return (
    <TextInput {...props} style={{...styles.input, ...props.input}}/>
  )
}

const styles = StyleSheet.create({

  input: {
    height: 50,
    borderColor: 'grey',
    borderWidth: 1,
    marginVertical: 10
  }

});

Input.propTypes = {
  input: PropTypes.object,
};

export default Input;
