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
  signupButton: {
    marginTop: 10,
  },
});
