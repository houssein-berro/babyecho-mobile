import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { validateToken } from './redux/auth/authActions';

import OnboardingNavigator from './components/navigation/onboardingNavigator';
import MainStackNavigator from './components/navigation/mainStackNavigator';
import LoginScreen from './screens/auth/loginScreen';
import SignupScreen from './screens/auth/signupScreen';
import MoonAndStarsSpinner from './components/spinner/spinner';

const Stack = createNativeStackNavigator();

export default function AppContent() {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const [initialRoute, setInitialRoute] = useState('Onboarding');

  useEffect(() => {
    const checkToken = async () => {
      const isValid = await dispatch(validateToken());
      if (isValid) {
        setInitialRoute('Main');
      } else {
        await AsyncStorage.removeItem('token');
        setInitialRoute('Onboarding');
      }
      setIsLoading(false);
    };
    checkToken();
  }, [dispatch]);

  if (isLoading) {
    return <MoonAndStarsSpinner/>;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen
          name="Onboarding"
          component={OnboardingNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Signup"
          component={SignupScreen}
          options={{ headerShown: false }}
        />
        
        <Stack.Screen
          name="Main"
          component={MainStackNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
