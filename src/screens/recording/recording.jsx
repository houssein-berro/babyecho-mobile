import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import ScreenWrapper from '../../components/screenWrapper/screenWrapper';
import {useDispatch, useSelector} from 'react-redux';
import {uploadRecording} from '../../redux/recording/RecordingActions';

const audioRecorderPlayer = new AudioRecorderPlayer();

export default function RecordingScreen({navigation}) {
  const [isRecording, setIsRecording] = useState(false);
  const [dots, setDots] = useState('');
  const [recordSecs, setRecordSecs] = useState(0);
  const [formData, setFormData] = useState(null);
  const dispatch = useDispatch();

  // Access user data from Redux store
  const user = useSelector(state => state.user.user);
  const userId = user ? user._id : null;
  const babyId = user ? user.babies[0]._id : null;

  useEffect(() => {
    if (Platform.OS === 'android') {
      requestPermissions();
    }
  }, []);

  const requestPermissions = async () => {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      ]);

      const writeGranted =
        granted['android.permission.WRITE_EXTERNAL_STORAGE'] ===
        PermissionsAndroid.RESULTS.GRANTED;
      const readGranted =
        granted['android.permission.READ_EXTERNAL_STORAGE'] ===
        PermissionsAndroid.RESULTS.GRANTED;
      const recordGranted =
        granted['android.permission.RECORD_AUDIO'] ===
        PermissionsAndroid.RESULTS.GRANTED;

      if (!writeGranted || !readGranted || !recordGranted) {
        Alert.alert(
          'Permissions Required',
          'All permissions need to be granted to use this feature.',
        );
      }
    } catch (err) {
      console.warn(err);
      Alert.alert('Error', 'An error occurred while requesting permissions.');
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

  // Log formData whenever it changes
  useEffect(() => {
    if (formData) {
      console.log('Form Data Updated:', formData);

      // Dispatch uploadRecording action
      dispatch(uploadRecording(formData));
    }
  }, [formData, dispatch]);

  console.log('user', user, user.babies);
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Text style={styles.title}>
          {isRecording ? 'Recording...' : 'Ready to Record'}
        </Text>
        <View style={styles.microphoneContainer}>
          <TouchableOpacity
            onPress={isRecording ? stopRecording : startRecording}
            style={styles.outerCircle}>
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
          Your baby’s sounds are being analyzed. Stay close and receive
          real-time feedback.
        </Text>
        <View style={styles.buttonGroup}>
          {isRecording && (
            <TouchableOpacity
              onPress={cancelRecording}
              style={[styles.button, styles.cancelButton]}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          )}
          {isRecording && (
            <TouchableOpacity
              onPress={stopRecording}
              style={[styles.button, styles.stopButton]}>
              <Text style={styles.buttonText}>Stop</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ScreenWrapper>
  );
}

