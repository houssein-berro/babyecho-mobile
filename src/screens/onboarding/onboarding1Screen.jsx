import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Button from '../components/Button';

export default function Onboarding1Screen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Understand Your Baby's Needs</Text>
      
      <Text style={styles.subtitle}>Our cry analyzer helps you decode your baby's needs in real-time</Text>
      <Button
        title="Continue"
        onPress={() => navigation.navigate('Onboarding2')}
      />
    </View>
  );
}

