import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'

import {
  View,
  Text,
  AsyncStorage,
  ScrollView,
  TouchableWithoutFeedback,
  StyleSheet
} from 'react-native';
// import AnimatedLoader from "react-native-animated-loader";

import { products } from '../../testData';

import ProductList from '../../components/ProductList';



function ProductsListScreen(props) {

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const { subCategoryId, subCategoryName } = props.route.params;

    setIsLoading(true);

    let itemKey = `${subCategoryName}products`.replace(/\s/g, "");

    fetch(`/api/productsList/:${subCategoryId}`)
      .then((resp) => resp.json())
      // eslint-disable-next-line no-unused-vars
      .then(function(data) {
        AsyncStorage.setItem(itemKey, JSON.stringify(data));
        setIsLoading(false);

      })
      .catch((error) => {
        console.log('Error:', error);
        AsyncStorage.setItem(itemKey, JSON.stringify(products));
        setIsLoading(false);

      });

    AsyncStorage.getItem(itemKey)
      .then((value) => setItems(JSON.parse(value)))

  },[])

  const { subCategoryName} = props.route.params;

  const list = items.map((data) =>(
    <TouchableWithoutFeedback
      key={data.id}
      onPress={() => {
        props.navigation.navigate('ProductScreen', {
          productId: data.id,
          productName: data.model || data.title,
        });
      }}
    >
      <View style={styles.categoryContainer}>
        <ProductList
          name={data.model || data.title}
          price={data.price}
          location={data.region}
          photo={data.photo[0]}
          phoneNumber={data.sellerPhoneNumber}
          navigation={props.navigation}
        />
      </View>
    </TouchableWithoutFeedback>
  ))


  return (
    <View style={styles.screen}>

      {/* <AnimatedLoader
        visible={isLoading}
        overlayColor="rgba(255,255,255,0.75)"
        animationStyle={styles.lottie}
        speed={1}
      /> */}

      <Text style={styles.headerPrimary}>PRODUCTS LISTS SCREEN </Text>
      <ScrollView decelerationRate="fast" contentContainerStyle={styles.scrollView}>
        <Text style={styles.headerPrimary}> {subCategoryName} products </Text>

        <View style={styles.categoryListContainer}>
          {list}
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

ProductsListScreen.propTypes = {
  route: PropTypes.object,
  navigation: PropTypes.object,
};
export default ProductsListScreen;
