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

import { productSubCategories } from '../testData';

import CategoryList from '../components/CategoryList';
import ProductList from '../components/ProductList';



class SubCategoryScreen extends Component {

  state = {
    subCategories: [],
    isLoading: false,
  };


  componentDidMount() {
    const { categoryId, categoryName } = this.props.route.params;

    this.setState({isLoading: true});

    fetch(`/api/subCategories/:${categoryId}`)
      .then((resp) => {
          return resp.json()
        }
      )
      .then(function(data) {
        AsyncStorage.setItem(`${categoryName.toUpperCase()}SUBCATEGORIES`, JSON.stringify(productSubCategories));
        this.setState({isLoading: false})

      })
      .catch((error) => {
        console.log('Error:', error);
        AsyncStorage.setItem(`${categoryName.toUpperCase()}SUBCATEGORIES`, JSON.stringify(productSubCategories));
        this.setState({isLoading: false})

      });

    AsyncStorage.getItem(`${categoryName.toUpperCase()}SUBCATEGORIES`).then((value)=> this.setState({subCategories: JSON.parse(value)}))
  }

  render () {
    const { isLoading, subCategories } = this.state;
    const { categoryName} = this.props.route.params;

    return (
      <View style={styles.screen}>
        <AnimatedLoader
          visible={isLoading}
          overlayColor="rgba(255,255,255,0.75)"
          animationStyle={styles.lottie}
          speed={1}
        />

        <Text style={styles.headerPrimary}>SUB CATEGORIES SCREEN </Text>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.headerPrimary}> {categoryName} categories </Text>

          <View style={styles.categoryListContainer}>
            {
              subCategories.map((data, index) =>(
                <TouchableWithoutFeedback
                  key={data.id}
                  onPress={() => {
                    this.props.navigation.navigate('ProductsListScreen', {
                      subCategoryId: data.id,
                      subCategoryName: data.subCategoryName,
                    });
                  }}
                >
                  <View style={styles.categoryContainer}>
                    <CategoryList
                      id={data.id}
                      name={data.subCategoryName}
                    />
                  </View>
                </TouchableWithoutFeedback>
              ))
            }
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
  categoryContainer: {
    margin: 10,
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
export default SubCategoryScreen;
