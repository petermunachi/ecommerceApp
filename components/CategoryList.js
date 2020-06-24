import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
} from 'react-native';

function CategoryList(props) {
  return (

      <Text>{props.name}</Text>
  )
}

CategoryList.propTypes = {
  name: PropTypes.string
};

export default CategoryList;
