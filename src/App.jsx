import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingNavigator from './components/navigation/onboardingNavigator';
// import LoginScreen from './screens/LoginScreen';
// import SignupScreen from './screens/SignupScreen';
  import MainStackNavigator from './components/navigation/mainStackNavigator'; // Assuming you have a main app navigator

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Onboarding">
        <Stack.Screen
          name="Onboarding"
          component={OnboardingNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={MainStackNavigator}
          options={{ headerShown: false }}
        />
        {/* <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
