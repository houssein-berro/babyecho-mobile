import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  Switch,
  KeyboardAvoidingView,
  Platform,
  Modal,
  FlatList,
  Pressable,
  Keyboard,
  TouchableWithoutFeedback,
  Animated,
  Dimensions,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addBabyToUser } from '../../redux/auth/authActions';
import ScreenWrapper from '../../components/screenWrapper/screenWrapper';
import ButtonComponent from '../../components/button/button';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import HorizontalLine from '../../components/horizontalLine/horizontalLine';
import LottieView from 'lottie-react-native'; // Import Lottie

const screenWidth = Dimensions.get('window').width;

export default function BabyScreen({ navigation }) {
  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [isMale, setIsMale] = useState(true);
  const [showAddBaby, setShowAddBaby] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(state => state.user?.user);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );

    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
      clearTimeout(timer);
    };
  }, []);

  const handleAddBaby = () => {
    const gender = isMale ? 'Male' : 'Female';
    if (!name || !birthdate || !gender) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    if (!isValidDate(birthdate)) {
      Alert.alert(
        'Error',
        'Please enter a valid birthdate in the format YYYY-MM-DD.',
      );
      return;
    }

    dispatch(addBabyToUser(user._id, { name, birthdate, gender }));
    setShowAddBaby(false);
  };

  const handleBirthdateChange = text => {
    const cleanedText = text.replace(/[^0-9]/g, '');
    let formattedText = '';

    if (cleanedText.length <= 4) {
      formattedText = cleanedText;
    } else if (cleanedText.length <= 6) {
      formattedText = `${cleanedText.slice(0, 4)}-${cleanedText.slice(4)}`;
    } else if (cleanedText.length <= 8) {
      formattedText = `${cleanedText.slice(0, 4)}-${cleanedText.slice(
        4,
        6,
      )}-${cleanedText.slice(6)}`;
    }

    setBirthdate(formattedText);
  };

  const isValidDate = dateString => {
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    if (!datePattern.test(dateString)) return false;

    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day);

    return (
      date.getFullYear() === year &&
      date.getMonth() === month - 1 &&
      date.getDate() === day
    );
  };

  const handleBabyPressIn = (animatedWidth, baby) => {
    Animated.timing(animatedWidth, {
      toValue: screenWidth,
      duration: 1000,
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished) {
        navigation.navigate('BabyRecordingsScreen', { baby });
      }
    });
  };

  const handleBabyPressOut = animatedWidth => {
    Animated.timing(animatedWidth, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const renderBabyItem = ({ item, index }) => {
    const animatedWidth = new Animated.Value(0);
    return (
      <Pressable
        style={[styles.babyCard, { backgroundColor: '#fff' }]}
        onPressIn={() => handleBabyPressIn(animatedWidth, item)}
        onPressOut={() => handleBabyPressOut(animatedWidth)}>
        <Animated.View
          style={[styles.filler, { width: animatedWidth, borderRadius: 10 }]}
        />
        <FontAwesome
          name={item.gender === 'Male' ? 'male' : 'female'}
          size={24}
          color={item.gender === 'Male' ? '#61dbfb' : '#f7b7d2'}
        />
        <View style={styles.babyInfo}>
          <Text style={styles.babyName}>{item.name}</Text>
          <Text style={styles.babyDetails}>
            Birthdate: {item?.birthdate ? item.birthdate.split('T')[0] : 'N/A'}
          </Text>
          <Text style={styles.babyDetails}>Gender: {item.gender}</Text>
        </View>
        <FontAwesome name="chevron-right" size={24} color="#9E9E9E" />
      </Pressable>
    );
  };

  return (
    <ScreenWrapper>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
        <View style={styles.container}>
          {loading ? (
            <View style={styles.loadingContainer}>
              <LottieView
                source={require('../../assets/public/loading.json')} // Replace with your Lottie animation file
                autoPlay
                loop
                style={styles.lottie}
              />
            </View>
          ) : (
            <FlatList
              data={user?.babies}
              renderItem={renderBabyItem}
              keyExtractor={(item, index) =>
                item?._id ? item._id.toString() : index.toString()
              }
              ListEmptyComponent={
                <View style={styles.emptyContainer}>
                  <LottieView
                    source={require('../../assets/public/nothing.json')} // Your "No Data" Lottie animation
                    autoPlay
                    loop
                    style={styles.lottieNothing}
                  />
                  <Text style={styles.emptyText}>
                    No babies added yet.
                  </Text>
                </View>
              }
              contentContainerStyle={styles.babiesListContainer}
            />
          )}

          <Modal
            animationType="fade"
            transparent={true}
            visible={showAddBaby}
            onRequestClose={() => setShowAddBaby(false)}>
            <TouchableWithoutFeedback onPress={() => setShowAddBaby(false)}>
              <View style={styles.modalOverlay}>
                <TouchableWithoutFeedback>
                  <View style={styles.modalContent}>
                    <Pressable
                      style={styles.closeButton}
                      onPress={() => setShowAddBaby(false)}>
                      <FontAwesome name="close" size={24} color="#9E9E9E" />
                    </Pressable>

                    <Text style={styles.formTitle}>Add Your Baby</Text>

                    <Text style={styles.label}>Name</Text>
                    <View style={styles.inputContainer}>
                      <TextInput
                        style={styles.input}
                        placeholder="Enter baby's name"
                        value={name}
                        onChangeText={setName}
                        placeholderTextColor="#9E9E9E"
                      />
                      <FontAwesome
                        name="user"
                        size={20}
                        color="#9E9E9E"
                        style={styles.icon}
                      />
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
                      <FontAwesome
                        name="calendar"
                        size={20}
                        color="#9E9E9E"
                        style={styles.icon}
                      />
                    </View>

                    <Text style={styles.label}>Gender</Text>
                    <View style={styles.switchContainer}>
                      <View style={styles.switchLabelContainer}>
                        <FontAwesome
                          name="male"
                          size={24}
                          color={isMale ? '#61dbfb' : '#ccc'}
                        />
                        <Text
                          style={[
                            styles.switchLabel,
                            { color: isMale ? '#61dbfb' : '#ccc' },
                          ]}>
                          Boy
                        </Text>
                      </View>
                      <Switch
                        value={isMale}
                        onValueChange={setIsMale}
                        thumbColor={isMale ? '#61dbfb' : '#f7b7d2'}
                        trackColor={{ false: '#f7b7d2', true: '#61dbfb' }}
                        style={styles.switch}
                      />
                      <View style={styles.switchLabelContainer}>
                        <FontAwesome
                          name="female"
                          size={24}
                          color={!isMale ? '#f7b7d2' : '#ccc'}
                        />
                        <Text
                          style={[
                            styles.switchLabel,
                            { color: !isMale ? '#f7b7d2' : '#ccc' },
                          ]}>
                          Girl
                        </Text>
                      </View>
                    </View>

                    <View style={styles.buttonRow}>
                      <ButtonComponent
                        title="Add Baby"
                        onPress={handleAddBaby}
                      />
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        </View>

        {!keyboardVisible && (
          <View style={styles.fixedButtonContainer}>
            <HorizontalLine bottom={70} />
            <ButtonComponent
              title={showAddBaby ? 'Cancel' : 'Add New Baby'}
              onPress={() => setShowAddBaby(!showAddBaby)}
              style={styles.fixedButton}
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
  },
  babiesListContainer: {
    paddingBottom: 20,
  },
  babyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 1,
    position: 'relative',
    overflow: 'hidden', 
  },
  filler: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: '#d3d3d3',
    zIndex: -1,
    borderRadius: 10,
  },
  babyInfo: {
    marginLeft: 10,
    flex: 1,
  },
  babyName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  babyDetails: {
    fontSize: 14,
    color: '#666',
  },
  noBabiesText: {
    textAlign: 'center',
    color: '#777',
    marginTop: 20,
    fontSize: 18,
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#424242',
    textAlign: 'center',
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: '#555',
    marginBottom: 3,
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    backgroundColor: '#FAFAFA',
    paddingHorizontal: 10,
    marginBottom: 8,
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
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
    marginBottom: 15,
  },
  switchLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  switchLabel: {
    fontSize: 14,
    marginLeft: 8,
  },
  switch: {
    transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  fixedButtonContainer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  fixedButton: {
    width: '100%',
    alignSelf: 'center',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#f7f8fa',
    padding: 15,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 2,
  },
  lottie: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    marginTop: 50,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    marginTop: 20,
  },
  lottieNothing: {
    width: 200,
    marginRight:30,
    height: 200,
  },
});
