import React, {useState, useEffect } from 'react';
import PropTypes from 'prop-types';


import { 
   View,
   Text,
   AsyncStorage,
   Alert,
   StyleSheet,
   Button,
   ScrollView,
   ActivityIndicator,
   Keyboard,
   
} from 'react-native';


import Input from '../../components/Input';
import { userDetail } from '../../testData';




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
      <View style={styles.container}>
         <Text style={styles.headerPrimary}>SIGNUP SCREEN </Text>
            
         <ActivityIndicator 
            animating={isLoading}
            size="large"
            color="#00ff00"
         />
         <ScrollView keyboardShouldPersistTaps="never" decelerationRate="fast" contentContainerStyle={styles.scrollView}>

            <View style={styles.buttonContainer}>
               <Button title="Sign In" color="#66ccff"  onPress={()=>console.log('am google')} />
            </View>
            <View style={styles.buttonContainer}>
               <Button title="Sign Up With Google"  onPress={()=>console.log('am facebook')} />
            </View>

            <View style={styles.buttonContainer}>
               <Button title="Sign Up With Facebook" color="#00cc00" onPress={()=>console.log('am facebook')} />
            </View>

            <View style={styles.inputSection}>
                <View>
                  <Text style={styles.headerSecondary}>Name</Text>
                  <View style={styles.inputContainer}>
                     <Input autoCapitalize='words' />
                  </View>
               </View>

               <View>
                  <Text style={styles.headerSecondary}>Email</Text>
                  <View style={styles.inputContainer}>
                     <Input 
                        textContentType="emailAddress"
                        keyboardType="email-address" 
                        onChangeText={text => onChangeTextHandler(text, 'email')}
                        blurOnSubmit={true}
                        value={email}
                     />
                  </View>
               </View>

               <View>
                  <Text style={styles.headerSecondary}>Phone Number</Text>
                  <View style={styles.inputContainer}>
                     <Input autoCapitalize='words' />
                  </View>
               </View>
               
               <View>   
                  <Text style={styles.headerSecondary}>Password</Text>
                  <View style={styles.inputContainer}>
                     <Input 
                        onChangeText={text => onChangeTextHandler(text, 'password')}
                        blurOnSubmit={true}
                        value={password}
                        secureTextEntry={true}
                        textContentType = "password"
                     />
                  </View>
               </View>

               <View>
                  <Text style={styles.headerSecondary}>Confirm Password</Text>
                  <View style={styles.inputContainer}>
                     <Input autoCapitalize='words' />
                  </View>
               </View>

               <View style={styles.submitButtonContainer}>
                  <Button title="Sign Up" color="#ff6347"  onPress={confirmLogInHandler} />
               </View>

            </View>

         </ScrollView>

            
      </View>
        
   )

}

SignupScreen.propTypes = {
   onLogIn: PropTypes.func,
};

const styles = StyleSheet.create({
  
   lottie: {
      width: 100,
      height: 100,
   },

   container: {
      flex: 1, 
      padding: 15,
      paddingTop: 0,
   },

   inputContainer: {
      flexDirection: 'row',
      marginVertical: 12,
      alignItems: 'center',
      borderColor: '#d3d3d3',
      borderWidth: 1,
      width: 300
   },

   buttonContainer: {
      marginVertical: 10,
   },
   submitButtonContainer: {
      marginVertical: 10,
      justifyContent: 'center',
      alignItems: 'center',
      // width: 500,
   },
   inputSection: {
      marginTop: 40,
   },
   
   headerPrimary: {
      textAlign: 'center',
      fontSize: 20,
      padding: 10,
      marginVertical: 12

   },
   headerSecondary: {
      textAlign: 'left',
      fontSize: 16,
      color: '#808080',
   },
   
});


export default SignupScreen;


