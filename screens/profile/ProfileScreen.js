import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types'

import {
    View,
    Text,
    AsyncStorage,
    ScrollView,
    ActivityIndicator,
    Button,
    StyleSheet,
} from 'react-native';
// import AnimatedLoader from "react-native-animated-loader";
import CategoryList from '../../components/CategoryList';
import Wrapper from '../../HOC/Wrapper';






function ProfileScreen(props) {


   const [userDetails, setUserDetails] = useState();
   const [list, setList] = useState([]);
   const [isLoading, setIsLoading] = useState(false);
   


  useEffect(() => {

    AsyncStorage.getItem('userData')
       .then((value) => {
          if (value !== null) {
            let data = JSON.parse(value);
            //  console.log(data);
            setUserDetails(data);
              
          }

       })
       .catch((error) => {
          console.log('Error:', error);
       });
 
   }, [])



         

   return ( 
      <Wrapper>
         <ActivityIndicator 
            animating={isLoading}
            size="large"
            color="#00ff00"
         />
         <View>
            <Text style={styles.headerPrimary}>PROFILE SCREEN </Text>
            
            <ScrollView decelerationRate="fast" contentContainerStyle={styles.scrollView}>
               <View style={styles.categoryListContainer}>
               {
                  
                  list.map((data, index) => (
                     
                     <View key={index} style={styles.categoryContainer}> 
                        <CategoryList
                           id={index}
                           name={`${data}`}
                        />
                     </View>
                  ))
               }
               </View>

               <View style={styles.buttonContainer}>
                  <Button title="Log Out" onPress={()=>console.log('log out')} />
               </View>
   
            </ScrollView>
         </View>

      </Wrapper>
   );
   
}

const styles = StyleSheet.create({
  
    screen: {
      flex: 1,
   },
   scrollView: {
      marginTop: 20,
   },
   buttonContainer: {
      width: 300,
      flexDirection: 'row',
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

ProfileScreen.propTypes = {
   navigation: PropTypes.object,
};

export default ProfileScreen;
