import React from 'react';
import {
  Image,
  StyleSheet
} from 'react-native';


function ImageDisplay(props) {
  return (
    <Image
      style={styles.tinyLogo}
      source={require('../assets/icon.png')}
    />
  )
}

const styles = StyleSheet.create({

  mainCategory: {
    margin: 10,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  logo: {
    width: 66,
    height: 58,
  },

});

export default ImageDisplay;
