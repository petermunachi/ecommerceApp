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
import CustomConstants from '../../Constants/constants';
import CategoryList from '../../components/CategoryList';
import SearchHeader from '../../components/layout/SearchHeader';



function StateScreen(props) {


   const [list, setList] = useState([]);
   const [isLoading, setIsLoading] = useState(false);


   useEffect(() => {
      setIsLoading(true);
      fetch(`http://${CustomConstants.host}:3000/shoppay/states`)
         .then(response => response.json())
         .then(function (data) {
            // console.log(arrayData);
            setList(data)
            // console.log(list);
            setIsLoading(false);

         



         })
         .catch((error) => {
            console.log('Error:', error);
            setIsLoading(false);
         });

      
 
   }, [])

         

   return ( 
      <>
      <SearchHeader title="State" page="SellScreen" navigation={props.navigation} />
      <View>
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
               list.map((data, index) => (
                  <TouchableWithoutFeedback
                     key={index}
                     onPress = {() => {
                           props.navigation.navigate('LGAScreen', {
                              location: data.id,
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
  
   screen: {
      flex: 1,
   },
   scrollView: {
      marginTop: 0,
      paddingBottom: "50%",
   },
   horizontal: {
      padding: 10
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
