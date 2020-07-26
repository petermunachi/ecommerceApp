import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types'

import {
    View,
    Text,
    AsyncStorage,
    ScrollView,
    TouchableWithoutFeedback,
    ActivityIndicator,
    StyleSheet,
} from 'react-native';
// import AnimatedLoader from "react-native-animated-loader";
import CategoryList from '../../components/CategoryList';
import SearchHeader from '../../components/layout/SearchHeader';

import CustomConstants from '../../Constants/constants';



import { useFocusEffect } from '@react-navigation/native';




function LGAScreen (props) {


   const [list, setList] = useState([]);
   const [isLoading, setIsLoading] = useState(false);
   const [stateName, setStateName] = useState('');
   const [isEnabled, setIsEnabled] = useState(false);
   const [isLocation, setIsLocation] = useState('');



  useEffect(() => {

    const { location } = props.route.params;  
    console.log('location',location); 
    setIsLocation(location)

    let storageKey = `${location}LGA`.replace(/\s/g, "");

    setStateName(location);
   console.log(location);
   setIsLoading(true);  
   fetch(`http://${CustomConstants.host}:3000/shoppay/lga/${location}`)
      .then(response => response.json())
      .then(function (data) {
         // console.log(arrayData);
         setList(data)
         console.log(list);
         setIsLoading(false);


      })
      .catch((error) => {
         setIsLoading(false);
         console.log('Error:', error);
      });
   


 
   }, [props])



         

   return ( 
      <>
      <SearchHeader title="LGA" page="StateScreen" navigation={props.navigation} />
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
                       
                        AsyncStorage.setItem('city', data.name);

                        props.navigation.push('SellScreen')
                     

                     }
                     }
                  >
                     <View style={styles.categoryContainer}>
                        
                        <CategoryList
                           id={index}
                           name={`${data.name}`}
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
      textAlign: 'center',
      fontSize: 20
   }

});

LGAScreen.propTypes = {
   route: PropTypes.object,
   navigation: PropTypes.object,
   location: PropTypes.string,
};

export default LGAScreen;
