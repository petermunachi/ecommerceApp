import React, { useState, useEffect } from 'react';
import {
  Image,
  StyleSheet
} from 'react-native';


function ImageDisplay(props) {
  return (
    <Image {...props} style={{...styles.logo, ...props.style}} />
  )
}

const styles = StyleSheet.create({

  mainCategory: {
    margin: 10,
  },
  
  logo: {
    width: '100%',
    height: '100%',
  },

});

export default ImageDisplay;
