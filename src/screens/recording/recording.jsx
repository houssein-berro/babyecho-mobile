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
  const [babyId,setBabyId] = useState();

  useEffect(()=>{
    setBabyId(user.babies[0]._id)
  },[user])

  useEffect(() => {
    if (Platform.OS === 'android') {
      checkAndRequestPermissions();
    }
  }, []);

  const checkAndRequestPermissions = async () => {
    try {
      const writeGranted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
      const readGranted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
      const recordGranted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO);

      if (!writeGranted || !readGranted || !recordGranted) {
        await requestPermissions();
      }
    } catch (err) {
      console.warn(err);
      Alert.alert('Error', 'An error occurred while checking permissions.');
    }
  };

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
          [
            {
              text: 'Try Again',
              onPress: requestPermissions,
            },
            {
              text: 'Cancel',
              style: 'cancel',
            },
          ]
        );
      }
    } catch (err) {
      console.warn(err);
      Alert.alert('Error', 'An error occurred while requesting permissions.');
    }
  };

  const startRecording = async () => {
    try {
      const result = await audioRecorderPlayer.startRecorder();
      setIsRecording(true);
      setDots('');
      audioRecorderPlayer.addRecordBackListener(e => {
        setRecordSecs(e.currentPosition);
        console.log('Recording back', e);
      });
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
      audioRecorderPlayer.removeRecordBackListener();
      console.log('Recording file saved at:', result);

      // Prepare the form data and update the state
      const newFormData = new FormData();
      newFormData.append('audioFile', {
        uri: result,
        type: 'audio/mp4',
        name: 'recording.mp4',
      });
      newFormData.append('duration', recordSecs); // Include duration if needed
      newFormData.append('userId', userId); // Include userId from Redux state
      newFormData.append('babyId', babyId); // Include babyId from Redux state

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
      setRecordSecs(0); // Reset the recording duration
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

  // Log formData whenever it changes
  useEffect(() => {
    if (formData) {
      console.log('Form Data Updated:', formData);

      // Dispatch uploadRecording action
      dispatch(uploadRecording(formData));
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f7f8fa',
  },
  title: {
    fontSize: 28,
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
    width: '80%',
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  cancelButton: {
    backgroundColor: '#FFB3B3',
  },
  stopButton: {
    backgroundColor: '#FF6B6B',
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
});
