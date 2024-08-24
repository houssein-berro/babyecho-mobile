import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Button from '../components/Button';
import ScreenWrapper from '../../components/screenWrapper/screenWrapper';

export default function Onboarding1Screen({ navigation }) {
  return (
    <ScreenWrapper>
      <Text style={styles.title}>Understand Your Baby's Needs</Text>
      <Image
        source={require('../assets/onboarding1.png')} 
        style={styles.image}
      />
      <Text style={styles.subtitle}>Our cry analyzer helps you decode your baby's needs in real-time</Text>
      <Button
        title="Continue"
        onPress={() => navigation.navigate('Onboarding2')}
      />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 20,
  },
  image: {
    width: 250,
    height: 250,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 30,
  },
});
