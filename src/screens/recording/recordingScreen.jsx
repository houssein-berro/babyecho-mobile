import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
  Modal,  // Import Modal for popup
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import ScreenWrapper from '../../components/screenWrapper/screenWrapper';
import {useDispatch, useSelector} from 'react-redux';
import {uploadRecording} from '../../redux/recording/RecordingActions';
import Button from '../../components/button/button';
import CustomModal from '../../components/customModal/customModal'; // Import the custom modal

const audioRecorderPlayer = new AudioRecorderPlayer();

export default function RecordingScreen({navigation}) {
  const [isRecording, setIsRecording] = useState(false);
  const [dots, setDots] = useState('');
  const [recordSecs, setRecordSecs] = useState(0);
  const [formData, setFormData] = useState(null);
  const [recordingStopped, setRecordingStopped] = useState(false);
  const [modalVisible, setModalVisible] = useState(false); // State for modal visibility
  const [predictionPopupVisible, setPredictionPopupVisible] = useState(false); // Popup visibility state
  const [prediction, setPrediction] = useState(''); // State for storing the prediction

  const dispatch = useDispatch();

  // Access user data from Redux store
  const user = useSelector(state => state.user.user);
  const userId = user ? user._id : null;
  const [babyId, setBabyId] = useState();

  useEffect(() => {
    setBabyId(user?.babies?.[0]?._id);
  }, [user]);

  const isRecordingDisabled = !babyId;

  useEffect(() => {
    if (Platform.OS === 'android') {
      checkAndRequestPermissions();
    }
  }, []);

  const checkAndRequestPermissions = async () => {
    console.log('Checking permissions...');

    let writeGranted = false;
    let readGranted = false;
    let recordGranted = false;

    if (Platform.Version >= 33) {
      writeGranted = true; // WRITE_EXTERNAL_STORAGE not needed on Android 13+
      readGranted = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO,
      );
    } else {
      writeGranted = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );
      readGranted = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      );
    }

    recordGranted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    );

    console.log('WRITE_EXTERNAL_STORAGE granted:', writeGranted);
    console.log('READ_EXTERNAL_STORAGE granted:', readGranted);
    console.log('RECORD_AUDIO granted:', recordGranted);

    if (!writeGranted || !readGranted || !recordGranted) {
      await requestPermissions();
    }
  };

  const requestPermissions = async () => {
    console.log('Requesting permissions...');

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
      const granted = await PermissionsAndroid.requestMultiple(
        permissionsToRequest,
      );

      console.log('Permissions requested:', granted);

      const writeGranted =
        granted[PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE] ===
          PermissionsAndroid.RESULTS.GRANTED || Platform.Version >= 33;
      const readGranted =
        granted[PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE] ===
          PermissionsAndroid.RESULTS.GRANTED ||
        granted[PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO] ===
          PermissionsAndroid.RESULTS.GRANTED;
      const recordGranted =
        granted[PermissionsAndroid.PERMISSIONS.RECORD_AUDIO] ===
        PermissionsAndroid.RESULTS.GRANTED;

      if (!writeGranted || !readGranted || !recordGranted) {
        setModalVisible(true); // Show modal if permissions aren't granted
      }
    } catch (err) {
      console.warn(err);
      setModalVisible(true); // Show modal on error
    }
  };

  const startRecording = async () => {
    const writeGranted =
      Platform.Version >= 33 ||
      (await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ));
    const readGranted =
      Platform.Version >= 33 ||
      (await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      )) ||
      (await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO,
      ));
    const recordGranted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    );

    if (!writeGranted || !readGranted || !recordGranted) {
      console.log(
        'Permissions are not granted, requesting permissions again...',
      );
      await requestPermissions();
      return;
    }

    try {
      const result = await audioRecorderPlayer.startRecorder();
      setIsRecording(true);
      setDots('');
      setRecordingStopped(false); 
      audioRecorderPlayer.addRecordBackListener(e => {
        setRecordSecs(e.currentPosition);
        console.log('Recording back', e);
      });

      setTimeout(async () => {
        await stopRecording();
      }, 7000);

      console.log(result);
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
      console.log('Recording file saved at:', result);

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
    } catch (error) {
      console.log('Failed to cancel recording', error);
    }
  };

  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setDots(prev => (prev.length < 3 ? prev + '.' : ''));
      }, 500);
    } else {
      setDots('');
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  useEffect(() => {
    if (formData) {
      console.log('Form Data Updated:', formData);
      dispatch(uploadRecording(formData))
      .then(response => {
        console.log('====================================');
        console.log('res',response);
        console.log('====================================');
        if (response) {
          setPrediction(response);
          setPredictionPopupVisible(true); // Show popup when prediction is available
        }
      });
    }
  }, [formData, dispatch]);

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Text style={styles.title}>
          {isRecording ? 'Recording...' : 'Ready to Record'}
        </Text>
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
              isRecordingDisabled && styles.disabled,
            ]}>
            <View style={styles.innerCircle}>
              {isRecording ? (
                <Text style={styles.dots}>{dots}</Text>
              ) : (
                <FontAwesome name="microphone" size={60} color="#FF6B6B" />
              )}
            </View>
          </TouchableOpacity>
        </View>
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

        {/* Modal for displaying AI prediction */}
        <Modal
          transparent={true}
          visible={predictionPopupVisible}
          animationType="slide"
          onRequestClose={() => setPredictionPopupVisible(false)} // Close the popup
        >
          <View style={styles.modalBackground}>
            <View style={styles.predictionContainer}>
              <Text style={styles.predictionTitle}>AI Prediction</Text>
              <Text style={styles.predictionText}>{prediction}</Text>
              <TouchableOpacity
                onPress={() => setPredictionPopupVisible(false)} // Close button for the popup
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>

      <CustomModal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAddBaby={() => navigation.navigate('AddBaby')}
      />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 40,
  },
  microphoneContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  outerCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
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
    marginRight: 5,
  },
  stopButton: {
    flex: 1,
    marginLeft: 5,
  },
  disabled: {
    // backgroundColor: '#ccc',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
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
    fontWeight: 'bold',
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
    fontStyle: 'italic',
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
    fontWeight: 'bold',
  },
});
