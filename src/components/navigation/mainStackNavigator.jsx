import React from 'react';
import { Text, Animated } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../../screens/home/homeScreen';
import RecordingScreen from '../../screens/recording/recordingScreen';
import AddBabyScreen from '../../screens/addBaby/addBabyScreen';
import BabyRecordingsScreen from '../../screens/babyRecordingsScreen/babyRecordingsScreen'; // Import BabyRecordingsScreen
import CustomHeader from '../../components/customHeader/customHeader';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import BirthdaysScreen from '../../screens/birthdays/birthdaysScreen';
import TipsScreen from '../../screens/tips/tipsScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Home stack
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
      <Stack.Screen
        name="Tips"
        component={TipsScreen}
        options={{
          header: () => <CustomHeader title="Tips" />,
        }}
      />
    </Stack.Navigator>
  );
}


// Recording stack
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

// Birthdays stack
function BirthdayStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BirthdaysMain"
        component={BirthdaysScreen}
        options={{
          header: () => <CustomHeader title="Birthdays" />,
        }}
      />
    </Stack.Navigator>
  );
}

// Baby stack (Add Baby + Baby Recordings)
function BabyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AddBabyMain"
        component={AddBabyScreen}
        options={{
          header: () => <CustomHeader title="Add Baby" />,
        }}
      />
      <Stack.Screen
        name="BabyRecordingsScreen"
        component={BabyRecordingsScreen}
        options={{
          header: () => <></>,
        }}      />
    </Stack.Navigator>
  );
}

// Custom tab bar icon component
function TabBarIcon({ name, color, size, focused }) {
  const scaleValue = new Animated.Value(focused ? 1.2 : 1);

  React.useEffect(() => {
    Animated.spring(scaleValue, {
      toValue: focused ? 1.2 : 1,
      friction: 4,
      useNativeDriver: true,
    }).start();
  }, [focused]);

  return (
    <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
      {name === 'devices' ? (
        <MaterialIcons name={name} size={size} color={color} />
      ) : name === 'cake' ? (
        <Entypo name={name} size={size} color={color} />
      ) : (
        <FontAwesome name={name} size={size} color={color} />
      )}
    </Animated.View>
  );
}

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: "#EF8D7F",
        tabBarInactiveTintColor: "gray",
        tabBarShowLabel: true,
        tabBarStyle: [{ display: 'flex' }, null],
        tabBarIcon: ({ color, size, focused }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Recording') {
            iconName = 'microphone';
          } else if (route.name === 'Birthdays') {
            iconName = 'cake'; // Entypo cake icon
          } else if (route.name === 'AddBaby') {
            iconName = 'plus';
          }

          return (
            <TabBarIcon
              name={iconName}
              color={color}
              size={size}
              focused={focused}
            />
          );
        },
        tabBarLabel: ({ focused, color }) => (
          <Text style={{ fontSize: 12, color: color }}>
            {route.name}
          </Text>
        ),
        tabBarStyle: {
          height: 50,
          paddingVertical: 7,
          backgroundColor: '#f7f8fa',
        },
      })}
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
      <Tab.Screen
        name="Birthdays"
        component={BirthdayStack}
        options={{ headerShown: false }} 
      />
      <Tab.Screen
        name="AddBaby"
        component={BabyStack}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}
