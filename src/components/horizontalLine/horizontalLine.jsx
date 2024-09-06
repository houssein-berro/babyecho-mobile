import React from 'react';
import { View, StyleSheet } from 'react-native';

const HorizontalLine = ({ bottom }) => {
  return <View style={[styles.line, { bottom: bottom }]} />;
};

const styles = StyleSheet.create({
  line: {
    borderBottomColor: '#e5e5e5',
    borderBottomWidth: 2,
    width: '110%',
    alignSelf: 'center',
    position: 'absolute',
  },
});

export default HorizontalLine;
