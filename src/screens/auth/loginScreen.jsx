import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Animated, KeyboardAvoidingView, Platform } from 'react-native';
import ScreenWrapper from '../../components/screenWrapper/screenWrapper';
import Button from '../../components/button/button';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fadeAnim] = useState(new Animated.Value(0));

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <ScreenWrapper>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
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


