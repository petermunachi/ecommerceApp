import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ImageDisplay from '../components/ImageDisplay';
import Constants from '../Constants/constants';





function EmptyDisplay(props) {

  const [ dataLoaded, setDataLoaded ] = useState(false)

   return (
      <View style={styles.container}>

         <View style={styles.imageContainer}>
            <ImageDisplay
              style={styles.tinyLogo}
              source={require('../assets/gadgets.jpg')} 
            />
          </View>
                
        <View style={styles.textContainer}>
          <Text style={styles.headerPrimary}>Nothing Here!</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.headerSecondary}>You have no {props.screen} yet!</Text>
        </View>
      </View>
   );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: 'center',
    justifyContent: "center",
    paddingTop: "80%",
  },

  imageContainer: {
    width: "70%",
    height: 100,
    marginVertical: 13,

  },
  textContainer: {
    marginTop: 22,
  },
  headerPrimary: {
    textAlign: 'center',
    fontSize: 21,
    fontWeight: "bold",
    color: Constants.darkGray,
    textTransform: 'capitalize',
  },
  headerSecondary: {
    textAlign: 'center',
    fontSize: 17,
    fontWeight: "bold",
    color: 'rgb(179, 179, 179)',
    textTransform: 'capitalize',
  },

});

export default EmptyDisplay;
