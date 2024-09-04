import React from 'react';
import { Text, Animated, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../../screens/home/homeScreen';
import RecordingScreen from '../../screens/recording/recordingScreen';
import AddBabyScreen from '../../screens/addBaby/addBabyScreen';
import CustomHeader from '../../components/customHeader/customHeader';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import TipsScreen from '../../screens/tips/tipsScreen';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ConnectedDevicesScreen from '../../screens/devices/devicesScreen';

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

function DeviceStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Devices"
        component={ConnectedDevicesScreen}
        options={{
          header: () => <CustomHeader title="Connected Devices" />,
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
      {name === 'devices' ? (
        <MaterialIcons name={name} size={size} color={color} />
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
        tabBarIcon: ({ color, size, focused }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Recording') {
            iconName = 'microphone';
          } else if (route.name === 'Babies') {
            iconName = 'plus';
          } else if (route.name === 'Devices') {
            iconName = 'devices';
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
      tabBarOptions={{
        activeTintColor: '#EF8D7F',
        inactiveTintColor: 'gray',
        showLabel: true,
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
        name="Devices"
        component={DeviceStack}
        options={{ headerShown: false }}
      /> */}
      <Tab.Screen
        name="Babies"
        component={BabyStack}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}
