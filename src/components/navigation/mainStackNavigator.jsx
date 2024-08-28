import * as React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../../screens/home/home';
import RecordingScreen from '../../screens/recording/recording';
// import DetailsScreen from '../../screens/details/details';  // Assuming you have a DetailsScreen
import CustomHeader from '../../components/customHeader/customHeader';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeMain"
        component={HomeScreen}
        options={{
          header: () => <CustomHeader title="Home" />,
        }}
      />
      {/* <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{
          header: () => <CustomHeader title="Details" />,
        }}
      /> */}
    </Stack.Navigator>
  );
}

function RecordingStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="RecordingMain"
        component={RecordingScreen}
        options={{
          header: () => <CustomHeader title="Recording Room" />,
        }}
      />
    </Stack.Navigator>
  );
}

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Recording') {
            iconName = 'microphone';
          } else if (route.name === 'Profile') {
            iconName = 'user';
          }

          return <FontAwesome name={iconName} size={size} color={color} />;
        },
        tabBarLabel: ({ focused }) => {
          return focused ? (
            <Text style={{ fontSize: 12, color: focused ? '#FF6B6B' : 'gray' }}>
              {route.name}
            </Text>
          ) : null;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#FF6B6B',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Recording"
        component={RecordingStack}
        options={{ headerShown: false }}
      />
      {/* <Tab.Screen
        name="Profile"
        component={ProfileScreen}  // Assuming you have a ProfileScreen
        options={{ tabBarLabel: 'Profile' }}
      /> */}
    </Tab.Navigator>
  );
}
