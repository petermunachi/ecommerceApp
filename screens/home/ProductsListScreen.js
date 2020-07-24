import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'

import {
  View,
  Text,
  AsyncStorage,
  ScrollView,
  TouchableWithoutFeedback,
  ActivityIndicator,
  StyleSheet
} from 'react-native';

import { products } from '../../testData';

import ProductList from '../../components/ProductList';
import Header from '../../components/layout/Header';




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
        AsyncStorage.getItem(itemKey)
          .then((value) => setItems(JSON.parse(value)))

        setIsLoading(false);

      });

    
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
    <>
    <Header title={"Product Lists"} />
    <View style={styles.screen}>

      <ActivityIndicator 
        animating={isLoading}
        size="large"
        color="#00ff00"
      />

      <Text style={styles.headerPrimary}>PRODUCTS LISTS SCREEN </Text>
      <ScrollView decelerationRate="fast" contentContainerStyle={styles.scrollView}>
        <Text style={styles.headerPrimary}> {subCategoryName} products </Text>

        <View style={styles.categoryListContainer}>
          {list}
        </View>

      </ScrollView>
    </View>
    </>
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
