/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import {AuthContext} from '../../utils'


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
  RefreshControl,
  FlatList,
  Button,
} from 'react-native';


// import AnimatedLoader from "react-native-animated-loader";
import { productMainCategories, products } from '../../testData';

import CategoryList from '../../components/CategoryList';
import ProductList from '../../components/ProductList';
import ProductCard from '../../components/ProductCard';
import Constants from '../../Constants/constants';
import Header from '../../components/layout/Header';

import { ScrollView } from 'react-native-gesture-handler';


const wait = (timeout) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}
function HomeScreen (props) {

  const [mainCategories, setMainCategories] = useState([]);
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [showCategoriesText, setShowCategoriesText] = useState("See All");
  const [refreshing, setRefreshing] = useState(false);


const onRefresh = React.useCallback(() => {
  setRefreshing(true);

  wait(2000).then(() => setRefreshing(false));
}, []);

 
useEffect(() => {

  fetch(`http://${Constants.host}:3000/shoppay/get_mainCategory`)
    .then(response => response.json())
    .then((data) => {
      // console.log(data);
      AsyncStorage.setItem('productmaincategories', JSON.stringify(data));
     
    })
    .catch(err => {
      console.log('Error', err);
    });

  fetch(`http://${Constants.host}:3000/shoppay/latest_product`)
    .then(response => response.json())
    .then((data) => {
      AsyncStorage.setItem('trendingProducts', JSON.stringify(data));
      
    })
    .catch(err => {
      console.log('Error', err);
     
    });

  AsyncStorage.getItem('productmaincategories')
    .then((value) => setMainCategories(JSON.parse(value)))

  AsyncStorage.getItem('trendingProducts')
    .then((value) => setTrendingProducts(JSON.parse(value)))

}, []);



let categoriesList = null;

if (showCategories) {
  categoriesList = mainCategories.map((data) => (
    <TouchableNativeFeedback 
      useForeground={false} 
      background={TouchableNativeFeedback.Ripple(Constants.ripple, false, 0)}
      key={data._id}
      onPress={()=>{
        props.navigation.navigate('SubCategoryScreen', {
          categoryId: data._id,
          categoryName: data.name,
        })
      }}
    >
      <View style={styles.mainCategoriesContainer} >
        <Text style={styles.mainCategoriesText}>{data.name}</Text>
      </View>

    </TouchableNativeFeedback>

  ))
    
  
}
  
  const DATA = [];
  

  return (
    <>
    <Header title={"Home"} />
    <SafeAreaView  style={styles.screen}>
      <StatusBar barStyle="dark-content" 
        backgroundColor={Constants.statusBarColor} 
      />

      
      

      <FlatList
        ListHeaderComponent={
          <>
          <View>
            <View style={styles.topContainer}>
              <View>
                <Text style={styles.headerSecondary}>Categories (224) </Text>
              </View>

              <View style={styles.buttonContainer}>

                <View style={styles.button}>
                  <Button color="rgb(255, 128, 128)" title="All" />
                </View>

                <View style={styles.button}>
                  <Button color="lightgray" title="Fashion" />
                </View>


                <TouchableNativeFeedback 
                  useForeground={false} 
                  onPress = {
                    () => {
                      setShowCategories(prevState=> !prevState);
                      if (showCategoriesText == "See All")
                        setShowCategoriesText("Show Less");
                      else
                        setShowCategoriesText("See All");
                    }
                  }
                  background = {
                      TouchableNativeFeedback.Ripple(Constants.ripple, false, 0)
                  }
                >

                  <View style={styles.more}>
                    <Text style={styles.textUnderline}>{showCategoriesText}</Text>
                  </View>
                </TouchableNativeFeedback>
              </View>


              
            </View>
          

      </View>

        
            <View style={styles.mainCategoriesSection}>
              {categoriesList}
            </View>
            <View>
              <Text style={styles.headerPrimary}>Trending</Text>
              
            </View>
          </>
        }
        ListEmptyComponent={
          <>
            <Text>Loading products</Text>
          </>
        }
        keyExtractor={(item, index) => index}
        data={trendingProducts}
        renderItem={ itemData =>  <ProductCard 
            productTitle={itemData.item.title}
            productDescription={itemData.item.description}
            productPrice={itemData.item.price}
            productLocation={itemData.item.location}
            productPictures={itemData.item.picture}
            navigation={props.navigation}
          />
        
        }
         refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        
      />

        
    </SafeAreaView>
    </>
  );

         
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginHorizontal: Constants.scrollViewHorizontal,
    marginTop: StatusBar.currentHeight || 0,

  },
  textUnderline: {
    color: Constants.darkGray,
    textTransform: "capitalize",
    textDecorationLine: "underline",
    fontWeight: "bold",
    fontSize: 15,
  },
  scrollView: {
    // marginHorizontal: Constants.scrollViewHorizontal,
      
  },
  topContainer: {

    marginVertical: 0,
    flexDirection: "row",
    flexWrap: "wrap",


  },
  
  marginBottomMedium:{
    marginBottom: 8,
  },
  mainCategoriesSection: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 10,
    width: "100%",
    alignSelf: "center",
    justifyContent: "center"

  },
  mainCategoriesText: {
   textAlign: "center",
   textTransform: "capitalize",
   fontWeight: "bold",
   color: Constants.lightGray,
   fontSize: 16,
  },
  mainCategoriesContainer: {
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: Constants.lightGreen,
    padding: 10,
    elevation: 5,
    width: "45%",
    alignItems: "center",

  },
  marginVerticalMedium: {
    marginVertical: 18,
  },
  headerPrimary: {
    textAlign: 'left',
    fontSize: 20,
    fontWeight: "bold",
    color: Constants.darkGray,
    textTransform: 'capitalize',
  },
  headerSecondary: {
    textAlign: 'left',
    fontSize: 17,
    fontWeight: "bold",
    color: Constants.lightGray,
    textTransform: 'capitalize',
  },
 
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 15,

  },
  button: {
    width: 80,
    marginRight: 25,
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2,
  },
  more: {
    marginTop: 12,
    marginBottom: 0,
  }
  

});


HomeScreen.propTypes = {
  navigation: PropTypes.object,
};
export default HomeScreen;
