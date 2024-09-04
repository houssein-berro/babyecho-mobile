import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  FlatList,
} from 'react-native';
import {useSelector} from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomHeader from '../../components/customHeader/customHeader';
import ScreenWrapper from '../../components/screenWrapper/screenWrapper';

export default function ConnectedDevicesScreen({navigation}) {
  const [devices, setDevices] = useState([]);
  const [searchText, setSearchText] = useState('');
  const user = useSelector(state => state.user.user);

  useEffect(() => {
    // Fetch user's connected devices from the backend or state
    const fetchedDevices = user?.devices || []; // Replace with actual data fetching logic
    setDevices(fetchedDevices);
  }, [user]);

 