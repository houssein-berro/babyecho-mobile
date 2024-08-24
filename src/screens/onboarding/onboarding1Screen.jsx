import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Button from '../../components/button/button';
import ScreenWrapper from '../../components/screenWrapper/screenWrapper';

export default function Onboarding1Screen({ navigation }) {
  return (
    <ScreenWrapper>
      <Text style={styles.title}>Understand Your Baby's Needs</Text>
      <Image
        source={require('../../assets/public/onboarding1.png')} 
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
    fontSize: 28,
    fontWeight: 'bold',
    width:'80%',
    color: '#424242',
    marginBottom: 40,
  },
  image: {
    width: '100%',
    height: 250,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 60,
  },
});
