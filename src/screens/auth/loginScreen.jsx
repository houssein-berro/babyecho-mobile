import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Animated, KeyboardAvoidingView, Platform } from 'react-native';
import ScreenWrapper from '../../components/screenWrapper/screenWrapper';
import Button from '../../components/button/button';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [slideAnim] = useState(new Animated.Value(300)); // Start position (off-screen)

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0, // End position (on-screen)
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, [slideAnim]);

  return (
    <ScreenWrapper>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        <Animated.View style={[styles.container, { transform: [{ translateY: slideAnim }] }]}>
          <View style={styles.logoContainer}>
            <Image
              source={require('../../assets/public/logo.png')}
              style={styles.logo}
            />
          </View>
          <View style={styles.coloredContainer}>
            <View style={styles.formContainer}>
              <Text style={styles.title}>Login</Text>
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor="#9E9E9E"
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholderTextColor="#9E9E9E"
              />
              <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                <Text style={styles.forgotPassword}>Forgot your password?</Text>
              </TouchableOpacity>
              <Button
                title="Login"
                onPress={() => navigation.navigate('Main')}
              />
            </View>
            <View style={styles.signupWrapper}>
              <Text style={styles.signupText}>Don't have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <Text style={styles.signupLink}>Sign up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 10, 
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  coloredContainer: {
    padding: 20,
    backgroundColor: '#F7F8FA', 
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 1,
  },
  formContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#424242',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    backgroundColor: '#FAFAFA',
    marginBottom: 15,
    fontSize: 16,
  },
  forgotPassword: {
    color: '#007BFF',
    textAlign: 'right',
    marginBottom: 20,
    fontWeight: '500',
    fontSize: 14,
  },
  signupWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  signupText: {
    fontSize: 14,
    color: '#757575',
  },
  signupLink: {
    fontSize: 14,
    color: '#007BFF',
    fontWeight: '600',
  },
});
