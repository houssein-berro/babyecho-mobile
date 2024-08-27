import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../../screens/home/home';
import DetailsScreen from '../../screens/details';
import CustomHeader from '../../components/customHeader/customHeader';
import RecordingScreen from '../../screens/recording/recording';

const Stack = createNativeStackNavigator();

export default function MainStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Recording">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          header: () => <CustomHeader title="Home" />,
        }} 
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{
          header: () => <CustomHeader title="Details" />,
        }}
      />
       <Stack.Screen
        name="Recording"
        component={RecordingScreen}
        options={{
          header: () => <CustomHeader title="Recording Room" />,
        }}
      />
    </Stack.Navigator>
  );
}
