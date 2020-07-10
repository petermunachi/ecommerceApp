import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types'

import {
    View,
    Text,
    AsyncStorage,
    ScrollView,
    TouchableWithoutFeedback,
    StyleSheet,
} from 'react-native';
// import AnimatedLoader from "react-native-animated-loader";
import CategoryList from '../../components/CategoryList';


function StateScreen(props) {


   const [list, setList] = useState([]);
   const [isLoading, setIsLoading] = useState(false);


   useEffect(() => {
         
      fetch('http://locationsng-api.herokuapp.com/api/v1/states')
         .then(response => response.json())
         .then(function (data) {
            AsyncStorage.setItem('nigerianstates', JSON.stringify(data));
            AsyncStorage.getItem('nigerianstates')
               .then((value) => {
                  if (value !== null) {
                     // console.log(value);
                     setList(JSON.parse(value))
                  }

               })
               .catch((error) => {
                  console.log('Error:', error);
               });


         })
         .catch((error) => {
            console.log('Error:', error);
         });

      
 
   }, [])

         

   return ( 
      <View>
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
