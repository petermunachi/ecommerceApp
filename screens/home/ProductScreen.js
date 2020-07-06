import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'

import {
  View,
  Text,
  AsyncStorage,
  ScrollView,
  StyleSheet,
} from 'react-native';

import AnimatedLoader from "react-native-animated-loader";
import { product } from '../../testData';

function ProductScreen (props) {

  const [productDetails, setProductDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  

  useEffect(() => {
    const { productId, productName } = props.route.params;
    setIsLoading(true);

    let item = `${productName}details`.replace(/\s/g, "");

    fetch(`/api/product/:${productId}`)
      .then((resp) => resp.json())
      // eslint-disable-next-line no-unused-vars
      .then(function(data) {
        AsyncStorage.setItem(item, JSON.stringify(data));
        setIsLoading(false);

      })
      .catch((error) => {
        console.log('Error:', error);
        AsyncStorage.setItem(item, JSON.stringify(product));
        setIsLoading(false);

      });

    AsyncStorage.getItem(item)
      .then((value) => setProductDetails(JSON.parse(value)))

  },[])


  const { productName } = props.route.params;

  return (
    <View style={styles.screen}>
      <AnimatedLoader
        visible={isLoading}
        overlayColor="rgba(255,255,255,0.75)"
        animationStyle={styles.lottie}
        speed={1}
      />
      <Text style={styles.headerPrimary}>PRODUCT SCREEN </Text>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.headerPrimary}> {productName} Details </Text>

        <View style={styles.categoryListContainer}>
        {console.log(Object.keys(productDetails))}
        </View>

      </ScrollView>
    </View>
  );

}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  scrollView: {
    marginTop: 20,
  },
  categoryListContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
    marginBottom: 10
  },
  categoryContainer: {
    margin: 10,
    width: '100%',
  },
  headerPrimary: {
    textAlign: 'center',
    fontSize: 20
  },
  lottie: {
    width: 100,
    height: 100,
  }

});

ProductScreen.propTypes = {
  route: PropTypes.object,
  productId: PropTypes.number,
  productName: PropTypes.string,
};

export default ProductScreen;
