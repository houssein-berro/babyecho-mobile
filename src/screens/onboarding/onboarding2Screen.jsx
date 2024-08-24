import React from 'react';
import { Text, Image, StyleSheet } from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import Button from '../components/Button';

export default function Onboarding2Screen({ navigation }) {
  return (
    <ScreenWrapper>
      <Text style={styles.title}>Stay Informed Instantly</Text>
      <Image
        source={require('../assets/onboarding2.png')} 
        style={styles.image}
      />
      <Text style={styles.subtitle}>Get alerts when your baby needs attention.</Text>
      <Button
        title="Login"
        onPress={() => navigation.navigate('Login')}
      />
      <Button
        title="Signup"
        onPress={() => navigation.navigate('Signup')}
        outlined={true} 
        style={styles.signupButton}
      />
    </ScreenWrapper>
  );
}

