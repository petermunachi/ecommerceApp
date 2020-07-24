import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableNativeFeedback
} from 'react-native';
import Input from '../Input';
import CustomConstants from '../../Constants/constants';
import * as Font from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';


import { AppLoading } from "expo";

import Ionicons from 'react-native-vector-icons/Ionicons';





function SearchHeader(props) {

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



  return (
    <LinearGradient
      colors = {
        [CustomConstants.headerPrimaryGradient, CustomConstants.headerSecondaryGradient]
      }
      locations = {[0, 0.8]}
      start={[0, 0]}
      end={[0, 0.2]}
      style={{
        // flex: 1,
        // justifyContent: 'center',
        alignItems: "center",
        height: "14%"
      }}
    >
  
      <View style={styles.container}>

         <TouchableNativeFeedback 
            // activeOpacity={0.8} 
            onPress={
                () => props.navigation.navigate(props.page)
            }
            background = {
                TouchableNativeFeedback.Ripple(CustomConstants.ripple, false, 0)
            }
        >

        <View style={styles.logoContainer}>
            <Ionicons name="ios-arrow-dropleft"  size={40} color="#fff" />
        </View>

        </TouchableNativeFeedback>
        <View style={styles.inputContainer}>
            <Input style={styles.input}
                placeholder={`Search ${props.title}...`}
            />
        </View>

      </View> 
    </LinearGradient>  
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: 'center',
    paddingTop: 20,
  },

  logoContainer: {
    width: "20%",
    // height: 100,
    // marginLeft: 15,

  },
  input:{
    paddingLeft: 10,
    fontSize: 14,
    fontWeight: "bold",
    color: CustomConstants.darkGray,
    
    overflow: "hidden"
  },
  inputContainer: {
    width: '60%',
    backgroundColor: "white",
    height: 35,
    borderRadius: 8,
  },
  title: {
    textAlign: "center",
    color: "rgb(230, 230, 230)",
    fontWeight: "bold",
    fontSize: 22,
    // fontFamily: "Montserrat",
  },

});

export default SearchHeader;
