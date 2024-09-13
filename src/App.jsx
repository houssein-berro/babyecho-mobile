import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import AppContent from './AppContent';
import messaging from '@react-native-firebase/messaging';
import {PermissionsAndroid} from 'react-native';

export default function App() {

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
    if (enabled) {
      console.log('Authorization status:', authStatus);
      // Get FCM token after permission is granted
      getToken();
    }
  }

  // Function to retrieve FCM token
  const getToken = async () => {
    try {
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        console.log('FCM Token:', fcmToken);
        // You can send the token to your server or store it as needed
      } else {
        console.log('Failed to get FCM token');
      }
    } catch (error) {
      console.error('Error getting FCM token:', error);
    }
  };

  // Listener for token refresh
  const onTokenRefreshListener = () => {
    messaging().onTokenRefresh(token => {
      console.log('FCM Token refreshed:', token);
      // Handle token refresh, send it to your server or update the token storage
    });
  };

  useEffect(() => {
    const requestNotificationPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Notification permission granted');
        } else {
          console.log('Notification permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    };
  
    requestNotificationPermission();
    requestUserPermission();
    onTokenRefreshListener(); // Start token refresh listener
    console.log('hi');

    // Clean up the token refresh listener when the component unmounts
    return () => {
      messaging().onTokenRefresh(() => {});
    };
  }, []);
  
  return <Provider store={store}><AppContent /></Provider>;
}
