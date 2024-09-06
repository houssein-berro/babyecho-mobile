import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
} from 'react-native';
import {useSelector} from 'react-redux';
import ScreenWrapper from '../../components/screenWrapper/screenWrapper';
import Button from '../../components/button/button';
import HorizontalLine from '../../components/horizontalLine/horizontalLine'; // Importing HorizontalLine component

export default function ConnectedDevicesScreen({navigation}) {
  const [devices, setDevices] = useState([]);
  const user = useSelector(state => state.user.user);

  useEffect(() => {
    const fetchedDevices = user?.devices || []; 
    setDevices(fetchedDevices);
  }, [user]);

  const renderDeviceItem = ({item}) => (
    <View style={styles.deviceCard}>
      <Text style={styles.deviceText}>{item.name}</Text>
    </View>
  );

  return (
    <ScreenWrapper>
      {devices.length === 0 ? (
        <View style={styles.emptyStateContainer}>
          <View style={styles.deviceCard}>
            <Text style={styles.deviceText}>First Device...</Text>
          </View>
        </View>
      ) : (
        <FlatList
          data={devices}
          renderItem={renderDeviceItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.deviceListContainer}
        />
      )}
      
      <HorizontalLine bottom={90}/>

      <Button
        title={'Add more devices'}
        onPress={() => navigation.navigate('AddDeviceScreen')}
        style={styles.addButton}
        outlined={true}
      />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  emptyStateContainer: {
    paddingTop: 40,
  },
  deviceCard: {
    width: '100%',
    padding: 20,
    borderColor: '#E5E5E5',
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'left',
    alignSelf: 'center',
  },
  deviceText: {
    fontSize: 18,
    color: '#959595',
    fontFamily: 'Inter-Medium',
  },
  addButton: {
    position: 'absolute',
    bottom: 20, 
    left: 40,
    right: 40,
    paddingHorizontal: 20,
  },
  deviceListContainer: {
    paddingBottom: 20,
  },
});
