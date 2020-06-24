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


import { product } from '../testData';

import ProductList from '../components/ProductList';



class ProductScreen extends Component {

  state = {
    productDetails: [],
    isLoading: false,
  };


  componentDidMount() {
    const { productId, productName } = this.props.route.params;
    this.setState({isLoading: true});

    fetch(`/api/product/:${productId}`)
      .then((resp) => resp.json())
      .then(function(data) {
        AsyncStorage.setItem(`${productName.toUpperCase()}DETAILS`, JSON.stringify(product));
        this.setState({isLoading: false});

      })
      .catch((error) => {
        console.log('Error:', error);
        AsyncStorage.setItem(`${productName.toUpperCase()}DETAILS`, JSON.stringify(product));
        this.setState({isLoading: false});

      });

    AsyncStorage.getItem(`${productName.toUpperCase()}DETAILS`).then((value)=> this.setState({productDetails: JSON.parse(value)}))
  }

  render () {
    const { productDetails, isLoading } = this.state;
    const { productName } = this.props.route.params;

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
