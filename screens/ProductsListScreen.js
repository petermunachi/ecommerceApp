import React, {Component} from 'react';
import {
  View,
  Text,
  AsyncStorage,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
  StyleSheet
} from 'react-native';
import AnimatedLoader from "react-native-animated-loader";

import { products } from '../testData';

import ProductList from '../components/ProductList';



class ProductsListScreen extends Component {

  state = {
    products: [],
    isLoading: false,
  };


  componentDidMount() {
    const { subCategoryId,subCategoryName } = this.props.route.params;
    this.setState({isLoading: true});

    fetch(`/api/productsList/:${subCategoryId}`)
      .then((resp) => resp.json())
      .then(function(data) {
        AsyncStorage.setItem(`${subCategoryName.toUpperCase()}PRODUCTS`, JSON.stringify(products));
        this.setState({isLoading: false});


      })
      .catch((error) => {
        console.log('Error:', error);
        AsyncStorage.setItem(`${subCategoryName.toUpperCase()}PRODUCTS`, JSON.stringify(products));
        this.setState({isLoading: false});

      });

    AsyncStorage.getItem(`${subCategoryName.toUpperCase()}PRODUCTS`).then((value)=> this.setState({products: JSON.parse(value)}))
  }

  render () {
    const { isLoading, products} = this.state;
    const { subCategoryName} = this.props.route.params;

    const list = products.map((data, index) =>(
      <TouchableWithoutFeedback
        key={data.id}
        onPress={() => {
          this.props.navigation.navigate('ProductScreen', {
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
            navigation={this.props.navigation}
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

        <Text style={styles.headerPrimary}>PRODUCTS LISTS SCREEN </Text>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.headerPrimary}> {subCategoryName} products </Text>

          <View style={styles.categoryListContainer}>
            {list}
          </View>

        </ScrollView>
      </View>
    );
  }
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
export default ProductsListScreen;
