import React from 'react';
import { View, StyleSheet } from 'react-native';

const HorizontalLine = ({ style }) => {
  return <View style={[styles.line, style]} />;
};

const styles = StyleSheet.create({
  line: {
    borderBottomColor: '#e5e5e5',
    borderBottomWidth: 2,
    width: '110%',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 90
  },
});

export default HorizontalLine;
