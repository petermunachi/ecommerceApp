/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import {
  View,
  Text,
  AsyncStorage,
  ScrollView,
  TouchableWithoutFeedback,
  StyleSheet
} from 'react-native';

import AnimatedLoader from "react-native-animated-loader";
import { productMainCategories, products } from '../../testData';

import CategoryList from '../../components/CategoryList';
import ProductList from '../../components/ProductList';



function HomeScreen (props) {

  const [mainCategories, setMainCategories] = useState([]);
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

 
useEffect(() => {

  fetch('/api/productCategories')
    .then(response => response.json())
    .then((data) => {
      AsyncStorage.setItem('productmaincategories', JSON.stringify(data));
      // setMainCategories(productMainCategories)
    })
    .catch(err => {
      console.log('Error', err);
      AsyncStorage.setItem('productmaincategories', JSON.stringify(productMainCategories));
      // setMainCategories(productMainCategories)
    });

  fetch('/api/trendingProducts')
    .then(response => response.json())
    .then((data) => {
      AsyncStorage.setItem('trendingProducts', JSON.stringify(data));
      // setMainCategories(productMainCategories)
    })
    .catch(err => {
      console.log('Error', err);
      AsyncStorage.setItem('trendingProducts', JSON.stringify(products));
      // setMainCategories(productMainCategories)
    });

  AsyncStorage.getItem('productmaincategories')
    .then((value) => setMainCategories(JSON.parse(value)))

  AsyncStorage.getItem('trendingProducts')
    .then((value) => setTrendingProducts(JSON.parse(value)))


    
  

}, []);
  

    const list = trendingProducts.map((data) =>(
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

        <AnimatedLoader
          visible={isLoading}
          overlayColor="rgba(255,255,255,0.75)"
          animationStyle={styles.lottie}
          speed={1}
        />

        <Text style={styles.headerPrimary}>HOME SCREEN </Text>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.headerPrimary}>Main Categories </Text>

          <View style={styles.mainCategoryContainer}>
            {console.log(trendingProducts)
            }
            {mainCategories.map((data) =>(
              <TouchableWithoutFeedback
                key={data.id}
                onPress={() => {
                  props.navigation.navigate('SubCategoryScreen', {
                    categoryId: data.id,
                    categoryName: data.name,
                  });
                }}
              >
                <View style={styles.categoryContainer}>
                  <CategoryList
                    id={data.id}
                    name={data.name}
                  />
                </View>
              </TouchableWithoutFeedback>
            ))}
          </View>
          <Text style={styles.headerPrimary}>Trending Products </Text>
          <View style={styles.mainCategoryContainer}>
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
  categoryContainer: {
    margin: 10,
  },
  scrollView: {
    marginTop: 20,
  },
  mainCategoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
    marginBottom: 10
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


HomeScreen.propTypes = {
  navigation: PropTypes.object,
};
export default HomeScreen;
