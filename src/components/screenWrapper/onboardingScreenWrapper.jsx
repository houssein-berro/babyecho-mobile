import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function ScreenWrapper({ children, style }) {
  return <View style={[styles.container, style]}>{children}</View>;
}

 