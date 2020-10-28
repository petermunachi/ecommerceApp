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
  const [showDefaultImage, setShowDefaultImage] = useState([]);

    let descProps = props.productDescription;
    const desc = (descProps.length > 50) ? descProps.substr(0, 50) + '...' : descProps;

    const loadProduct = () =>{
        props.navigation.navigate('ProductScreen', {
          productId: props.id,
          productName: props.productTitle
        });
    }

    var image = props.productPictures.length == 0 ? require('../assets/camera-loader.jpg') : { uri: props.productPictures[0] }
    

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
                    source = { image}
                    loadingIndicatorSource={require('../assets/camera-loader.jpg')}
                  />
                </View>
                <View style={styles.descriptionContainer}>
                    <View>
                        <Text style={styles.headerPrimary}>{props.productTitle}</Text>
                    </View>
                    <View style={styles.description}>
                        <Text style={styles.headerSecondary}>
                        <Text style={styles.headerTertiary}>Desc: </Text> 
                            {desc} 
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
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    // height: 170,
    // overflow: "hidden",
    marginTop: 12,
  },

  logoContainer: {
    width: 130,
    // height: "100%",
  },

  descriptionContainer: {
    paddingVertical: 10,
    paddingLeft: 8,
    paddingRight: 5,
    flex: 1,
    
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
  description: {
    marginVertical: 8,
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
    flexDirection: "row",
  },
  price: {
    textAlign: "left",
    fontWeight: "bold",
    backgroundColor: CustomConstants.lightGreen,
    borderRadius: 8,
    padding: 5,
  }

});

export default ProductCard;
