import React from 'react';
import { map } from 'lodash';
import { Picker, View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  PickerContainer: {
    marginTop: 20,
    alignItems: 'center',
    flexDirection: 'column',
  },
});

const CampPicker = ({ value, onChange, camps }) => (
  <View style={styles.PickerContainer}>
    <Text>Select camp</Text>
    <Picker
      style={{ height: 50, width: 250 }}
      selectedValue={value}
      onValueChange={onChange}
    >
      <Picker.Item label="No camp selected" />
      {map(camps, (camp, id) => (
        <Picker.Item key={id} label={camp.name} value={id} />
      ))}
    </Picker>
  </View>
);
export default CampPicker;
