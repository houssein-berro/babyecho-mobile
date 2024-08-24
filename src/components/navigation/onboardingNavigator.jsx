import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Onboarding1Screen from '../../screens/onboarding/onboarding1Screen';
import Onboarding2Screen from '../../screens/onboarding/onboarding2Screen';

const OnboardingStack = createNativeStackNavigator();

export default function OnboardingNavigator() {
  return (
    <OnboardingStack.Navigator initialRouteName="Onboarding1">
      <OnboardingStack.Screen
        name="Onboarding1"
        component={Onboarding1Screen}
        options={{ headerShown: false }}
      />
      <OnboardingStack.Screen
        name="Onboarding2"
        component={Onboarding2Screen}
        options={{ headerShown: false }}
      />
    </OnboardingStack.Navigator>
  );
}
