import React from 'react';
import PropTypes from 'prop-types';

import {
  TextInput,
  StyleSheet
} from 'react-native';

function Input(props) {
  return (
    <TextInput {...props} style={{...styles.input, ...props.style}}/>
  )
}

const styles = StyleSheet.create({

  input: {
    height: 40,
    width: '100%',
    borderColor: '#d3d3d3',
    borderWidth: 1,
    marginVertical: 12
  }

});

Input.propTypes = {
  style: PropTypes.object,
};

export default Input;
