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

import { product } from '../testData';

import ProductList from '../components/ProductList';



class ProductScreen extends Component {

  state = {
    productDetails: []
  };


  componentDidMount() {
    const { productId } = this.props.route.params;
    const { productName } = this.props.route.params;

    fetch(`/api/product/:${productId}`)
      .then((resp) => resp.json())
      .then(function(data) {
        AsyncStorage.setItem(`${productName.toUpperCase()}DETAILS`, JSON.stringify(product));

      })
      .catch((error) => {
        console.log('Error:', error);
        AsyncStorage.setItem(`${productName.toUpperCase()}DETAILS`, JSON.stringify(product));

      });

    AsyncStorage.getItem(`${productName.toUpperCase()}DETAILS`).then((value)=> this.setState({productDetails: JSON.parse(value)}))
  }

  render () {
    const { productDetails } = this.state;

    return (
      <View style={styles.screen}>

        <Text style={styles.headerPrimary}>PRODUCT SCREEN </Text>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.headerPrimary}> {this.props.route.params.productName} Details </Text>

          <View style={styles.categoryListContainer}>
          {console.log(Object.keys(productDetails))}
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
  }

});
export default ProductScreen;
