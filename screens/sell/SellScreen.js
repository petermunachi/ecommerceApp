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
   Platform,
   Alert,
   Keyboard,
   ActivityIndicator,
   Dimensions,

} from 'react-native';


import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import * as FileSystem from 'expo-file-system';

import SelectBox from '../../components/SelectBox';
import Input from '../../components/Input';
import Wrapper from '../../HOC/Wrapper';
// import { productMainCategories,  } from '../../testData';
import { useFocusEffect } from '@react-navigation/native';

import CustomConstants from '../../Constants/constants';
import Header from '../../components/layout/Header';





function SellScreen (props) {

  
   // STATES
   const [mainCategories, setMainCategories] = useState([]);
   const [subCategories, setSubCategories] = useState([]);
   const [mainCategoryValue, setMainCategoryValue] = useState(null);
   const [subCategoryValue, setSubCategoryValue] = useState('');
   const [city, setCity] = useState('');
   const [locationType, setLocationType] = useState('StateScreen');
   const [stateName, setStateName] = useState('');
   const [condition, setCondition] = useState('New');
   const [isLoading, setIsLoading] = useState(false);
   const [negotiation, setNegotiation] = useState(false);
   const [images, setImages] = useState([]);
   const [userDetails, setUserDetails] = useState({});

   const [title, setTitle] = useState('');
   const [price, setPrice] = useState('');
   const [description, setDescription] = useState('');

   
   const w = Dimensions.get('window');

   useEffect(() => {
      setIsLoading(true);
      
      fetch(`http://${CustomConstants.host}:3000/shoppay/get_mainCategory`)
         .then(response => response.json())
         .then(function (data) {
            setIsLoading(false);
            // console.log(data);
            AsyncStorage.setItem('productmaincategories', JSON.stringify(data));
         })
         .catch((error) => {
            setIsLoading(false);
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

      AsyncStorage.getItem('loggedIn')
         .then((value) => {
            let data = JSON.parse(value)[0];
            // console.log(data.firstName);
            setUserDetails(data);
            // console.log(userDetails);

         })
         .catch((error) => {
            console.log('Error:', error);
         });
      
   }


   const fetchSubCategories = (itemValue) => {
      // let itemKey = `${categoryName}subcategories`.replace(/\s/g, "");
      // console.log(mainCategoryValue);

      fetch(`http://${CustomConstants.host}:3000/shoppay/get_subcategory/${itemValue}`)
         .then(response => response.json())
         .then(function (data) {
            // setCategoryName(data.name)
            console.log(data);
            console.log(itemValue);
            setSubCategories(data)

            // AsyncStorage.setItem(itemKey, JSON.stringify(data));

         })
         .catch((error) => {
            console.log('Error:', error);
            // AsyncStorage.setItem(itemKey, JSON.stringify(productSubCategories));

         });

      // AsyncStorage.getItem(itemKey)
      //    .then((value) => setSubCategories(JSON.parse(value)))

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
            base64: true,
            aspect: [4, 3],
            quality: 1,
            allowsMultipleSelection: true,
            exif: true,
         });
         if (result.uri) {
           checkImageSize(result)
         }

         console.log(result);
      } catch (E) {
         console.log(E);
      }
   };

     

   const onChangeHandler = (itemValue, itemIndex) => {
      console.log(itemValue);
      setMainCategoryValue(itemValue);
      fetchSubCategories(itemValue);
   }

   const subChangeHandler = (itemValue, itemIndex) => setSubCategoryValue(itemValue)

   const toggleSwitch = () => setNegotiation(previousState => !previousState)

   const checkImageSize = (imageUrl) => {
     
      FileSystem.getInfoAsync(imageUrl.uri, {
         size: true
      })
         .then((value)=> {
            // 1000000 byte approximately 1mb

            if (value.size > 5000000) {
               Alert.alert('Upload Error', 'Image size exceeds 5MB ...', [{
                  text: 'Close',
                  style: 'cancel',
   
               }]);
               
            }else{
               setImages(prevImages => [...prevImages, imageUrl]);
               console.log(images);
            }

         })
         .catch((error)=> console.log(error))

   }

   const onChangeTextHandler = (inputText, state) => {
      if(state === 'title') setTitle(inputText);
      if(state === 'price') setPrice(inputText);
      if(state === 'description') setDescription(inputText);
     
   }

   const deleteImageHandler = (imageKey) => {
      setImages(currentImage => {
         return currentImage.filter((image) => image.uri != imageKey);
      });

   }

   const addProductHandler = () => {
      
      setIsLoading(true);
      const data = {
         sellerId: userDetails._id,
         title: title,
         location: city,
         description: description,
         condition: condition,
         categories: mainCategoryValue,
         pcategories: subCategoryValue,
         price: price,
         picture: images,
         negotiation: negotiation
      };

      let formData = new FormData();

      formData.append('sellerId', userDetails._id);
      formData.append('title', title);
      formData.append('location', city);
      formData.append('description', description);
      formData.append('condition', condition);
      formData.append('categories', mainCategoryValue);
      formData.append('pcategories', subCategoryValue);
      formData.append('price', price);
      formData.append('negotiation', negotiation);

      // for (let i = 0; i < images.length; i++) {
      //    formData.append('picture', {
      //       uri: images[i].uri,
      //       type: 'image/jpeg',
      //       name: 'profile-picture'
      //    });
      // }

      // console.log(images);
      // const newImageUri = images[0].uri;
      
      // console.log(JSON.stringify(images[0].uri));
      // console.log(formData);

      fetch(`http://${CustomConstants.host}:3000/shoppay/add_product`, {
         method: 'POST', 
         headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
         },
         body: JSON.stringify({
            picture: btoa(images[0].uri)
         }),

    })
      .then(response => response.json())
      .then(data => {
         setIsLoading(false)

         // console.log(data);
         if (data.status == 1) { 
            Alert.alert(
            '',
            'You have successfully posted your product',
            [{
               text: 'Ok',
               onPress: () => console.log('You have successfully posted your product')
            }]
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

   return (
      <>
      <Header title={"Sell"} />
      <View style = {styles.container} >
         
         {
            isLoading ?
               <View style={styles.loading}>
                  <ActivityIndicator 
                     animating={isLoading}
                     size={70}
                     color = "rgb(153, 0, 115)"
                  />
               </View>
            
            : null
         }

         <ScrollView keyboardShouldPersistTaps="never" decelerationRate="fast" contentContainerStyle={styles.scrollView}>

            <View style={styles.holder}>
               <Text style={styles.headerSecondary}>Descriptive Name/Title of Product</Text>
               <View style={styles.inputContainer}>
                  <Input 
                     autoCapitalize='words' 
                     placeholder="Name of Product"
                     placeholderTextColor="#cccccc"
                     style={styles.input} 
                     onChangeText={text => onChangeTextHandler(text, 'title')}
                     blurOnSubmit={true}
                     value={title} 
                  />
               </View>
            </View>

            <View style={styles.holder}>
               <Text style={styles.headerSecondary}>Choose a category </Text>
               <View style={styles.selectBoxContainer}>
                  <SelectBox 
                     status={true}
                     selectedValue={mainCategoryValue} 
                     valueChange={onChangeHandler}
                  >
                     {mainCategories}
                  </SelectBox>
               </View>
            </View>
            
            <View style={styles.holder}>
               <Text style={styles.headerSecondary}>Sub-categories </Text>
               <View style={styles.selectBoxContainer}>
                  <SelectBox 
                     status={true}
                     selectedValue={subCategoryValue} 
                     valueChange={subChangeHandler}
                  >
                     {subCategories}
                  </SelectBox>
               </View>
            </View>

            <View style={styles.holder}>
               <Text style={styles.headerSecondary}>City</Text>
                  <TouchableWithoutFeedback
                  
                     onPress={() => {
                        console.log(locationType);
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

            <View style={styles.holder}>
               <Text style={styles.headerSecondary}>Condition</Text>
               
               <View style={styles.selectBoxContainer}>
                  
                  <Picker
                     enabled={true}
                     style={styles.selectBox}
                     selectedValue={condition}
                     onValueChange={(itemValue, itemIndex) => setCondition(itemValue)}
                  >
                     <Picker.Item label="New" value="New" />
                     <Picker.Item label="Fairly Used" value="Used" />

                  </Picker>

               </View>
            </View>

            <View style={styles.holder}>   
               <Text style={styles.headerSecondary}>Price</Text>
               <View style={styles.inputContainer}>
                  <Input 
                     placeholder="Price of Product(Numerical Value)"
                     placeholderTextColor="#cccccc"
                     keyboardType = "phone-pad"
                     style={styles.input} 
                     onChangeText={text => onChangeTextHandler(text, 'price')}
                     blurOnSubmit={true}
                     value={price} 
                  />
               </View>
            </View>

            <View style={styles.holder}>
               <Text style={styles.headerSecondary}>Description</Text>
               <View style={styles.inputContainer2}>
                  <Input 
                     placeholder="Description of Product ( Not less than 30 characters )"
                     placeholderTextColor="#cccccc"
                     style={styles.input} 
                     onChangeText={text => onChangeTextHandler(text, 'description')}
                     blurOnSubmit={true}
                     multiline={true}
                     value = {description}
                  />
               </View>
            </View>

            <View style={styles.negotiationHolder}>
               <View style={styles.negotiationTextHolder}>
                  <Text style={styles.headerSecondary}>Negotiation</Text> 
               </View>   
               <View style={styles.switchContainer}>
                  <Switch
                     trackColor={{ false: "#767577", true: "#00cc00" }}
                     thumbColor={negotiation ? "#f4f3f4" : "#f4f3f4"}
                     ios_backgroundColor="#767577"
                     onValueChange={toggleSwitch}
                     style={styles.switch}
                     value={negotiation}
                  />
               </View>
            </View>

            <View style={styles.holder}>
               <View style={styles.buttonContainer}>
                  <Button title="Add Photo" color="rgb(255, 128, 128)" onPress={pickImage} />
               </View>
               <ScrollView contentContainerStyle={styles.photoHolder} horizontal={true}>
                  {
                     images.map((image, index) =>(
                        <>
                          
                           <View key={index} style={styles.photoContainer}>
                              <Text style={styles.removeImage} onPress={()=>deleteImageHandler(image.uri)}>&times;</Text>
                           {
                              image && 
                              <Image 
                                 source={{ uri: image.uri }} 
                                 loadingIndicatorSource={require('../../assets/camera-loader.jpg')}
                                 style={styles.productImage} 
                                 
                              />
                           }
                           </View>
                        </>
                     ))
                  }
               </ScrollView>
            </View>

            <View style={styles.sellerDetailContainer}>
               <View style={styles.sellerHolder1}>
                  <Text style={styles.sellerDetails}>Seller Name:</Text> 
                  <View style={styles.seller}>
                     <Text style={styles.sellerText}>{`${userDetails.firstName} ${userDetails.lastName} `}</Text>
                  </View>

               </View>

               <View style={styles.sellerHolder}>
                  <Text style={styles.sellerDetails}>Seller Phone Number:</Text> 
                  <View style={styles.seller}>
                     <Text style={styles.sellerText}>{userDetails.telephone1} </Text>
                  </View>

               </View>
            </View>

            <View style={styles.submitButtonContainer}>
               <Button title="Post Product" color="#ff6347" onPress={addProductHandler} />
            </View>


         </ScrollView>
            
      </View>
      </>
            
   )

}

SellScreen.propTypes = {
   navigation: PropTypes.object,
};

const styles = StyleSheet.create({
   photoHolder: {
      overflow: "scroll",
      flexDirection: 'row',
      marginVertical: 10,
      
   },
   photoContainer: {
      marginRight: 10,
   },
   productImage: {
      resizeMode: "cover", 
      width: 90, 
      height: 90, 
      borderRadius: 5, 
      borderWidth: 1,
      borderColor: "#cccccc",
      elevation: 2,
   },
   holder: {
      marginVertical: 5,
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
      width: "80%",
      alignSelf: 'center',
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
      width: 300,
      height: 40,

   },
   inputContainer2: {
      flexDirection: 'row',
      marginVertical: 12,
      borderColor: '#d3d3d3',
      borderWidth: 1,
      width: 300,
      height: 90,

   },
   switchContainer: {
      alignItems: 'center',
      width: 300
   },
   
   input: {
      paddingLeft: 10,
      fontSize: 14,
      fontWeight: "bold",
      color: CustomConstants.darkGray,

   },
   headerPrimary: {
      textAlign: 'center',
      fontSize: 20,
      padding: 10,
      marginVertical: 12

   },
   headerSecondary: {
      textAlign: 'left',
      fontSize: 17,
      color: '#595959',
      fontWeight: 'bold',
   },

   negotiationHolder: {
      marginVertical: 18,
      flexDirection: "row",
   },

   removeImage:{
      fontSize: 22,
      textAlign: "right",
      fontWeight: "bold",
   },

   sellerDetailContainer:{
      backgroundColor: "white",
      padding: 20,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      marginVertical: 20,
   },
   sellerDetails: {
      textAlign: 'left',
      fontSize: 15,
      color: '#595959',
      fontWeight: 'bold',
      textTransform: "uppercase"
   },

   seller:{
      borderRadius: 8,
      width: "50%",
      padding: 3,
      marginVertical: 5,
   
   },
   sellerText:{
     textAlign: "center",
     fontWeight: "600",
     backgroundColor: CustomConstants.lightGreen,
     padding: 5,

   },
   sellerHolder1:{
     paddingVertical: 10,
   },
   sellerHolder:{
     borderBottomColor: "#595959",
     borderBottomWidth: 1,
     paddingVertical: 10,
   },
   
   
});


export default SellScreen;


