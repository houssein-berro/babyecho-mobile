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

