import React, { useState, useEffect } from 'react';

import { 
   View,
   Text,
   AsyncStorage,
   ScrollView,
   Picker,
   TouchableWithoutFeedback,
   StyleSheet
} from 'react-native';

import SelectBox from '../../components/SelectBox';
import Input from '../../components/Input';
import { productMainCategories, productSubCategories } from '../testData';
import AnimatedLoader from "react-native-animated-loader";



function SellScreen (props) {

  
   // STATES
   const [productDetails, setProductDetails] = useState([]);
   const [mainCategories, setMainCategories] = useState([]);
   const [subCategories, setSubCategories] = useState([]);
   const [selectedValue, setSelectedValue] = useState('');
   const [categoryName, setCategoryName] = useState('');
   const [categoryValue, setCategoryValue] = useState('');
   const [lga, setLga] = useState('');
   const [stateName, setStateName] = useState('');
   const [isLoading, setIsLoading] = useState(false);
   const [selectBoxStatus, setSelectBoxStatus] = useState(true);



   useEffect(() => {

      let itemKey = `${categoryName}subcategories`.replace(/\s/g, "");


      fetch('/api/productCategories')
         .then(response => response.json())
         .then(function (data) {
            AsyncStorage.setItem('productmaincategories', JSON.stringify(productMainCategories));
         })
         .catch((error) => {
            AsyncStorage.setItem('productmaincategories', JSON.stringify(productMainCategories));
         });

      AsyncStorage.getItem('productmaincategories')
         .then((value) => setMainCategories(JSON.parse(value)))
         .catch((error) => {
            console.log('Error:', error);
         });
       

      fetchSubCategories(itemKey);


   },[])


    function fetchSubCategories(itemKey) {
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

   // componentDidUpdate(prevProps, prevState) {

   //     AsyncStorage.getItem('region')
   //        .then((value) => {
   //           if (value !== null) {
   //              console.log('hi',value);
                
         
   //              this.setState({
   //                 lga: value
   //              })
   //           }

   //        })
   //        .catch((error) => {
   //           console.log('Error:', error);
   //        });
   //     AsyncStorage.getItem('stateName')
   //        .then((value) => {
   //           if (value !== null) {
   //              console.log('histate ',value);
            
   //              this.setState({
   //                 stateName: value
   //              })
   //           }

   //        })
   //        .catch((error) => {
   //           console.log('Error:', error);
   //        });

      
   // }
   

   function onChangeHandler(itemValue, itemIndex) {
      console.log('kke');
      
      setSelectedValue(itemValue);

      fetchSubCategories();
   }
   function subChangeHandler(itemValue, itemIndex) {
      setCategoryValue(itemValue)
   }
   
   
   return (
      
      <View style = {styles.container} >
         <Text style={styles.headerPrimary}>SELL SCREEN </Text>
         < AnimatedLoader 
            visible = { isLoading }
            overlayColor = "rgba(255,255,255,0.75)"
            animationStyle = {styles.lottie}
            speed = { 1 }
         />
         <ScrollView style={styles.scrollView}>

            <View>
               <Text style={styles.headerSecondary}>Choose A Category </Text>
               <View style={styles.selectBoxContainer}>
                  <SelectBox 
                     status={true}
                     mode="dropdown" 
                     selectedValue={selectedValue} 
                     valueChange={this.onChangeHandler}
                     >
                     {mainCategories}
                  </SelectBox>
               </View>
            </View>
            
            <View>
               <Text style={styles.headerSecondary}>Sub Categories </Text>
               <View style={styles.selectBoxContainer}>
                  <SelectBox 
                     status={selectBoxStatus}
                     mode="dropdown" 
                     selectedValue={categoryValue} 
                     valueChange={this.subChangeHandler}
                  >
                     {subCategories}
                  </SelectBox>
               </View>
            </View>

            <View>
               <Text style={styles.headerSecondary}>City</Text>
                  <TouchableWithoutFeedback
                     onPress={() => {
                        this.props.navigation.push('ListScreen', {
                           status: "state",
                           stateName: stateName,
                        })
                        
                     }}
                  >
                     <View style={styles.selectBoxContainer}>
                        
                        <Picker
                           enabled={false}
                           style={{ height: 50, width: '100%' }}
                        >
                           <Picker.Item label={'peter'} value={'peter'} />
                        </Picker>
                     </View>
                  </TouchableWithoutFeedback>
            </View>

            <View style={styles.selectBoxContainer}>
               <Text style={styles.headerSecondary}>Name / Title</Text>
               <Input />
            </View>
            <View style={styles.selectBoxContainer}>
               <Text style={styles.headerSecondary}>Condition</Text>
               <Input />
            </View>
            <View style={styles.selectBoxContainer}>
               <Text style={styles.headerSecondary}>Second Condition</Text>
               <Input />
            </View>
            <View style={styles.selectBoxContainer}>
               <Text style={styles.headerSecondary}>Price</Text>
               <Input />
            </View>
            <View style={styles.selectBoxContainer}>
               <Text style={styles.headerSecondary}>Description</Text>
               <Input style={{height: 70}} />
            </View>


         </ScrollView>
         
      </View>
   )

}

SellScreen.propTypes = {
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

   categoryContainer: {
      margin: 10,
   },
   scrollView: {
      marginTop: 20,
   },
   selectBoxContainer: {
      flexDirection: 'row',
      marginVertical: 12,
      alignItems: 'center',
      borderColor: '#d3d3d3',
      borderWidth: 1,
      height: 40,
      width: 300
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
   },
   
});

