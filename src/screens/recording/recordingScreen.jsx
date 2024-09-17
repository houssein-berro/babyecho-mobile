import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
  Modal,
  ActivityIndicator,
  Animated,
  FlatList,
  SafeAreaView,
  Dimensions,
  ScrollView,
  Alert,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import ScreenWrapper from '../../components/screenWrapper/screenWrapper';
import { useDispatch, useSelector } from 'react-redux';
import { uploadRecording } from '../../redux/recording/RecordingActions';
import Button from '../../components/button/button';
import CustomModal from '../../components/customModal/customModal';

const audioRecorderPlayer = new AudioRecorderPlayer();
const { height } = Dimensions.get('window');

export default function RecordingScreen({ navigation }) {
  const [isRecording, setIsRecording] = useState(false);
  const [dots, setDots] = useState('');
  const [recordSecs, setRecordSecs] = useState(0);
  const [formData, setFormData] = useState(null);
  const [recordingStopped, setRecordingStopped] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [predictionPopupVisible, setPredictionPopupVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState('');
  const [timer, setTimer] = useState(7);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedBaby, setSelectedBaby] = useState(null);
  const dispatch = useDispatch();

  const user = useSelector(state => state.user.user);
  const userId = user ? user._id : null;
  const babies = user ? user.babies : [];
  const babyId = selectedBaby ? selectedBaby._id : (babies.length > 0 ? babies[0]._id : null);

  const isRecordingDisabled = !babyId;

  const slideAnim = useRef(new Animated.Value(0)).current; 

  const toggleDropdown = () => {
    if (babies.length > 0) {
      setDropdownVisible(!dropdownVisible);
    } else {
      Alert.alert(
        'No Babies Available',
        'Please add a baby before recording.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Add Baby', onPress: () => navigation.navigate('AddBaby') },
        ],
        { cancelable: true }
      );
    }
  };

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: dropdownVisible ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [dropdownVisible]);

  const checkAndRequestPermissions = async () => {
    let permissionsToRequest = [PermissionsAndroid.PERMISSIONS.RECORD_AUDIO];

    if (Platform.Version >= 33) {
      permissionsToRequest.push(
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO,
      );
    } else {
      permissionsToRequest.push(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      );
    }

    try {
      const granted = await PermissionsAndroid.requestMultiple(permissionsToRequest);
      const writeGranted = Platform.Version >= 33 || granted[PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE] === PermissionsAndroid.RESULTS.GRANTED;
      const readGranted = Platform.Version >= 33 || granted[PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE] === PermissionsAndroid.RESULTS.GRANTED || granted[PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO] === PermissionsAndroid.RESULTS.GRANTED;
      const recordGranted = granted[PermissionsAndroid.PERMISSIONS.RECORD_AUDIO] === PermissionsAndroid.RESULTS.GRANTED;

      if (!writeGranted || !readGranted || !recordGranted) {
        setModalVisible(true);
      }
    } catch (err) {
      console.warn(err);
      setModalVisible(true);
    }
  };

  const startRecording = async () => {
    try {
      const result = await audioRecorderPlayer.startRecorder();
      setIsRecording(true);
      setDots('');
      setRecordingStopped(false);
      setTimer(7);

      audioRecorderPlayer.addRecordBackListener(e => setRecordSecs(e.currentPosition));

      const countdown = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);

      setTimeout(async () => {
        await stopRecording();
        clearInterval(countdown);
      }, 7000);
    } catch (error) {
      console.log('Failed to start recording', error);
    }
  };

  const stopRecording = async () => {
    try {
      const result = await audioRecorderPlayer.stopRecorder();
      setIsRecording(false);
      setDots('');
      setRecordingStopped(true);
      audioRecorderPlayer.removeRecordBackListener();

      const newFormData = new FormData();
      newFormData.append('audioFile', {
        uri: result,
        type: 'audio/mp4',
        name: 'recording.mp4',
      });
      newFormData.append('duration', recordSecs);
      newFormData.append('userId', userId);
      newFormData.append('babyId', babyId);

      setFormData(newFormData);
    } catch (error) {
      console.log('Failed to stop recording', error);
    }
  };

  const cancelRecording = async () => {
    try {
      await audioRecorderPlayer.stopRecorder();
      setIsRecording(false);
      setDots('');
      setRecordSecs(0);
      setRecordingStopped(false);
      setTimer(7);
    } catch (error) {
      console.log('Failed to cancel recording', error);
    }
  };

  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => setDots(prev => (prev.length < 3 ? prev + '.' : '')), 500);
    } else {
      setDots('');
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  useEffect(() => {
    if (formData) {
      setLoading(true);
      dispatch(uploadRecording(formData)).then(response => {
        if (response) {
          setPrediction(response);
          setPredictionPopupVisible(true);
        }
        setLoading(false);
      });
    }
  }, [formData, dispatch]);

  useEffect(() => {
    checkAndRequestPermissions();
  }, []);

  const handleRetry = () => {
    setModalVisible(false);
    checkAndRequestPermissions();
  };

  const handlePressItem = (item) => {
    setSelectedBaby(item);
    setDropdownVisible(false);
  };

  const renderBabyItem = ({ item }) => (
    <TouchableOpacity
      style={styles.babyItem}
      onPress={() => handlePressItem(item)}
      accessibilityRole="button"
      accessibilityLabel={`Select baby ${item.name}`}
    >
      <Text style={styles.babyItemText}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderDropdown = () => {
    return (
      <Modal
        transparent={true}
        visible={dropdownVisible}
        animationType="fade"
        onRequestClose={() => setDropdownVisible(false)}
      >
        <TouchableOpacity style={styles.modalOverlay} onPress={() => setDropdownVisible(false)}>
          <Animated.View style={[styles.dropdownModal, {
            transform: [{
              scale: slideAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0.8, 1],
              }),
            }],
            opacity: slideAnim,
          }]}>
            <FlatList
              data={babies}
              renderItem={renderBabyItem}
              keyExtractor={item => item._id.toString()}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
          </Animated.View>
        </TouchableOpacity>
      </Modal>
    );
  };

  return (
    <ScreenWrapper>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
          {/* Conditional Rendering Based on Babies Availability */}
          {babies.length > 0 ? (
            <View style={styles.dropdownContainer}>
              <TouchableOpacity
                onPress={toggleDropdown}
                activeOpacity={0.8}
                style={styles.dropdownButton}
                accessibilityRole="button"
                accessibilityLabel="Select Baby"
              >
                <Text style={styles.dropdownButtonText}>
                  {selectedBaby ? selectedBaby.name : 'Select Baby'}
                </Text>
                <FontAwesome name={dropdownVisible ? "chevron-up" : "chevron-down"} size={20} color="#FF6B6B" />
              </TouchableOpacity>
              {dropdownVisible && renderDropdown()}
            </View>
          ) : (
            <View style={styles.emptyStateContainer}>
              <Text style={styles.emptyStateText}>No babies found. Please add a baby to start recording.</Text>
              <Button
                title="Add Baby"
                onPress={() => navigation.navigate('AddBaby')}
                style={styles.addBabyButton}
              />
            </View>
          )}

          <View style={styles.contentContainer}>
            {!loading && (
              <Text style={styles.title}>
                {isRecording ? 'Recording...' : 'Ready to Record'}
              </Text>
            )}

            {isRecording && (
              <Text style={styles.timerText}>Time left: {timer} seconds</Text>
            )}

            <View style={styles.microphoneContainer}>
              <TouchableOpacity
                onPress={() => {
                  if (isRecordingDisabled) {
                    setModalVisible(true);
                  } else {
                    isRecording ? stopRecording() : startRecording();
                  }
                }}
                style={[
                  styles.outerCircle,
                  isRecordingDisabled && styles.disabledOuterCircle,
                ]}
                activeOpacity={isRecordingDisabled ? 1 : 0.7}
                accessibilityRole="button"
                accessibilityLabel={isRecording ? "Stop Recording" : "Start Recording"}
              >
                <View style={[styles.innerCircle, isRecordingDisabled && styles.disabledInnerCircle]}>
                  {isRecording ? (
                    <Text style={styles.dots}>{dots}</Text>
                  ) : (
                    <FontAwesome name="microphone" size={60} color={isRecordingDisabled ? "#ccc" : "#FF6B6B"} />
                  )}
                </View>
              </TouchableOpacity>
            </View>

            {isRecording && (
              <Text style={styles.warningText}>
                * For best results, make sure the audio is exactly 7 seconds long.
              </Text>
            )}

            <Text style={styles.description}>
              {isRecording
                ? 'Tap the microphone to stop recording.'
                : 'Tap the microphone to start recording.'}
            </Text>

            {isRecording && (
              <View style={styles.buttonGroup}>
                <Button
                  title="Cancel"
                  onPress={cancelRecording}
                  style={styles.cancelButton}
                  outlined={true}
                />
                <Button
                  title="Stop"
                  onPress={stopRecording}
                  style={styles.stopButton}
                />
              </View>
            )}

            {loading && (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#FF6B6B" />
                <Text style={styles.loadingText}>Processing your prediction...</Text>
              </View>
            )}
          </View>

          {/* Prediction Modal */}
          <Modal
            transparent={true}
            visible={predictionPopupVisible}
            animationType="slide"
            onRequestClose={() => setPredictionPopupVisible(false)}
          >
            <View style={styles.modalBackground}>
              <View style={styles.predictionContainer}>
                <Text style={styles.predictionTitle}>AI Prediction</Text>
                <Text style={styles.predictionText}>{prediction}</Text>
                <TouchableOpacity
                  onPress={() => setPredictionPopupVisible(false)}
                  style={styles.closeButton}
                  accessibilityRole="button"
                  accessibilityLabel="Close Prediction"
                >
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          {/* Permissions Modal */}
          <CustomModal
            isVisible={modalVisible}
            onClose={() => setModalVisible(false)}
            onAddBaby={() => navigation.navigate('AddBaby')}
            title="Permissions Required"
            message="Please grant audio and storage permissions to record."
            buttonText="Retry"
            onButtonPress={handleRetry}
          />
        </ScrollView>
      </SafeAreaView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    padding: 20,
  },
  dropdownContainer: {
    marginBottom: 20,
    zIndex: 1,
  },
  dropdownButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FF6B6B',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  dropdownButtonText: {
    fontSize: 18,
    color: '#333',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  dropdownModal: {
    width: '80%',
    maxHeight: height * 0.4,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 10,
  },
  babyItem: {
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  babyItemText: {
    fontSize: 16,
    color: '#333',
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
    marginHorizontal: 20,
  },
  emptyStateContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  addBabyButton: {
    padding: 15,
    backgroundColor: '#FF6B6B',
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  contentContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  title: {
    fontSize: 23,
    fontWeight: '700',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  timerText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FF6B6B',
    marginBottom: 20,
  },
  microphoneContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  warningText: {
    color: '#FF6B6B',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
  },
  outerCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
  },
  innerCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#FFEBEB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dots: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FF6B6B',
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
  },
  cancelButton: {
    flex: 1,
    marginRight: 10,
    backgroundColor: '#fff',
    borderColor: '#FF6B6B',
    borderWidth: 1,
  },
  stopButton: {
    flex: 1,
    marginLeft: 10,
    backgroundColor: '#FF6B6B',
  },
  disabledOuterCircle: {
    backgroundColor: '#F5F5F5',
    borderColor: '#ccc',
    opacity: 0.8,
  },
  disabledInnerCircle: {
    backgroundColor: '#f0f0f0',
  },
  loadingContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#FF6B6B',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  predictionContainer: {
    paddingVertical: 25,
    paddingHorizontal: 20,
    backgroundColor: '#FFF5F7',
    borderRadius: 20,
    width: '85%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 1,
    borderColor: '#FF6B6B',
  },
  predictionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FF6B6B',
    marginBottom: 15,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  predictionText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    lineHeight: 26,
    letterSpacing: 0.8,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#FF6B6B',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
