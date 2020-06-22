import React from 'react';
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

export default Input;
