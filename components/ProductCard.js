import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableNativeFeedback,
  StyleSheet
} from 'react-native';

import ImageDisplay from "../components/ImageDisplay";
import Constants from "../Constants/constants";

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
                TouchableNativeFeedback.Ripple(Constants.ripple, false, 0)
            }
        >

            <View style={{...styles.card, ...props.style}}>
                <View style={styles.logoContainer}>
                
                  <ImageDisplay
                    style={styles.tinyLogo}
                    source={require('../assets/gadgets.jpg')} 
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
    height: 145,
    overflow: "hidden",
    marginTop: 12,
  },

  logoContainer: {
    width: "40%",
    // height: "100%",
  },

  descriptionContainer: {
    width: "50%",
    paddingVertical: 45,
    paddingLeft: 8,
    paddingRight: 0,
    alignItems: "flex-start"
    // height: "100%",
  },
  headerPrimary: {
    color: "rgb(0, 0, 0)",
    fontWeight: "bold",
    fontSize: 14,
    textTransform: "capitalize",
    textAlign: "left",
  },
  headerSecondary:{
    color: Constants.darkGray,
    fontSize: 12,

  },
  headerTertiary:{
    color: Constants.darkGray,
    textTransform: "capitalize",
    fontWeight: "bold",
    fontSize: 13,

  },
  tinyLogo: {
      borderRadius: 8,
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
    backgroundColor: Constants.lightGreen,
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
