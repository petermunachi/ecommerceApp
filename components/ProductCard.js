import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableNativeFeedback,
  StyleSheet
} from 'react-native';

import ImageDisplay from "../components/ImageDisplay";
import CustomConstants from "../Constants/constants";

const ProductCard = (props) => {
    let descProps = props.productDescription;
    const desc = (descProps.length > 50) ? descProps.substr(0, 50) + '...' : descProps;

    const loadProduct = () =>{
        props.navigation.navigate('ProductScreen', {
          productId: props.id,
          productName: props.productTitle
        });
    }
    

    return(
        <TouchableNativeFeedback 
            useForeground={false} 
            // activeOpacity={0.8} 
            onPress={loadProduct}
            background = {
                TouchableNativeFeedback.Ripple(CustomConstants.ripple, false, 0)
            }
        >


            <View style={{...styles.card, ...props.style}}>
                <View style={styles.logoContainer}>
                
                  <ImageDisplay
                    style={styles.tinyLogo}
                    source = {{uri: `http://192.168.43.12:3000/${props.productPictures[0]}`}}
                  />
                </View>
                <View style={styles.descriptionContainer}>
                    <View>
                        <Text style={styles.headerPrimary}>{props.productTitle}</Text>
                    </View>
                    <View style={styles.marginVertical}>
                        <Text style={styles.headerSecondary}>
                            <Text style={styles.headerTertiary}>Desc: </Text> {desc} 
                        </Text>
                    </View>
                    <View style={styles.priceContainer}>
                        <Text style={styles.price}>&#8358;{parseInt(props.productPrice).toFixed(2)}</Text>
                    </View>
                    <View style={styles.marginVertical}>
            <Text style={styles.headerTertiary}>Seller Location: <Text style={styles.textUnderline}>{props.productLocation}</Text></Text>
                    </View>
                </View>
            </View>
        </TouchableNativeFeedback>
    );
}

const styles = StyleSheet.create({

  card: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
    backgroundColor: 'white',
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    height: 190,
    overflow: "hidden",
    marginTop: 12,
  },

  logoContainer: {
    width: "40%",
    // height: "100%",
  },

  descriptionContainer: {
    width: "60%",
    paddingVertical: "15%",
    paddingLeft: 8,
    paddingRight: 0,
    // height: "100%",
  },
  headerPrimary: {
    color: "rgb(0, 0, 0)",
    fontWeight: "bold",
    fontSize: 17,
    textTransform: "capitalize",
    textAlign: "left",
  },
  headerSecondary:{
    color: CustomConstants.darkGray,
    fontSize: 14,
    textAlign: "left",

  },
  headerTertiary:{
    color: CustomConstants.darkGray,
    textTransform: "capitalize",
    fontWeight: "bold",
    fontSize: 15,

  },
  tinyLogo: {
      borderRadius: 8,
      resizeMode: "cover",
      overflow: "hidden",
  },
  textUnderline:{
    color: "rgb(0, 0, 0)",
    textTransform: "capitalize",
    textDecorationLine: "underline",
  },
  marginVertical: {
      marginVertical: 8,
  },
  priceContainer:{
    backgroundColor: CustomConstants.lightGreen,
    borderRadius: 8,
    width: 80,
    padding: 3,
  },
  price: {
      textAlign: "center",
      fontWeight: "bold",
  }

});

export default ProductCard;
