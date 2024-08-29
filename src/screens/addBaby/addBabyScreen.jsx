import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  Switch,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
// import { addBabyToUser } from '../../redux/baby/babyActions'; // Uncomment when action is available
import ScreenWrapper from '../../components/screenWrapper/screenWrapper';
import ButtonComponent from '../../components/button/button';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function AddBabyScreen({ navigation }) {
  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [isMale, setIsMale] = useState(true);
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);

  const handleAddBaby = () => {
    const gender = isMale ? 'Male' : 'Female';
    if (!name || !birthdate || !gender) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    if (!isValidDate(birthdate)) {
      Alert.alert('Error', 'Please enter a valid birthdate in the format YYYY-MM-DD.');
      return;
    }

    // Uncomment when action is available
    // dispatch(addBabyToUser(user._id, { name, birthdate, gender }));
    navigation.replace('Main');
  };

  const handleBirthdateChange = (text) => {
    const cleanedText = text.replace(/[^0-9]/g, ''); // Remove non-numeric characters
    let formattedText = '';

    if (cleanedText.length <= 4) {
      formattedText = cleanedText;
    } else if (cleanedText.length <= 6) {
      formattedText = `${cleanedText.slice(0, 4)}-${cleanedText.slice(4)}`;
    } else if (cleanedText.length <= 8) {
      formattedText = `${cleanedText.slice(0, 4)}-${cleanedText.slice(4, 6)}-${cleanedText.slice(6)}`;
    }

    setBirthdate(formattedText);
  };

  const isValidDate = (dateString) => {
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    if (!datePattern.test(dateString)) return false;

    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day);

    return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
  };

  return (
    <ScreenWrapper>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        <Text style={styles.title}>Add Your Baby</Text>

        <Text style={styles.label}>Name</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter baby's name"
            value={name}
            onChangeText={setName}
            placeholderTextColor="#9E9E9E"
          />
          <FontAwesome name="user" size={20} color="#9E9E9E" style={styles.icon} />
        </View>

        <Text style={styles.label}>Birthdate</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={birthdate}
            onChangeText={handleBirthdateChange}
            placeholder="YYYY-MM-DD"
            maxLength={10}
            keyboardType="numeric"
            placeholderTextColor="#9E9E9E"
          />
          <FontAwesome name="calendar" size={20} color="#9E9E9E" style={styles.icon} />
        </View>

        <Text style={styles.label}>Gender</Text>
        <View style={styles.switchContainer}>
          <View style={styles.switchLabelContainer}>
            <FontAwesome name="male" size={24} color={isMale ? '#61dbfb' : '#ccc'} />
            <Text style={[styles.switchLabel, { color: isMale ? '#61dbfb' : '#ccc' }]}>Boy</Text>
          </View>
          <Switch
            value={isMale}
            onValueChange={setIsMale}
            thumbColor={isMale ? '#61dbfb' : '#f7b7d2'}
            trackColor={{ false: '#f7b7d2', true: '#61dbfb' }}
            style={styles.switch}
          />
          <View style={styles.switchLabelContainer}>
            <FontAwesome name="female" size={24} color={!isMale ? '#f7b7d2' : '#ccc'} />
            <Text style={[styles.switchLabel, { color: !isMale ? '#f7b7d2' : '#ccc' }]}>Girl</Text>
          </View>
        </View>

        <ButtonComponent title="Add Baby" onPress={handleAddBaby} />
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
    marginTop: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    backgroundColor: '#FAFAFA',
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 16,
    color: '#333',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 20,
  },
  switchLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  switchLabel: {
    fontSize: 16,
    marginLeft: 8,
  },
  switch: {
    transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
  },
});
