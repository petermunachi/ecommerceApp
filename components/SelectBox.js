import React from 'react';
import PropTypes from 'prop-types';

import {
    Picker,
    StyleSheet
} from 'react-native';


function SelectBox(props) {
    const { mode, selectedValue, status, style, children, press } = props;

    function capitalizeFirstLetter(string) {
      return string[0].toUpperCase() + string.slice(1);
    }

    return ( 
      <Picker
        enabled={status}
        onPress={press}
        mode={mode}
        selectedValue={selectedValue}
        style={{ ...styles.pickerHeader, ...style}}
        onValueChange = { props.valueChange }
      >
        {
          children.map((data) => (
            <Picker.Item key={data._id} label={capitalizeFirstLetter(data.name)} value={data._id} />
          ))
        }
      </Picker>
    )
}

const styles = StyleSheet.create({
  pickerHeader: {
    height: 70,
    width: '100%',
    borderColor: 'black',
    borderWidth: 5,
  }

});

SelectBox.propTypes = {
  mode: PropTypes.string,
  selectedValue: PropTypes.number,
  style: PropTypes.object,
  children: PropTypes.array,
  valueChange: PropTypes.func,
  status: PropTypes.bool,

};

export default SelectBox;
