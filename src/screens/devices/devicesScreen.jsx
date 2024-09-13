import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Modal,
  Animated,
  Keyboard,
  Dimensions,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ScreenWrapper from '../../components/screenWrapper/screenWrapper';
import ButtonComponent from '../../components/button/button';
import HorizontalLine from '../../components/horizontalLine/horizontalLine';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { fetchDevices, addNewDevice } from '../../redux/devices/devicesActions';

export default function ConnectedDevicesScreen({ navigation }) {
  const [deviceName, setDeviceName] = useState('');
  const [ipAddress, setIpAddress] = useState('');
  const devices = useSelector((state) => state.devices.devices);
  const loading = useSelector((state) => state.devices.loading);
  const dispatch = useDispatch();

  const [showAddDevice, setShowAddDevice] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false); // Detect keyboard

  useEffect(() => {
    dispatch(fetchDevices()); // Fetch devices when component mounts
  }, [dispatch]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleAddDevice = () => {
    if (!deviceName || !ipAddress) {
      alert('Please enter all fields (device name and IP address).');
      return;
    }

    const newDevice = {
      deviceName,
      ipAddress,
      connectionStatus: 'Disconnected',
      lastConnected: new Date(),
    };

    dispatch(addNewDevice(newDevice));
    setDeviceName('');
    setIpAddress('');
    toggleForm(); // Hide form after adding a device
  };

  const toggleForm = () => {
    setShowAddDevice(!showAddDevice);
  };

  const renderDeviceItem = ({ item }) => (
    <TouchableOpacity style={styles.deviceCard}>
      <FontAwesome name="laptop" size={24} color="#61dbfb" />
      <View style={styles.deviceInfo}>
        <Text style={styles.deviceName}>{item.deviceName}</Text>
        <Text style={styles.deviceDetails}>IP Address: {item.ipAddress}</Text>
        <Text style={styles.deviceDetails}>Status: {item.connectionStatus}</Text>
        <Text style={styles.deviceDetails}>
          Last Connected: {new Date(item.lastConnected).toLocaleDateString()}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScreenWrapper>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
        
        <View style={styles.container}>
          {loading ? (
            <Text>Loading devices...</Text>
          ) : (
            <FlatList
              data={devices}
              renderItem={renderDeviceItem}
              keyExtractor={(item, index) => index.toString()}
              ListEmptyComponent={
                <Text style={styles.noDevicesText}>No devices connected yet.</Text>
              }
              contentContainerStyle={styles.deviceListContainer}
            />
          )}

          {/* Add Device Form Popup (Modal) */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={showAddDevice}
            onRequestClose={toggleForm}>
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <Text style={styles.formTitle}>Add New Device</Text>

                <Text style={styles.label}>Device Name</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter device name"
                    value={deviceName}
                    onChangeText={setDeviceName}
                    placeholderTextColor="#9E9E9E"
                  />
                  <FontAwesome
                    name="laptop"
                    size={20}
                    color="#9E9E9E"
                    style={styles.icon}
                  />
                </View>

                <Text style={styles.label}>IP Address</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter device IP address"
                    value={ipAddress}
                    onChangeText={setIpAddress}
                    placeholderTextColor="#9E9E9E"
                    keyboardType="numeric"
                  />
                  <FontAwesome
                    name="gears"
                    size={20}
                    color="#9E9E9E"
                    style={styles.icon}
                  />
                </View>

                {/* Buttons side by side */}
                <View style={styles.buttonRow}>
                  <View style={styles.buttonContainer}>
                    <ButtonComponent title="Add Device" onPress={handleAddDevice} />
                  </View>
                  <View style={styles.buttonContainer}>
                    <ButtonComponent title="Cancel" onPress={toggleForm} outlined={true} />
                  </View>
                </View>
              </View>
            </View>
          </Modal>

        </View>

        {/* Hide the button and horizontal line completely when keyboard is visible */}
        {!keyboardVisible && (
          <View style={styles.fixedButtonContainer}>
            <HorizontalLine bottom={70} />
            <ButtonComponent
              title={showAddDevice ? 'Cancel' : 'Add New Device'}
              onPress={toggleForm}
              outlined={true}
            />
          </View>
        )}

      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingBottom: 40,
    paddingTop: 20,
  },
  deviceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },
  deviceInfo: {
    marginLeft: 10,
    flex: 1,
  },
  deviceName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  deviceDetails: {
    fontSize: 12,
    color: '#666',
  },
  noDevicesText: {
    textAlign: 'center',
    color: '#777',
    marginTop: 20,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#f7f8fa',
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 2,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#424242',
    textAlign: 'center',
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
    marginTop: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    backgroundColor: '#FAFAFA',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 14,
    color: '#333',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  buttonContainer: {
    flex: 1,
    marginHorizontal: 5,
  },
  fixedButtonContainer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    alignItems: 'center',
  },
});
