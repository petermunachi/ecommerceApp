import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


function Header() {


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
