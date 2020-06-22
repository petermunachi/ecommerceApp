import React from 'react';
import {
  Text,
  View,
  TouchableWithoutFeedback,
  StyleSheet
} from 'react-native';

function CategoryList(props) {
  return (

      <Text>{props.name}</Text>
  )
}

const styles = StyleSheet.create({

  categoryContainer: {
    margin: 10,
  }

});

export default CategoryList;
