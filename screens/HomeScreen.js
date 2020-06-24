import React, {Component} from 'react';
import {
  View,
  Text,
  AsyncStorage,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
  ActivityIndicator,
  StyleSheet
} from 'react-native';

import AnimatedLoader from "react-native-animated-loader";
import * as Network from 'expo-network';
import { productMainCategories, products } from '../testData';

import CategoryList from '../components/CategoryList';
import ProductList from '../components/ProductList';



class HomeScreen extends Component {

  constructor(props){
    super(props);
    this.state = {
        mainCategories: [],
        trendingProducts: [],
        isLoading: false,
    };
  }
  componentDidMount() {
    this.setState({isLoading: true})

    fetch('/api/productCategories')
      .then((resp) =>(resp) => {
          resp.json()
        }
      )
      .then(function(data) {
        AsyncStorage.setItem('PRODUCTMAINCATEGORIES', JSON.stringify(productMainCategories));
        this.setState({isLoading: false})

      })
      .catch((error) => {
        console.log('Error:', error);
        AsyncStorage.setItem('PRODUCTMAINCATEGORIES', JSON.stringify(productMainCategories));
        this.setState({isLoading: false})


      });

    fetch('/api/trendingProducts')
      .then((resp) =>(resp) => {
          resp.json()
        }
      )
      .then(function(data) {
        AsyncStorage.setItem('TRENDINGPRODUCTS', JSON.stringify(products));
        this.setState({isLoading: false})

      })
      .catch((error) => {
        console.log('Error:', error);
        AsyncStorage.setItem('TRENDINGPRODUCTS', JSON.stringify(products));
        this.setState({isLoading: false})

      });

    AsyncStorage.getItem('TRENDINGPRODUCTS').then((value)=> this.setState({trendingProducts: JSON.parse(value)}))
    AsyncStorage.getItem('PRODUCTMAINCATEGORIES').then((value)=> this.setState({mainCategories: JSON.parse(value)}))
    Network.getNetworkStateAsync().then((value)=>{console.log(value) })
  }

  render () {
    const { isLoading, trendingProducts, mainCategories } = this.state;

    const list = trendingProducts.map((data, index) =>(
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

        <Text style={styles.headerPrimary}>HOME SCREEN </Text>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.headerPrimary}>Main Categories </Text>

          <View style={styles.mainCategoryContainer}>
            {mainCategories.map((data, index) =>(
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
  },
  lottie: {
    width: 100,
    height: 100,
  }

});

export default HomeScreen;
