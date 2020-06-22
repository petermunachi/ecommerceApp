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

import { productSubCategories } from '../testData';

import CategoryList from '../components/CategoryList';
import ProductList from '../components/ProductList';



class SubCategoryScreen extends Component {

  state = {
    subCategories: []
  };


  componentDidMount() {
    const { categoryId } = this.props.route.params;
    const { categoryName } = this.props.route.params;

    fetch(`/api/subCategories/:${categoryId}`)
      .then((resp) => resp.json())
      .then(function(data) {
        AsyncStorage.setItem(`${categoryName.toUpperCase()}SUBCATEGORIES`, JSON.stringify(productSubCategories));

      })
      .catch((error) => {
        console.log('Error:', error);
        AsyncStorage.setItem(`${categoryName.toUpperCase()}SUBCATEGORIES`, JSON.stringify(productSubCategories));

      });

    AsyncStorage.getItem(`${categoryName.toUpperCase()}SUBCATEGORIES`).then((value)=> this.setState({subCategories: JSON.parse(value)}))
  }

  render () {

    return (
      <View style={styles.screen}>

        <Text style={styles.headerPrimary}>SUB CATEGORIES SCREEN </Text>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.headerPrimary}> {this.props.route.params.categoryName} categories </Text>

          <View style={styles.categoryListContainer}>
            {
              this.state.subCategories.map((data, index) =>(
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
  }

});
export default SubCategoryScreen;
