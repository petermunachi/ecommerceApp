import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ImageDisplay from '../components/ImageDisplay';
import Constants from '../Constants/constants';
import Wrapper from '../HOC/Wrapper';

import { LinearGradient } from 'expo-linear-gradient';






function IndexScreen(props) {


   return (
 
      <View style={styles.container}>
         <LinearGradient
            colors = {
               ['rgb(255, 102, 0)',  'rgb(153, 0, 115)']
            }
            style = {
               styles.container
            }
         >
            <View style={styles.imageContainer}>
               <ImageDisplay
               style={styles.tinyLogo}
               source={require('../assets/gadgets.jpg')} 
               />
            </View>

         </LinearGradient>
                  

      </View>
     
         
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: "center",
      
   },

   imageContainer: {
      width: "30%",
      height: 100,
      marginHorizontal: 120,

   },
   
  
});

export default IndexScreen;
