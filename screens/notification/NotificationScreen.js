import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ImageDisplay from '../../components/ImageDisplay';
import EmptyDisplay from '../../components/EmptyDisplay';
import Constants from '../../Constants/constants';
import Wrapper from '../../HOC/Wrapper';






function NotificationScreen(props) {

  const [ dataLoaded, setDataLoaded ] = useState(false);

   return (
      <Wrapper>
        {
          dataLoaded ? 
            <View style={styles.container}>

             
                      
              <View style={styles.textContainer}>
                <Text style={styles.headerPrimary}>Comming Soon!</Text>
              </View>
              

            </View>
     
          : <EmptyDisplay screen="Notification" />
        }
     
      </Wrapper>
   );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: 'center',
    justifyContent: "center",
    paddingTop: "80%",
  },

  imageContainer: {
    width: "70%",
    height: 100,
    marginVertical: 13,

  },
  textContainer: {
    marginTop: 22,
  },
  headerPrimary: {
    textAlign: 'center',
    fontSize: 21,
    fontWeight: "bold",
    color: Constants.darkGray,
    textTransform: 'capitalize',
  },
  headerSecondary: {
    textAlign: 'center',
    fontSize: 17,
    fontWeight: "bold",
    color: Constants.lightGray,
    textTransform: 'capitalize',
  },

});

export default NotificationScreen;
