import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'

import {
  View,
  Text,
  AsyncStorage,
  Alert,
  ScrollView,
  ActivityIndicator,
  Keyboard,
  StyleSheet,
} from 'react-native';

import { product } from '../../testData';
import Header from '../../components/layout/Header';
import ImageDisplay from '../../components/ImageDisplay';
import Constants from '../../Constants/constants';

import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Contacts from 'expo-contacts';



function ProductScreen (props) {

  const [productDetails, setProductDetails] = useState({});
  const [userDetails, setUserDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  

  useEffect(() => {
    const { productId, productName } = props.route.params;
    setIsLoading(true);


    fetch(`http://192.168.43.12:3000/productsss`)
      .then((resp) => resp.json())
      // eslint-disable-next-line no-unused-vars
      .then(function(data) {
        console.log(data);
        
        // AsyncStorage.setItem(item, JSON.stringify(data));
        // setProductDetails(data)
        setProductDetails(product)

        setIsLoading(false);

      })
      .catch((error) => {
        setIsLoading(false);
        console.log('Error:', error);
        console.log(product);
        setProductDetails(product)

        // AsyncStorage.setItem(item, JSON.stringify(product));

      });
      setIsLoading(false);


    // AsyncStorage.getItem(item)
    //   .then((value) => setProductDetails(JSON.parse(value)))

  },[])


   const addWhishHandler = () => {

      setIsLoading(true);
      const data = {
         _id: ''
      };


      fetch(`http://${Constants.host}:3000/shoppay/add_wish`, {
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
            'Product added to your wish',
            [{ text: 'Ok', onPress: ()=> console.log('Product added to your wish') }]
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



  const { productName } = props.route.params;

  return (
    <>
    <Header title={props.route.params.productName} />
    <View style={styles.screen}>
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
      <ScrollView decelerationRate="fast" contentContainerStyle={styles.scrollView}>
        <View style={styles.titleContainer}>
          <Text style={styles.headerPrimary}> {productName} </Text>

        </View>

        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <ImageDisplay
              style={styles.tinyLogo}
              source={require('../../assets/gadgets.jpg')} 
            />
          </View>

          <ScrollView contentContainerStyle={styles.photoHolder} horizontal={true}>
            <View style={styles.photoContainer}>
              <ImageDisplay
                style={styles.tinyLogo}
                source={require('../../assets/gadgets.jpg')} 
              />
            </View>
            <View style={styles.photoContainer}>
              <ImageDisplay
                style={styles.tinyLogo}
                source={require('../../assets/gadgets.jpg')} 
              />
            </View>
            <View style={styles.photoContainer}>
              <ImageDisplay
                style={styles.tinyLogo}
                source={require('../../assets/gadgets.jpg')} 
              />
            </View>
            <View style={styles.photoContainer}>
              <ImageDisplay
                style={styles.tinyLogo}
                source={require('../../assets/gadgets.jpg')} 
              />
            </View>
          </ScrollView>

          <View style={styles.priceViewContainer}>
            <View style={styles.priceContainer}>
                <Text style={styles.price}>&#8358;{1000}</Text>
            </View>
            <View style={styles.viewContainer}>
                <Text style={styles.price}>{2000} Views</Text>
            </View>

          </View>
          <View style={styles.detailsContainer}>
            <View style={styles.profileImageContainer}>
              <View style={styles.detailsImageContainer}>

                <ImageDisplay
                  style={styles.profile}
                  source={require('../../assets/gadgets.jpg')}
                /> 
              </View>
            </View>
            <View style={styles.nameLocationContainer}>
              <View>
                <Text style={styles.name}>peter munachi</Text>
              </View>
              <View>
                <Text style={styles.location}>Seller Location: <Text style={styles.textUnderline}>Enugu</Text></Text>

              </View>
            </View>
            <View style={styles.nameContainer}>
              <View style={styles.iconImageContainer}>
                <Ionicons name="logo-whatsapp" size={40} color="#00ff00" />  
              {/* <ImageDisplay
                  style={styles.profile}
                  source={require('../../assets/gadgets.jpg')}
                />                  */}

              </View>
              <View style={styles.iconImageContainer}>
                <Ionicons name="md-cart" size={40} color="rgb(153, 0, 153)" />
                {/* <ImageDisplay
                  style={styles.profile}
                  source={require('../../assets/gadgets.jpg')}
                />                  */}

              </View>
            </View>

          </View>
        
           <View style={styles.descriptionContainer}>
             <Text style={styles.description}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.Voluptates vel, ea suscipit provident maxime dolores!Dolores animi eius facilis iste eos et earum doloremque accusantium nulla ducimus, aspernatur, assumenda error ipsum laboriosam corrupti ratione consequatur illum sint dicta adipisci voluptates 
             </Text>
           </View>
        </View>

      </ScrollView>
    </View>
    </>
  );

}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width: "100%"
  },
  photoHolder: {
    overflow: "scroll",
    flexDirection: 'row',
    marginVertical: 20,

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
  photoContainer: {
    marginRight: 10,
    width: 100,
    height: 100,
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
  scrollView: {
    marginHorizontal: 20,
    // marginBottom: 100,
    paddingBottom: 50,
    paddingTop: 20,
    backgroundColor: "white",
    elevation: 2,
    // height: 500,
  },
  tinyLogo: {
    borderRadius: 8,
  },
  profile: {
    borderRadius: 50,
  },
 
  titleContainer: {
    marginBottom: 30,
    marginHorizontal: 15,
  },
  headerPrimary: {
    textAlign: 'left',
    fontSize: 18,
    fontWeight: 'bold',
  },
  name: {
    textAlign: 'left',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: "capitalize",
    paddingVertical: 5,
  },
  imageContainer:{
    width: "100%",
    height: 150,
  },
  location: {
    color: Constants.darkGray,
    fontSize: 13,

  },
  textUnderline: {
    color: "rgb(0, 0, 0)",
    textTransform: "capitalize",
    textDecorationLine: "underline",
  },
 detailsContainer:{
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    // alignSelf: "center",
    // justifyContent: "space-around",
  },
 descriptionContainer:{
    marginHorizontal: 20,
    // alignSelf: "center",
    // justifyContent: "space-around",
  },
  description:{
    fontSize: 15,
    lineHeight: 25,
    textAlign: "justify"
  },
 nameContainer: {
    flexDirection: "row",
    // alignItems: "center",
    // justifyContent: "space-around",
  },
  detailsImageContainer: {
    width: 60,
    height: 60,
    margin: 10,

  },
  iconImageContainer: {
    width: 35,
    height: 35,
    margin: 10,
  },
  
  priceViewContainer:{
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  priceContainer:{
    backgroundColor: Constants.lightGreen,
    borderRadius: 8,
    width: 100,
    padding: 3,
    elevation: 2,
  },
  viewContainer:{
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 3,
    width: 100,
    elevation: 2,


  },
  price: {
      textAlign: "center",
      fontWeight: "bold",
  },


});

ProductScreen.propTypes = {
  route: PropTypes.object,
  productId: PropTypes.number,
  productName: PropTypes.string,
};

export default ProductScreen;
