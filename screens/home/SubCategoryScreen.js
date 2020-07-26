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
import Header from '../../components/layout/Header';
import CustomConstants from '../../Constants/constants';





function SubCategoryScreen(props) {

  const [subCategories, setSubCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);



  useEffect(() => {
    const { categoryId, categoryName } = props.route.params;
    

    setIsLoading(true);
    // console.log(categoryId);

    fetch(`http://${CustomConstants.host}:3000/shoppay/get_subcategory/${categoryId}`)
      .then(response => response.json())
      // eslint-disable-next-line no-unused-vars
      .then(function(data) {
        setSubCategories(data);
        console.log(data);
        setIsLoading(false);

      })
      .catch((error) => {
        console.log('Error:', error);
        setIsLoading(false);

      });

  
   
  },[])

 

 
  const { categoryName} = props.route.params;

  return (
    <>
    <Header title={categoryName} />
    <View style={styles.screen}>
      {
        isLoading ?
            <View style={styles.loading}>
              <ActivityIndicator 
                  animating={isLoading}
                  size={70}
                  color = "rgb(153, 0, 115)"
              />
            </View>
        
        : null
      }

      <ScrollView decelerationRate="fast" contentContainerStyle={styles.scrollView}>

        <View style={styles.categoryListContainer}>
          {
          
            subCategories.map((data) =>(
              <TouchableWithoutFeedback
                key={data._id}
                onPress={() => {
                  props.navigation.navigate('ProductsListScreen', {
                    subCategoryId: data.id,
                    subCategoryName: data.name,
                  });
                }}
              >
                <View style={styles.categoryContainer}>
                  <Text style={styles.headerPrimary}>{data.name}</Text>
                </View>
              </TouchableWithoutFeedback>
            ))
          }
        </View>

      </ScrollView>
    </View>
    </>
  );
  
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  scrollView: {
    marginTop: 0,
    paddingBottom: "50%",
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "rgba(191, 189, 189, 0.50)",
    zIndex: 100,
  },
  categoryListContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 0,
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
    textAlign: 'left',
    fontSize: 18,
    textTransform: "capitalize",
  }

});

SubCategoryScreen.propTypes = {
  route: PropTypes.object,
  navigation: PropTypes.object,
};
export default SubCategoryScreen;
