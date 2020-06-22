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

import { productMainCategories, products } from '../testData';

import CategoryList from '../components/CategoryList';
import ProductList from '../components/ProductList';



class HomeScreen extends Component {

  constructor(props){
    super(props);
    this.state = {
        mainCategories: [],
        trendingProducts: [],
    };
  }
  componentDidMount() {
    fetch('/api/productCategories')
      .then((resp) => resp.json())
      .then(function(data) {
        AsyncStorage.setItem('PRODUCTMAINCATEGORIES', JSON.stringify(productMainCategories));

      })
      .catch((error) => {
        console.log('Error:', error);
        AsyncStorage.setItem('PRODUCTMAINCATEGORIES', JSON.stringify(productMainCategories));

      });

    fetch('/api/trendingProducts')
      .then((resp) => resp.json())
      .then(function(data) {
        AsyncStorage.setItem('TRENDINGPRODUCTS', JSON.stringify(products));

      })
      .catch((error) => {
        console.log('Error:', error);
        AsyncStorage.setItem('TRENDINGPRODUCTS', JSON.stringify(products));

      });

    AsyncStorage.getItem('TRENDINGPRODUCTS').then((value)=> this.setState({trendingProducts: JSON.parse(value)}))
    AsyncStorage.getItem('PRODUCTMAINCATEGORIES').then((value)=> this.setState({mainCategories: JSON.parse(value)}))
  }

  render () {

    const list = this.state.trendingProducts.map((data, index) =>(
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

        <Text style={styles.headerPrimary}>HOME SCREEN </Text>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.headerPrimary}>Main Categories </Text>
          <View style={styles.mainCategoryContainer}>
            {this.state.mainCategories.map((data, index) =>(
              <TouchableWithoutFeedback
                key={data.id}
                onPress={() => {
                  this.props.navigation.navigate('SubCategoryScreen', {
                    categoryId: data.id,
                    categoryName: data.categoryName,
                  });
                }}
              >
                <View style={styles.categoryContainer}>
                  <CategoryList
                    id={data.id}
                    name={data.categoryName}
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
  }

});
export default HomeScreen;
