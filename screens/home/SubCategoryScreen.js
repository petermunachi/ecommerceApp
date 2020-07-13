import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'

import {
  View,
  Text,
  AsyncStorage,
  ScrollView,
  TouchableWithoutFeedback,
  ActivityIndicator,
  StyleSheet
} from 'react-native';
// import AnimatedLoader from "react-native-animated-loader";

import { productSubCategories } from '../../testData';

import CategoryList from '../../components/CategoryList';



function SubCategoryScreen(props) {

  const [subCategories, setSubCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);



  useEffect(() => {
    const { categoryId, categoryName } = props.route.params;
    
    let item = `${categoryName}subcategories`.replace(/\s/g, "");

    setIsLoading(true);

    fetch(`/api/subCategories/:${categoryId}`)
      .then(response => response.json())
      // eslint-disable-next-line no-unused-vars
      .then(function(data) {
        AsyncStorage.setItem(item, JSON.stringify(data));
        setIsLoading(false);

      })
      .catch((error) => {
        console.log('Error:', error);
        AsyncStorage.setItem(item, JSON.stringify(productSubCategories));
        setIsLoading(false);

      });

    AsyncStorage.getItem(item)
      .then((value) => setSubCategories(JSON.parse(value)))
        


   
  },[])

 

 
  const { categoryName} = props.route.params;

  return (
    <View style={styles.screen}>
      <ActivityIndicator 
        animating={isLoading}
        size="large"
        color="#00ff00"
      />

      <Text style={styles.headerPrimary}>SUB CATEGORIES SCREEN </Text>
      <ScrollView decelerationRate="fast" contentContainerStyle={styles.scrollView}>
        <Text style={styles.headerPrimary}> {categoryName} categories </Text>

        <View style={styles.categoryListContainer}>
          {
          
            subCategories.map((data) =>(
              <TouchableWithoutFeedback
                key={data.id}
                onPress={() => {
                  props.navigation.navigate('ProductsListScreen', {
                    subCategoryId: data.id,
                    subCategoryName: data.name,
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
            ))
          }
        </View>

      </ScrollView>
    </View>
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
    margin: 5,
    width: '100%',
    borderBottomColor: '#e6e6e6',
    borderBottomWidth: 1,
    padding: 8,
  },
  headerPrimary: {
    textAlign: 'center',
    fontSize: 20,
  },
  lottie: {
    width: 100,
    height: 100,
  }

});

SubCategoryScreen.propTypes = {
  route: PropTypes.object,
  navigation: PropTypes.object,
};
export default SubCategoryScreen;
