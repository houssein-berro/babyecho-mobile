import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Button from '../../components/button/button';
import OnboardingScreenWrapper from '../../components/screenWrapper/onboardingScreenWrapper';

export default function Onboarding1Screen({ navigation }) {
  return (
    <OnboardingScreenWrapper>
      <Text style={styles.title}>Understand Your Baby's Needs</Text>
      <Image
        source={require('../../assets/public/onboarding1.png')} 
        style={styles.image}
      />
      <Text style={styles.subtitle}>Our cry analyzer helps you decode your baby's needs in real-time</Text>
      <Button
        title="Continue"
        onPress={() => navigation.navigate('Onboarding2')}
        style={styles.buttonContainer}
      />
    </OnboardingScreenWrapper>
  );
}

const styles = StyleSheet.create({

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    width:'80%',
    color: '#424242',
    marginBottom: 100,
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
  buttonContainer: {
    position: 'absolute',
    bottom: 30, 
    left: 40,
    right: 0,
    paddingHorizontal: 20,
  },
});
