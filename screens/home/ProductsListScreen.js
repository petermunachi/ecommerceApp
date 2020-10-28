import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'

import {
  View,
  Text,
  AsyncStorage,
  TouchableWithoutFeedback,
  TouchableNativeFeedback,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  VirtualizedList,
  FlatList,
  Button,
} from 'react-native';

import { products } from '../../testData';

import ProductList from '../../components/ProductList';
import Header from '../../components/layout/Header';
import ProductCard from '../../components/ProductCard';
import CustomConstants from '../../Constants/constants';






function ProductsListScreen(props) {

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const { subCategoryId, subCategoryName } = props.route.params;

    setIsLoading(true);

    let itemKey = `${subCategoryName}products`.replace(/\s/g, "");
    console.log(subCategoryId);

    fetch(`http://${CustomConstants.host}:3000/shoppay/product_list/${subCategoryId}`)
      .then((resp) => resp.json())
      // eslint-disable-next-line no-unused-vars
      .then(function(data) {
        console.log(data);
        AsyncStorage.setItem(itemKey, JSON.stringify(data));
        setIsLoading(false);

      })
      .catch((error) => {
        console.log('Error:', error);
        // AsyncStorage.setItem(itemKey, JSON.stringify(products));
       
        setIsLoading(false);

      });

      AsyncStorage.getItem(itemKey)
        .then((value) => setItems(JSON.parse(value)))


    
  },[])

  const { subCategoryName} = props.route.params;

 

  return (
    <>
    <Header title={"Product Lists"} />
      <SafeAreaView  style={styles.screen}>
        <StatusBar barStyle="dark-content" 
          backgroundColor={CustomConstants.statusBarColor} 
        />
        <FlatList

          ListEmptyComponent={
            <>
              <Text>Loading products</Text>
            </>
          }
          keyExtractor={(item, index) => index}
          data={items}
          renderItem={ itemData =>  <ProductCard 
            productTitle={itemData.item.title}
            productDescription={itemData.item.description}
            productPrice={itemData.item.price}
            productLocation={itemData.item.location}
            productPictures={itemData.item.picture}
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
