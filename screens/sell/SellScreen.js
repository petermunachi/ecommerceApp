import React, {useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';


import { 
   View,
   Text,
   AsyncStorage,
   ScrollView,
   Picker,
   TouchableWithoutFeedback,
   StyleSheet,
   Switch,
   Button,
   Image,
   Alert,
   Dimensions,
} from 'react-native';


import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import * as FileSystem from 'expo-file-system';

import SelectBox from '../../components/SelectBox';
import Input from '../../components/Input';
import Wrapper from '../../HOC/Wrapper';
import { productMainCategories, productSubCategories, userDetail } from '../../testData';
import { useFocusEffect } from '@react-navigation/native';
// import AnimatedLoader from "react-native-animated-loader";



function SellScreen (props) {

  
   // STATES
   const [mainCategories, setMainCategories] = useState([]);
   const [subCategories, setSubCategories] = useState([]);
   const [selectedValue, setSelectedValue] = useState(null);
   const [categoryName, setCategoryName] = useState('');
   const [categoryValue, setCategoryValue] = useState('');
   const [city, setCity] = useState('');
   const [locationType, setLocationType] = useState('StateScreen');
   const [stateName, setStateName] = useState('');
   const [condition, setCondition] = useState('');
   const [isLoading, setIsLoading] = useState(false);
   const [isEnabled, setIsEnabled] = useState(false);
   const [images, setImages] = useState([]);
   const [userDetails, setUserDetails] = useState();
   
   const w = Dimensions.get('window');

   useEffect(() => {
      
      fetch('/api/productCategories')
         .then(response => response.json())
         .then(function (data) {
            AsyncStorage.setItem('productmaincategories', JSON.stringify(data));
         })
         .catch((error) => {
            AsyncStorage.setItem('productmaincategories', JSON.stringify(productMainCategories));
         });

      AsyncStorage.getItem('productmaincategories')
         .then((value) => setMainCategories(JSON.parse(value)))
         .catch((error) => {
            console.log('Error:', error);
         });
       
      retrieveData();
      getPermissionAsync();


   }, [props])


   const retrieveData = () => {
      AsyncStorage.getItem('city')
         .then((value) => {
            let region = JSON.parse(value);
            // console.log(region);

            setCity(region.city);
            setLocationType('LGAScreen');
            setStateName(region.state);
         })
         .catch((error) => {
            console.log('Error:', error);
         });
      AsyncStorage.getItem('userData')
         .then((value) => {
            let data = JSON.parse(value);
            setUserDetails(data);

         })
         .catch((error) => {
            console.log('Error:', error);
         });
   }


   const fetchSubCategories = () => {
      let itemKey = `${categoryName}subcategories`.replace(/\s/g, "");

      fetch(`/api/subCategories/:${selectedValue}`)
         .then(response => response.json())
         .then(function (data) {
            setCategoryName(data.subCategoryName)

            AsyncStorage.setItem(itemKey, JSON.stringify(productSubCategories));

         })
         .catch((error) => {
            // console.log('Error:', error);
            AsyncStorage.setItem(itemKey, JSON.stringify(productSubCategories));

         });

      AsyncStorage.getItem(itemKey)
         .then((value) => setSubCategories(JSON.parse(value)))

   }


   const getPermissionAsync = async () => {
      if (Constants.platform.ios) {
         const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
         if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
         }
      }
   };

   const pickImage = async () => {
      try {
         let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            allowsMultipleSelection: true,
            exif: true,
         });
         if (!result.cancelled) {
           checkImageSize(result.uri)
         }

         // console.log(result);
      } catch (E) {
         console.log(E);
      }
   };

     

   const onChangeHandler = (itemValue, itemIndex) => {
      setSelectedValue(itemValue);
      fetchSubCategories();
   }

   const subChangeHandler = (itemValue, itemIndex) => setCategoryValue(itemValue)

   const toggleSwitch = () => setIsEnabled(previousState => !previousState)

   const checkImageSize = (imageUrl) => {
     
      FileSystem.getInfoAsync(imageUrl, {
         size: true
      })
         .then((value)=> {
            // 1000000 byte approximately 1mb

            if (value.size > 5000000) {
               Alert.alert('Upload Error', 'Image Size Exceeds 5MB ...', [{
                  text: 'Close',
                  style: 'cancel',
   
               }]);
               
            }else{
               setImages(prevImages => [...prevImages, imageUrl])
            }

         })
         .catch((error)=> console.log(error))

   }

   
   
   return (
      <Wrapper>
         <View style = {styles.container} >
            <Text style={styles.headerPrimary}>SELL SCREEN </Text>
            
            {/* <AnimatedLoader 
               visible = { isLoading }
               overlayColor = "rgba(255,255,255,0.75)"
               animationStyle = {styles.lottie}
               speed = { 1 }
            /> */}
            <ScrollView keyboardShouldPersistTaps="never" decelerationRate="fast" contentContainerStyle={styles.scrollView}>

               <View>
                  <Text style={styles.headerSecondary}>Choose A Category </Text>
                  <View style={styles.selectBoxContainer}>
                     <SelectBox 
                        status={true}
                        mode="dropdown" 
                        selectedValue={selectedValue} 
                        valueChange={onChangeHandler}
                     >
                        {mainCategories}
                     </SelectBox>
                  </View>
               </View>
               
               <View>
                  <Text style={styles.headerSecondary}>Sub Categories </Text>
                  <View style={styles.selectBoxContainer}>
                     <SelectBox 
                        status={true}
                        mode="dropdown" 
                        selectedValue={categoryValue} 
                        valueChange={subChangeHandler}
                     >
                        {subCategories}
                     </SelectBox>
                  </View>
               </View>

               <View>
                  <Text style={styles.headerSecondary}>City</Text>
                     <TouchableWithoutFeedback
                     
                        onPress={() => {
                           props.navigation.push(locationType, {
                              location: stateName,
                           })
                           
                        }}
                     >
                        <View style={styles.selectBoxContainer}>
                           
                           <Picker
                              enabled={false}
                              style={styles.selectBox}
                           >
                              <Picker.Item label={city} value={city} />
                           </Picker>

                        </View>
                     </TouchableWithoutFeedback>
               </View>

               <View>
                  <Text style={styles.headerSecondary}>Name / Title</Text>
                  <View style={styles.inputContainer}>
                     <Input autoCapitalize='words' />
                  </View>
               </View>

               <View>
                  <Text style={styles.headerSecondary}>Condition</Text>
                  
                  <View style={styles.selectBoxContainer}>
                     
                     <Picker
                        enabled={false}
                        style={styles.selectBox}
                        onValueChange={(itemValue, itemIndex) => setCondition(itemValue)}
                     >
                        <Picker.Item label="New" value="New" />
                        <Picker.Item label="Used" value="Used" />
                        <Picker.Item label="Refurbished" value="Refurbished" />

                     </Picker>

                  </View>
               </View>

               <View>   
                  <Text style={styles.headerSecondary}>Price</Text>
                  <View style={styles.inputContainer}>
                     <Input keyboardType="number-pad" />
                  </View>
               </View>

               <View>
                  <Text style={styles.headerSecondary}>Description</Text>
                  <View style={styles.inputContainer}>
                     <Input style={styles.input} />
                  </View>
               </View>

               <View>   
                  <Text style={styles.headerSecondary}>Negotiation</Text> 
                  <View style={styles.switchContainer}>
                     <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={isEnabled ? "#ff6347" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                     />
                  </View>
               </View>

               <View>
                  <View style={styles.buttonContainer}>

                     <Button title="Add Photo" color="#00cc00" onPress={pickImage} />
                  </View>
                  <View style={styles.photoContainer}>
                     {
                        images.map((image, index) =>(
                           <View key={index} style={styles.categoryContainer}>
                           {
                              image && 
                              <Image 
                                 source={{ uri: image }} 
                                 style={{resizeMode: "cover", width: 90, height: 90, borderRadius: 5, }} 
                                 
                              />
                           }
                           </View>
                        ))
                     }
                  </View>
               </View>

               <View>
                  <Text style={styles.headerSecondary}>Seller Name: {`${userDetail.firstName} ${userDetail.lastName} `}</Text> 
                  <Text style={styles.headerSecondary}>Seller Phone Number: {userDetail.phoneNumber} </Text> 
               </View>

               <View style={styles.submitButtonContainer}>
                  <Button title="Post Product" color="#ff6347" onPress={pickImage} />
               </View>


            </ScrollView>
            
         </View>
      </Wrapper>
            
   )

}

SellScreen.propTypes = {
   navigation: PropTypes.object,
};

const styles = StyleSheet.create({
   photoContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: 20,
      marginBottom: 10
   },
   lottie: {
      width: 100,
      height: 100,
   },
   container: {
      flex: 1, 
      padding: 15,
      paddingTop: 0,
   },

   buttonContainer: {
      width: 300,
      flexDirection: 'row',
   },

   submitButtonContainer: {
      marginVertical: 10,
      justifyContent: 'center',
      alignItems: 'center',
      // width: 500,
   },

   categoryContainer: {
      margin: 10,
   },
   scrollView: {
      marginTop: 20,
      paddingBottom: 40,
   },
   selectBox: {
      height: 50,
      width: '100%'
   },
   selectBoxContainer: {
      flexDirection: 'row',
      marginVertical: 12,
      alignItems: 'center',
      borderColor: '#d3d3d3',
      justifyContent: "center",
      borderWidth: 1,
      height: 40,
      width: 300
   },
   inputContainer: {
      flexDirection: 'row',
      marginVertical: 12,
      alignItems: 'center',
      borderColor: '#d3d3d3',
      borderWidth: 1,
      width: 300
   },
   switchContainer: {
      flexDirection: 'row',
      marginVertical: 12,
      alignItems: 'center',
      width: 300
   },
   input: {
      height: 70,
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


export default SellScreen;


