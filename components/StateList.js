
import React from 'react';
import PropTypes from 'prop-types';

import {
   StyleSheet,
   TouchableWithoutFeedback,
   View,
   AsyncStorage
} from 'react-native';

import CategoryList from '../components/CategoryList';



function StateList(props) {
    const {
       list,
       navigation,
       state,
       stateName
    } = props;

    return ( 
        <View style={styles.categoryListContainer}>
            {
               list.map((data, index) => (
                  <TouchableWithoutFeedback
                     key={index}
                     onPress = {() => {
                        if (state) {
                           navigation.push('ListScreen', {
                              status: "state",
                              stateName: data.name,
                           })
                        }else{
                           
                           AsyncStorage.setItem("region", JSON.stringify(data))
                           AsyncStorage.setItem("stateName", JSON.stringify(stateName))
                           navigation.navigate('SellScreen', {
                              stateName: stateName,
                              lgaName: data,
                           })

                        }
                     }
                     }
                  >
                     <View style={styles.categoryContainer}>
                        
                        <CategoryList
                           id={index}
                           name={data.name || data }
                        />
                     </View>
                  </TouchableWithoutFeedback>
               ))
            }
         </View>
    )
}

const styles = StyleSheet.create({
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

});

StateList.propTypes = {
   style: PropTypes.object,
   list: PropTypes.array,
   navigation: PropTypes.object,
   state: PropTypes.bool,

};

export default StateList;
