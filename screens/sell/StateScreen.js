import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types'

import {
    View,
    Text,
    AsyncStorage,
    ScrollView,
    ActivityIndicator,
    TouchableWithoutFeedback,
    StyleSheet,
} from 'react-native';
// import AnimatedLoader from "react-native-animated-loader";
import CategoryList from '../../components/CategoryList';
import SearchHeader from '../../components/layout/SearchHeader';



function StateScreen(props) {


   const [list, setList] = useState([]);
   const [isLoading, setIsLoading] = useState(false);


   useEffect(() => {
      setIsLoading(true);
      fetch('http://locationsng-api.herokuapp.com/api/v1/states')
         .then(response => response.json())
         .then(function (data) {
            AsyncStorage.setItem('nigerianstates', JSON.stringify(data));
            AsyncStorage.getItem('nigerianstates')
               .then((value) => {
                  setIsLoading(false);
                  if (value !== null) {
                     console.log(value);
                     setList(JSON.parse(value))
                  }

               })
               .catch((error) => {
                  setIsLoading(false);
                  console.log('Error:', error);
               });


         })
         .catch((error) => {
            console.log('Error:', error);
         });

      
 
   }, [])

         

   return ( 
      <>
      <SearchHeader title="State" page="SellScreen" navigation={props.navigation} />
      <View>
         <View style={styles.loaderContainer}>
            <ActivityIndicator 
               animating={isLoading}
               size="large"
               color="#00ff00"
            />
         </View>
         <Text style={styles.headerPrimary}>STATES SCREEN </Text>
         <ScrollView decelerationRate="fast" contentContainerStyle={styles.scrollView}>
            <View style={styles.categoryListContainer}>
            {
               list.map((data, index) => (
                  <TouchableWithoutFeedback
                     key={index}
                     onPress = {() => {
                           props.navigation.navigate('LGAScreen', {
                              location: data.name,
                           })
                        
                        }
                     }
                  >
                     <View style={styles.categoryContainer}>
                        
                        <CategoryList
                           id={index}
                           name={`${data.name} State`}
                        />
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
   lottie: {
      width: 100,
      height: 100,
   },
   screen: {
      flex: 1,
   },
   scrollView: {
      marginTop: 20,
   },
   horizontal: {
      padding: 10
   },
   loaderContainer: {
      margin: 0,
      position: 'absolute',
      top: 50,
      left: 50,
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
      fontSize: 20
   },
   lottie: {
      width: 100,
      height: 100,
   }

});

StateScreen.propTypes = {
   route: PropTypes.object,
   navigation: PropTypes.object,
   productName: PropTypes.string,
};

export default StateScreen;
