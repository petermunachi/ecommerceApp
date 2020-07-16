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
   StatusBar,
   SafeAreaView,
   Keyboard,
   
} from 'react-native';


import Input from '../../components/Input';
import { userDetail } from '../../testData';
import ImageDisplay from '../../components/ImageDisplay';
import Constants from '../../Constants/constants';
import Wrapper from '../../HOC/Wrapper';





function SignupScreen(props) {

  
   // STATES
  
   const [isLoading, setIsLoading] = useState(false);
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   
   

   const confirmLogInHandler = () => {

      const checkInput = validateInputHandler();
      if (checkInput) {
         const data = { userEmail: email, userPassword: password };
         setIsLoading(true)

         fetch('api/profile', {
            method: 'POST', // or 'PUT'
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
         })
         .then(response => response.json())
         .then(data => {
            setIsLoading(false)

            console.log('Success:', data);
            if (data) {
               AsyncStorage.setItem('userData', JSON.stringify(data));
               AsyncStorage.setItem('loggedIn', 'true');
   
               alertHandler('You are now logged in');
               props.onLogIn('true');
               
            }
         })
         .catch((error) => {
            // console.error('Error:', error);
            setIsLoading(false)

            AsyncStorage.setItem('userData', JSON.stringify(userDetail));
            AsyncStorage.setItem('loggedIn', 'true');
            alertHandler('You are now logged in');
            Alert.alert(
               '',
               'You are now logged in',
               [{ text: 'Ok', onPress: ()=> props.onLogIn('true') }]
            )
            props.onLogIn('true');

         });

      }

    Keyboard.dismiss();

  }
   const validateInputHandler = () => {

      let emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      let passwordReg = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$/;

      if (email === '') {
         alertHandler('Email Is Required');
         return false;
      }
      if (emailReg.test(email) === false) {
         alertHandler('Enter a valid Email Address');
         return false;
      }
      if (password === '') {
         alertHandler('Password Is Required');
         return false;
      }
      if (passwordReg.test(password) === false) {
         alertHandler('Password Must contain Letter and Alphabets');
         return false;
      }
      return true;

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

            
               <ActivityIndicator 
                  animating={isLoading}
                  size="large"
                  color="#00ff00"
               />

              

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
                        onPress = {()=>console.log('hello')}
                        background = {
                           TouchableNativeFeedback.Ripple(Constants.ripple, false, 0)
                        }
                     >

                        <View style={styles.submitButtonContainer}>
                           <Text style={styles.submitButton}>Login to Shoopay</Text>
                        </View>
                     </TouchableNativeFeedback>
                     <Text style={styles.headerSecondary}>Don't have an account? <Text style={styles.textUnderline}> Register Now</Text></Text>
                  </View>

               </View>

            </ScrollView>


         </LinearGradient>
                  

      </SafeAreaView>

      
        
   )

}

SignupScreen.propTypes = {
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

   },
   input: {
      paddingLeft: 10,
      fontSize: 14,
      fontWeight: "bold",
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


export default SignupScreen;


