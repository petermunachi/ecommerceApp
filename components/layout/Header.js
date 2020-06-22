import React, {useState, useEffect} from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import Input from '../Input';



function Header(props) {


  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>STATUS BAR </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    justifyContent: 'center',
    alignItems: 'center'
  },

  headerTitle:{
    color: 'black',
    fontSize: 18
  }
});

export default Header;
