import React, {useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { LinearGradient } from 'expo-linear-gradient';

import { 
   View,
   Text,
   AsyncStorage,
   Picker,
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
import SelectBox from '../../components/SelectBox';
import { userDetail } from '../../testData';
import ImageDisplay from '../../components/ImageDisplay';
import Constants from '../../Constants/constants';





function SignupScreen(props) {

  
   // STATES
   const [isLoading, setIsLoading] = useState(false);
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [phoneNumber, setPhoneNumber] = useState('');
   const [firstName, setFirstName] = useState('');
   const [lastName, setLastName] = useState('');
   const [gender, setGender] = useState('male');
   
   
   const confirmSignupHandler = () => {

      setIsLoading(true);
      const data = {
         email: email.toLowerCase(),
         password: password.toLowerCase(),
         firstName: firstName,
         lastName: lastName,
         telephone1: phoneNumber.toString(),
         gender: gender,
      };


      fetch(`http://${Constants.host}:3000/shoppay/signup`, {
         method: 'POST', 
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(data),
      })
      .then(response => response.json())
      .then(data => {
         setIsLoading(false)

         console.log(data);
         if (data.status == 1) { 
            Alert.alert(
            '',
            'You Have Successfully Signup',
            [{ text: 'Ok', onPress: ()=> console.log('You Have Successfully Signup') }]
         )
         } else if (data.status == 0) {
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
      if(state === 'phoneNumber') setPhoneNumber(inputText);
      if(state === 'firstName') setFirstName(inputText);
      if(state === 'lastName') setLastName(inputText);
      if(state === 'gender') setGender(inputText);
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
                     <Text style={styles.headerPrimary}>Signup </Text>
                     <Text style={styles.headerSecondary}>Signup for Shoppay account</Text>

                  </View>

                  <View>
                     <View style={styles.inputContainer}>
                        <Input
                           placeholder="First Name"
                           placeholderTextColor="#cccccc"
                           style={styles.input} 
                           autoCapitalize='words' 
                           onChangeText={text => onChangeTextHandler(text, 'firstName')}
                           blurOnSubmit={true}
                           value={firstName}
                        />
                     </View>
                  </View>

                  <View>
                     <View style={styles.inputContainer}>
                        <Input
                           placeholder="Last Name"
                           placeholderTextColor="#cccccc"
                           style={styles.input} 
                           autoCapitalize='words' 
                           onChangeText={text => onChangeTextHandler(text, 'lastName')}
                           blurOnSubmit={true}
                           value={lastName}
                        />
                     </View>
                  </View>

                  <View>
                     <View style={styles.inputContainer}>
                        <Input 
                           placeholder="Email Address"
                           placeholderTextColor="#cccccc"
                           style={styles.input} 
                           keyboardType="email-address" 
                           textContentType="emailAddress"
                           onChangeText={text => onChangeTextHandler(text, 'email')}
                           blurOnSubmit={true}
                           value={email}
                        />
                     </View>
                  </View>

                  <View>
                     <View style={styles.inputContainer}>
                        <Input 
                           placeholder="Phone Number"
                           placeholderTextColor="#cccccc"
                           style={styles.input} 
                           keyboardType="phone-pad"
                           onChangeText={text => onChangeTextHandler(text, 'phoneNumber')}
                           blurOnSubmit={true}
                           value={phoneNumber}  
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

                  <View>
                     <View style={styles.selectBoxContainer}>
                        
                        <Picker
                           selectedValue={gender}
                           enabled={true}
                           style={styles.selectBox}
                           onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
                        >
                           <Picker.Item label="Male" value="male" />
                           <Picker.Item label="Female" value="female" />
                        </Picker>
                     </View>
                  </View>

                 

                  <View style={styles.submitButtonSection}>
                     <TouchableNativeFeedback 
                        useForeground={false} 
                        onPress = {confirmSignupHandler}
                        background = {TouchableNativeFeedback.Ripple(Constants.ripple, false, 0)}
                     >

                        <View style={styles.submitButtonContainer}>
                           <Text style={styles.submitButton}>Signup for Shoopay</Text>
                        </View>
                     </TouchableNativeFeedback>
                     <Text style={styles.headerSecondary}>All ready have an account? <Text onPress={
                        ()=>props.navigation.navigate("LoginScreen")} style={styles.textUnderline}> Sign In</Text></Text>
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

   imageContainer: {
      alignSelf: "center",
      width: "50%",
      height: 100,
      marginVertical: 50,

   },
   input: {
      paddingLeft: 10,
      fontSize: 14,
      fontWeight: "bold",
      color: Constants.darkGray,

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

   selectBox: {
      height: "100%",
      width: '100%',
      fontSize: 14,
      fontWeight: "bold",
      color: Constants.darkGray,

   },
   selectBoxContainer: {
      flexDirection: 'row',
      marginVertical: 12,
      alignItems: 'center',
      borderColor: Constants.placeholderColor,
      justifyContent: "center",
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


