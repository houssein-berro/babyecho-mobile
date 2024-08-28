import React from 'react';
import { Text, Animated, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../../screens/home/home';
import RecordingScreen from '../../screens/recording/recording';
import AddBabyScreen from '../../screens/addBaby/addBabyScreen';
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

function BabyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AddBaby"
        component={AddBabyScreen}
        options={{
          header: () => <CustomHeader title="Add Baby" />,
        }}
      />
    </Stack.Navigator>
  );
}

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
      <FontAwesome name={name} size={size} color={color} />
    </Animated.View>
  );
}

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size, focused }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Recording') {
            iconName = 'microphone';
          } else if (route.name === 'Babies') {
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
        tabBarLabel: ({ focused }) => (
          focused ? (
            <Text style={{ fontSize: 12, color: '#FF6B6B' }}>
              {route.name}
            </Text>
          ) : null
        ),
      })}
      tabBarOptions={{
        activeTintColor: '#FF6B6B',
        inactiveTintColor: 'gray',
        style: {
          backgroundColor: '#f7f8fa',
          borderTopWidth: 0,
          elevation: 5,
        },
        labelStyle: {
          fontSize: 12,
        },
        tabStyle: {
          paddingVertical: 5,
        },
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
      <Tab.Screen
        name="Babies"
        component={BabyStack}
        options={{  headerShown: false }}
      />
    </Tab.Navigator>
  );
}
