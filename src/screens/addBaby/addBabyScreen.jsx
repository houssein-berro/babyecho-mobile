import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
// import { addBabyToUser } from '../../redux/baby/babyActions'; // Create this action
import ScreenWrapper from '../../components/screenWrapper/screenWrapper';
import Button from '../../components/button/button';

export default function AddBabyScreen({ navigation }) {
  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [gender, setGender] = useState('');
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);

  const handleAddBaby = () => {
    if (!name || !birthdate || !gender) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    dispatch(addBabyToUser(user._id, { name, birthdate, gender }));
    navigation.replace('Main');
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Text style={styles.title}>Add Your Baby</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
          placeholderTextColor="#9E9E9E"
        />
        <TextInput
          style={styles.input}
          placeholder="Birthdate (YYYY-MM-DD)"
          value={birthdate}
          onChangeText={setBirthdate}
          placeholderTextColor="#9E9E9E"
        />
        <TextInput
          style={styles.input}
          placeholder="Gender"
          value={gender}
          onChangeText={setGender}
          placeholderTextColor="#9E9E9E"
        />
        <Button title="Add Baby" onPress={handleAddBaby} style={styles.addButton} />
      </View>
    </ScreenWrapper>
  );
}
