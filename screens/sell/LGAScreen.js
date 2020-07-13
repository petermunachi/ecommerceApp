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

import { useFocusEffect } from '@react-navigation/native';




function LGAScreen (props) {


   const [list, setList] = useState([]);
   const [isLoading, setIsLoading] = useState(false);
   const [stateName, setStateName] = useState('');
   const [isEnabled, setIsEnabled] = useState(false);



  useEffect(() => {

    const { location } = props.route.params;   

    let storageKey = `${location}LGA`.replace(/\s/g, "");

    setStateName(location);

    setIsLoading(true);     
    fetch(`http://locationsng-api.herokuapp.com/api/v1/states/${location}/lgas`)
        .then(response => response.json())
        .then(function (data) {
         setIsLoading(false);
          AsyncStorage.setItem(storageKey, JSON.stringify(data));
           AsyncStorage.getItem(storageKey)
             .then((value) => {
               if (value !== null) {
                 setList(JSON.parse(value))
               }

             })
             .catch((error) => {
               console.log('Error:', error);
             });

        })
        .catch((error) => {
            setIsLoading(true);
            console.log('Error:', error);
        });

 
   }, [props])



         

   return ( 
      <View>
         <ActivityIndicator 
            animating={isLoading}
            size="large"
            color="#00ff00"
         />
         <Text style={styles.headerPrimary}>{stateName} LGA SCREEN </Text>
         
         <ScrollView decelerationRate="fast" contentContainerStyle={styles.scrollView}>
            <View style={styles.categoryListContainer}>
            {
               list.map((data, index) => (
                  <TouchableWithoutFeedback
                     key={index}
                     onPress = {() => {
                        const obj = {
                           city: data,
                           state: stateName
                        }
                        AsyncStorage.setItem('city', JSON.stringify(obj));

                        props.navigation.navigate('SellScreen', {
                           type: "lga",
                           location: data,
                           stateName: stateName,
                        })
                     

                     }
                     }
                  >
                     <View style={styles.categoryContainer}>
                        
                        <CategoryList
                           id={index}
                           name={`${data} Local Government`}
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
      fontSize: 20
   },
   lottie: {
      width: 100,
      height: 100,
   }

});

LGAScreen.propTypes = {
   route: PropTypes.object,
   navigation: PropTypes.object,
   location: PropTypes.string,
};

export default LGAScreen;
