import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../../screens/home/home';
import DetailsScreen from '../../screens/details';
import CustomHeader from '../../components/customHeader/customHeader';

const Stack = createNativeStackNavigator();

export default function MainStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          header: () => <CustomHeader title="Home" />, // Use the custom header
        }} 
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{
          header: () => <CustomHeader title="Details" />, // Use the custom header for Details as well
        }}
      />
    </Stack.Navigator>
  );
}
