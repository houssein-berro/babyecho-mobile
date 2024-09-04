import React from 'react';
import { Text, Image, StyleSheet } from 'react-native';
import OnboardingScreenWrapper from '../../components/screenWrapper/onboardingScreenWrapper';
import Button from '../../components/button/button';

export default function Onboarding2Screen({ navigation }) {
  return (
    <OnboardingScreenWrapper>
      <Text style={styles.title}>Stay Informed Instantly</Text>
      <Image
        source={require('../../assets/public/onboarding2.png')}
        style={styles.image}
      />
      <Text style={styles.subtitle}>Get alerts when your baby needs attention.</Text>
      <Button
        title="Login"
        onPress={() => navigation.replace('Login')}
        style={styles.buttonContainer}

      />
      <Button
        title="Signup"
        onPress={() => navigation.replace('Signup')} 
        outlined={true}
        style={styles.signupButton}
        
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

  signupButton: {
    position: 'absolute',
    bottom: 95, 
    left: 40,
    right: 0,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 30, 
    left: 40,
    right: 0,
    paddingHorizontal: 20,
  },
});
