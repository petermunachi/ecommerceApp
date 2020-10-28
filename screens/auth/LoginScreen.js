import React, {useState, useEffect } from 'react';

import PropTypes from 'prop-types';
import { LinearGradient } from 'expo-linear-gradient';

import { 
   View,
   Text,
   AsyncStorage,
   Alert,
   StyleSheet,
   TouchableNativeFeedback,
   ScrollView,
   ActivityIndicator,
   SafeAreaView,
   Keyboard,
   
} from 'react-native';


import Input from '../../components/Input';
import ImageDisplay from '../../components/ImageDisplay';
import Constants from '../../Constants/constants';

import {AuthContext} from '../../utils'





function LoginScreen(props) {


     const { signIn } = React.useContext(AuthContext);
  
   // STATES

   const [isLoading, setIsLoading] = useState(false);
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');


   const confirmLogInHandler = () => {

      setIsLoading(true);
      const data = {
         email: email.toLowerCase(),
         password: password.toLowerCase(),
        
      };


      fetch(`http://${Constants.host}:3000/shoppay/login`, {
         method: 'POST', 
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(data),
      })
      .then(response => response.json())
      .then(data => {
         setIsLoading(false)


         if (data.status == 1) { 

            Alert.alert(
               '',
               'You have been logged in',
               [{ text: 'Ok', onPress: ()=> {
                  
                  console.log(data.msg);
                  AsyncStorage.setItem('loggedIn', JSON.stringify(data.msg));
                  console.log('You have been logged in');
                  signIn(data.msg)

               } }]
            )
         }else if (data.status == 0) {
            alertHandler(data.msg)
         }

      })
      .catch((error) => {
         setIsLoading(false)
         console.error('Error:', error);
      });

      Keyboard.dismiss();

   }
  
   const alertHandler = (field) => {
      Alert.alert(
         '',
         field,
         [{text: 'Ok', style: 'cancel' }]
      )

   }

   const onChangeTextHandler = (inputText, state) => {
      if(state === 'email') setEmail(inputText);
      if(state === 'password') setPassword(inputText);
      
   }
   
   
   return (

      <SafeAreaView style={styles.container}>
         <LinearGradient
            colors = {
               ['rgb(255, 102, 0)',  'rgb(153, 0, 115)']
            }
            style = {
               styles.container
            }
         >
            <ScrollView keyboardShouldPersistTaps="never" decelerationRate="fast" contentContainerStyle={styles.scrollView}>


               <View style={styles.imageContainer}>
                  <ImageDisplay
                  style={styles.tinyLogo}
                  source={require('../../assets/splash.png')} 
                  />
               </View>

            
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

              

               <View style={styles.inputSection}>
                  <View style={styles.headerContainer}>
                     <Text style={styles.headerPrimary}>Login </Text>
                     <Text style={styles.headerSecondary}>Login to your Shoppay account</Text>

                  </View>

                  <View>
                     <View style={styles.inputContainer}>
                        <Input 
                           placeholder="Email Address"
                           placeholderTextColor="#cccccc"
                           style={styles.input} 
                           textContentType="emailAddress"
                           keyboardType="email-address" 
                           onChangeText={text => onChangeTextHandler(text, 'email')}
                           blurOnSubmit={true}
                           value={email}
                        />
                     </View>
                  </View>

                 
                  
                  <View>   
                     <View style={styles.inputContainer}>
                        <Input
                           placeholder="Password"
                           placeholderTextColor="#cccccc"
                           style={styles.input}  
                           onChangeText={text => onChangeTextHandler(text, 'password')}
                           blurOnSubmit={true}
                           value={password}
                           secureTextEntry={true}
                           textContentType = "password"
                        />
                     </View>
                  </View>

                 

                  <View style={styles.submitButtonSection}>
                     <TouchableNativeFeedback 
                        useForeground={false} 
                        onPress = {confirmLogInHandler}
                        background = {
                           TouchableNativeFeedback.Ripple(Constants.ripple, false, 0)
                        }
                     >

                        <View style={styles.submitButtonContainer}>
                           <Text style={styles.submitButton}>Login to Shoopay</Text>
                        </View>
                     </TouchableNativeFeedback>
                     <Text style={styles.headerSecondary}>
                        Don't have an account? 
                        <Text onPress={()=>props.navigation.navigate("SignupScreen")} style={styles.textUnderline}> Register Now</Text>
                     </Text>
                  
                  </View>

               </View>

            </ScrollView>


         </LinearGradient>
                  

      </SafeAreaView>

      
        
   )

}

LoginScreen.propTypes = {
   onLogIn: PropTypes.func,
};

const styles = StyleSheet.create({
  
   container: {      
      flex: 1,
      justifyContent: "center",
      
   },

   imageContainer: {
      alignSelf: "center",
      width: "50%",
      height: 100,
      marginTop: 50,

   },
   input: {
      paddingLeft: 10,
      fontSize: 14,
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

   textUnderline: {
      color: "white",
      textTransform: "capitalize",
      textDecorationLine: "underline",
      fontWeight: "bold",
      fontSize: 17,
   },

   inputContainer: {
      flexDirection: 'row',
      paddingVertical: 12,
      marginVertical: 5,
      alignItems: 'center',
      borderColor: Constants.placeholderColor,
      borderWidth: 1,
      borderRadius: 5,
      backgroundColor: "white",
      height: 45,
      width: "100%"
   },

   buttonContainer: {
      marginVertical: 10,
   },
   submitButtonSection: {
      justifyContent: 'center',
      alignItems: 'center',
   },
   submitButtonContainer: {
      marginTop: 30,
      backgroundColor: "white",
      paddingVertical: 10,
      paddingHorizontal: 40,
      marginBottom: 20,

   },
   submitButton: {
      fontSize: 17,
      color: Constants.darkGray,
      fontWeight: "bold",

   },
   inputSection: {
      width: "88%",
      backgroundColor: Constants.transparent,
      alignSelf:"center",
      padding: 20,
      marginBottom: 60,
      overflow: "hidden",
      borderRadius: 20,
   },

   headerPrimary: {
      textAlign: 'left',
      color: "white",
      fontSize: 25,
      fontWeight: "bold",
      marginVertical: 9,

   },
   headerContainer: { 
      marginBottom: 30,
   },
   headerSecondary: {
      textAlign: 'left',
      fontSize: 16,
      color: "lightgray",
   },
   
});


export default LoginScreen;


