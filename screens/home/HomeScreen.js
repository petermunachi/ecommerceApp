/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Constants from '../../Constants/constants';


import {
  View,
  Text,
  AsyncStorage,
  ScrollView,
  TouchableWithoutFeedback,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  FlatList,
  Button,
} from 'react-native';


// import AnimatedLoader from "react-native-animated-loader";
import { productMainCategories, products } from '../../testData';

import CategoryList from '../../components/CategoryList';
import ProductList from '../../components/ProductList';
import ProductCard from '../../components/ProductCard';



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
      <>

      <SafeAreaView  style={styles.screen}>
        <StatusBar barStyle="dark-content" 
          backgroundColor={Constants.statusBarColor} 
        />

       
        <View style={styles.topContainer}>
          <View>
            <Text style={styles.headerSecondary}>Categories (224) </Text>
          </View>

          <View style={styles.buttonContainer}>

            <View style={styles.button}>
              <Button color="rgb(255, 128, 128)" title="All" />
            </View>

            <View style={styles.button}>
              <Button color="lightgray" title="Fashion" />
            </View>

            <View style={styles.more}>
              <Text style={styles.textUnderline}>See All</Text>
            </View>
          </View>
         <View>
            <Text style={styles.headerPrimary}>Trending</Text>
          </View>

        </View>
        <FlatList
          keyExtractor={(item, index) => index}
          data={trendingProducts}
          renderItem={ itemData =>  <ProductCard 
              productTitle={itemData.item.title}
              productDescription={itemData.item.description}
              productPrice={itemData.item.price}
              productLocation={itemData.item.region}
              navigation={props.navigation}
            />
          }
        />

          
      </SafeAreaView>
      </>
    );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: Constants.scrollViewHorizontal,
    marginTop: StatusBar.currentHeight+50 || 0,

  },
  textUnderline: {
    color: Constants.darkGray,
    textTransform: "capitalize",
    textDecorationLine: "underline",
    fontWeight: "bold",
    fontSize: 15,
  },
  scrollView: {
    // marginHorizontal: Constants.scrollViewHorizontal,
      
  },
  topContainer: {
    marginLeft: -60,
    padding: 0,
  },
  
  marginBottomMedium:{
    marginBottom: 8,
  },
  marginVerticalMedium: {
    marginVertical: 20,
  },
  headerPrimary: {
    textAlign: 'left',
    fontSize: 21,
    fontWeight: "bold",
    color: Constants.darkGray,
    textTransform: 'capitalize',
  },
  headerSecondary: {
    textAlign: 'left',
    fontSize: 17,
    fontWeight: "bold",
    color: Constants.lightGray,
    textTransform: 'capitalize',
  },
 
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    marginVertical: 18,

  },
  button: {
    width: 80,
    marginRight: 25,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 8,
  },
  more: {
    marginTop: 12,
    marginBottom: 0,
  }
  

});


HomeScreen.propTypes = {
  navigation: PropTypes.object,
};
export default HomeScreen;
