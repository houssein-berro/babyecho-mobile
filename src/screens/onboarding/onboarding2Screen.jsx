import React from 'react';
import { Text, Image, StyleSheet } from 'react-native';
import ScreenWrapper from '../../components/screenWrapper/screenWrapper';
import Button from '../../components/button/button';

export default function Onboarding2Screen({ navigation }) {
  return (
    <ScreenWrapper>
      <Text style={styles.title}>Stay Informed Instantly</Text>
      <Image
        source={require('../../assets/public/onboarding2.png')}
        style={styles.image}
      />
      <Text style={styles.subtitle}>Get alerts when your baby needs attention.</Text>
      <Button
        title="Login"
        onPress={() => navigation.replace('Login')} // Replace to avoid going back to onboarding
      />
      <Button
        title="Signup"
        onPress={() => navigation.replace('Signup')} // Replace to avoid going back to onboarding
        outlined={true}
        style={styles.signupButton}
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

  signupButton: {
    marginTop: 10,
  },
});
