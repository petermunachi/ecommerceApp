import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types'

import {
    View,
    Text,
    AsyncStorage,
    ScrollView,
    ActivityIndicator,
    Button,
    Alert,
    StyleSheet,
} from 'react-native';
// import AnimatedLoader from "react-native-animated-loader";
import CategoryList from '../../components/CategoryList';
import Wrapper from '../../HOC/Wrapper';
import Constants from '../../Constants/constants';
import Header from '../../components/layout/Header';

import {AuthContext} from '../../utils'


function ProfileScreen(props) {

    const { signOut } = React.useContext(AuthContext);


   const [userDetails, setUserDetails] = useState({});
   const [firstLetter, setFirstLetter] = useState('');
   const [isLoading, setIsLoading] = useState(false);
   


  useEffect(() => {

    AsyncStorage.getItem('loggedIn')
       .then((value) => {
          if (value !== null) {
            let data = JSON.parse(value)[0];
            let char = data.firstName.charAt(0);
            setFirstLetter(char);
            setUserDetails(data);


          }
          

       })
       .catch((error) => {
          console.log('Error:', error);
       });
 
   },[])


   const logout = () =>{


      Alert.alert(
         '',
         'Are sure you want to logout ?',
         [
            {
               text: 'Cancel',
               onPress: () => console.log('Cancel Pressed'),
               style: 'cancel'
            },
            { text: 'OK', onPress: () => {
              
               signOut(false)
            } }
         ],
         { cancelable: false }
      )
   }



         

   return ( 
      <>
         <Header title={"Profile"} />
         <View>
            {isLoading ?
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
               <View style={styles.firstLetterContainer}>
                  <Text style={styles.firstLetter}>{firstLetter}</Text>
               </View>
               <View style={styles.categoryListContainer}>
              
                  <View>
                     <View style={styles.categoryContainer}> 
                        <Text style={styles.categoryText}>{userDetails.firstName}</Text>
                     </View>

                     <View style={styles.categoryContainer}> 
                        <Text style={styles.categoryText}>{userDetails.lastName}</Text>
                     </View>

                     <View style={styles.categoryContainer}> 
                        <Text style={styles.categoryText}>{userDetails.email}</Text>
                     </View>
                     <View style={styles.categoryContainer}> 
                        <Text style={styles.categoryText}>{userDetails.telephone1}</Text>
                     </View>
                     {/* <View style={styles.categoryContainer}> 
                        <Text style={styles.categoryText}>{data.address1}</Text>
                     </View> */}

                  </View>

         
                  <View style={styles.buttonContainer}>
                     <Button title="Logout" color="#ff6347" onPress={logout} />
                  </View>
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
      width: "98%",
      marginVertical: 50,
   },
   buttonContainer: {
      marginVertical: 25,
      width: "80%",
      flexDirection: 'column',
      alignSelf: "center",
      fontSize: 15,
      textTransform: "capitalize",
      fontWeight: "bold",
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
      flexDirection: 'column',
      marginTop: 20,
      marginBottom: 10,

   },
   categoryContainer: {
      marginVertical: 5,
      borderTopColor: '#e6e6e6',
      borderTopWidth: 2,
      padding: 5,
   },
   categoryText: {
      marginLeft: 20,
      padding: 10,
      fontWeight: "bold",
      fontSize: 16,
      textTransform: "capitalize",
      color: "#404040",
   },
   headerPrimary: {
      textAlign: 'center',
      fontSize: 20
   },
   firstLetterContainer: {
      flexDirection: "column",
      width: 70,
      height: 70,
      marginLeft: 20,
      backgroundColor: '#990073',
      borderRadius: 50,
      padding: 15,
      alignItems: "center",
      justifyContent: "center",
   },
   firstLetter:{
      color: "#ff7d66",
      textAlign: "center",
      fontSize: 40,
      fontWeight: "bold",
   }


});

ProfileScreen.propTypes = {
   navigation: PropTypes.object,
};

export default ProfileScreen;
