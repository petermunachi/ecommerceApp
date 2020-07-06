import React, {
    Component
} from 'react';
import PropTypes from 'prop-types'

import {
    View,
    Text,
    AsyncStorage,
    ScrollView,
    TouchableWithoutFeedback,
    BackHandler,
    StyleSheet,
} from 'react-native';
import AnimatedLoader from "react-native-animated-loader";
import CategoryList from '../components/CategoryList';
import StateList from '../components/StateList';

import { useFocusEffect } from '@react-navigation/native';




class ListScreen extends Component {

   constructor(props) {
      super(props);

      this.state = {
         isLoading: false,
         state: true,
         list: [],
         stateName: ''

      };

   }

   
   componentDidMount() {
      const {status, stateName} = this.props.route.params;

      console.log(stateName);
      

      if (stateName !== undefined) {
         this.setState({state: false})

         let item = `${stateName}lga`.replace(/\s/g, "");

         fetch(`http://locationsng-api.herokuapp.com/api/v1/states/${stateName}/lgas`)
            .then(response => response.json())
            .then(function (data) {
               // console.log(JSON.stringify(data));

               AsyncStorage.setItem(`${item}`, JSON.stringify(data));

            })
            .catch((error) => {
               console.log('Error:', error);
            });
   
          
         AsyncStorage.getItem(`${item}`.replace(/\s/g, ""))
            .then((value) => {
               if (value !== null) {
                  // We have data!!
                  console.log(value);
                  this.setState({
                     list: JSON.parse(value),
                     stateName: stateName
                  })
               }
               
            })
            .catch((error) => {
                  console.log('Error L:', error);
            });
            
         }else{
            fetch('http://locationsng-api.herokuapp.com/api/v1/states')
               .then(response => response.json())
               .then(function (data) {
                  // console.log(JSON.stringify(data));
                  AsyncStorage.setItem('nigerianstates', JSON.stringify(data));
               })
               .catch((error) => {
                  console.log('Error re:', error);
               });
      
             
            AsyncStorage.getItem('nigerianstates')
               .then((value) => {
                  if (value !== null) {
                     // We have data!!
                     console.log(value);
                     this.setState({
                        list: JSON.parse(value)
                     })
                  }

               })
               .catch((error) => {
                     console.log('Error:', error);
               });

         }
                  
   }

   render() {
      const { isLoading, list, state, stateName} = this.state;

      let content = <StateList list={list} name={'State'} state={true} navigation={this.props.navigation} />
      
      if (!state) {
         content = <StateList list={list} stateName={stateName}  state={false} navigation={this.props.navigation} />

      }
            

      return ( 
         <View>
            <Text style={styles.headerPrimary}>LIST SCREEN </Text>
            <ScrollView style={styles.scrollView}>
               {content}
            </ScrollView>
         </View>
         
      );
   }
}

const styles = StyleSheet.create({
   screen: {
      flex: 1,
   },
   scrollView: {
      marginTop: 20,
   },
   categoryListContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: 20,
      marginBottom: 10
   },
   categoryContainer: {
      margin: 5,
      width: '100%',
      borderBottomColor: '#e6e6e6',
      borderBottomWidth: 1,
      padding: 8,
   },
   headerPrimary: {
      textAlign: 'center',
      fontSize: 20
   },
   lottie: {
      width: 100,
      height: 100,
   }

});

ListScreen.propTypes = {
   route: PropTypes.object,
   productId: PropTypes.number,
   productName: PropTypes.string,
};
export default ListScreen;
