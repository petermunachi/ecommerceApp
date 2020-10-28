import React from 'react';
import PropTypes from 'prop-types';

import {
  Text,
  View,
  StyleSheet
} from 'react-native';

import ImageDisplay from '../components/ImageDisplay';

function ProductList(props) {
  return (
    <View style={styles.mainCategory}>
      <Text>Product Name: {props.name}</Text>
      <Text>Product Price: {props.price}</Text>
      <Text>Product Location: {props.location}</Text>
      <Text>Seller Phone Number: {props.phoneNumber}</Text>
      <Text>Product Photo: {props.photo}</Text>

      <ImageDisplay
        style={styles.tinyLogo}
        // eslint-disable-next-line no-undef
        source={require('../assets/splash.png')}
      />

    </View>
  )
}

const styles = StyleSheet.create({

  mainCategory: {
    margin: 10,
    backgroundColor: '#eee',
    width: '100%'
  }

});

ProductList.propTypes = {
  name: PropTypes.string,
  price: PropTypes.string,
  location: PropTypes.string,
  phoneNumber: PropTypes.string,
  photo: PropTypes.string,
};

export default ProductList;
