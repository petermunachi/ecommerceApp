import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ImageDisplay from '../ImageDisplay';
import Constants from '../../Constants/constants';
import * as Font from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';


import { AppLoading } from "expo";




function Header(props) {

  // const [ dataLoaded, setDataLoaded ] = useState(false)

  // const loadFont = async ()=>{
  //   try {
  //     await Font.loadAsync({
  //       // Load a font `Montserrat` from a static resource
  //       Montserrat: require('assets/fonts/montserrat/Montserrat-Regular.ttf'),

  //       // Any string can be used as the fontFamily name. Here we use an object to provide more control
  //       'Montserrat-Bold': {
  //         uri: require('assets/fonts/monserrat/Montserrat-Bold.ttf'),
  //       },
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }

  // }

  // if (!dataLoaded) {
  //   return (
  //     <AppLoading 
  //         startAsync={loadFont}
  //         onFinish={()=> setDataLoaded(true)}
  //     />
  //   );
  // }
  let titleProps = props.title;

  const title = (titleProps.length > 15) ? titleProps.substr(0, 15) + '...' : titleProps;


  return (
    <LinearGradient
      colors = {
        [Constants.headerPrimaryGradient, Constants.headerSecondaryGradient]
      }
      locations = {[0, 0.8]}
      start={[0, 0]}
      end={[0, 0.2]}
      style={{
        // flex: 1,
        // justifyContent: 'center',
        height: 90
      }}
    >
  
      <View style={styles.container}>

        <View style={styles.logoContainer}>
          <ImageDisplay
            style={styles.tinyLogo}
            source={require('../../assets/splash.png')}
          />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>

      </View> 
    </LinearGradient>  
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: 'center',

  },

  logoContainer: {
    width: "20%",
    height: 100,
    // marginLeft: 15,

  },
  titleContainer: {
    width: '60%',
  },
  title: {
    textAlign: "center",
    color: "rgb(230, 230, 230)",
    fontWeight: "bold",
    fontSize: 22,
    textTransform: "capitalize",
    // fontFamily: "Montserrat",
  },

});

export default Header;
