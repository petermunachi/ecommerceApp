import React from 'react';
import {
  Image,
  StyleSheet
} from 'react-native';


function ImageDisplay() {
  return (
    <Image
      style={styles.tinyLogo}
      // eslint-disable-next-line no-undef
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
