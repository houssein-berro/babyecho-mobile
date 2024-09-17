import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ScreenWrapper from '../../components/screenWrapper/screenWrapper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import { logout } from '../../redux/auth/authActions';

export default function HomeScreen({ navigation }) {
  const auth = useSelector(state => state.user.user);
  const dispatch = useDispatch();

  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

  useEffect(() => {
    if (!auth) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    }
  }, [auth, navigation]); 
  const handleLogout = () => {
    dispatch(logout());
    setLogoutModalVisible(false);
  };

  return (
    <ScreenWrapper>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>
          Hi, {auth ? auth.username : 'User'}
        </Text>

        {/* Logout button in the header */}
        <TouchableOpacity
          onPress={() => setLogoutModalVisible(true)}
          style={styles.logoutButton}>
          <MaterialCommunityIcons name="logout" size={24} color="#EF8D7F" />
        </TouchableOpacity>
      </View>
      <Text style={styles.subtitle}>What would you like to do today?</Text>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Add Member Section */}
        <View style={styles.featuredContent}>
          <TouchableOpacity
            style={styles.featuredItem}
            onPress={() => navigation.navigate('Babies')}
            activeOpacity={0.8}>
            <View style={styles.iconCircle}>
              <Entypo name="plus" size={28} color="#fff" />
            </View>
            <View style={styles.featuredTextContainer}>
              <Text style={styles.featuredText}>Add Member</Text>
              <Text style={styles.featuredDescription}>
                Register a new family member and keep track of their activities.
              </Text>
            </View>
          </TouchableOpacity>

          {/* Record Audio Section */}
          <TouchableOpacity
            style={styles.featuredItem}
            onPress={() => navigation.navigate('Recording')}
            activeOpacity={0.8}>
            <View style={styles.iconCircle}>
              <Ionicons name="mic-outline" size={28} color="#fff" />
            </View>
            <View style={styles.featuredTextContainer}>
              <Text style={styles.featuredText}>Record Audio</Text>
              <Text style={styles.featuredDescription}>
                Analyze your baby's cry to understand what they need.
              </Text>
            </View>
          </TouchableOpacity>

          {/* Set Reminders Section */}
          <TouchableOpacity
            style={styles.featuredItem}
            onPress={() => navigation.navigate('Reminders')}
            activeOpacity={0.8}>
            <View style={styles.iconCircle}>
              <MaterialCommunityIcons
                name="bell-outline"
                size={28}
                color="#fff"
              />
            </View>
            <View style={styles.featuredTextContainer}>
              <Text style={styles.featuredText}>Set Reminders</Text>
              <Text style={styles.featuredDescription}>
                Never miss an important moment with custom reminders.
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Help Section */}
        <View style={styles.helpContainer}>
          <MaterialCommunityIcons
            name="baby-face-outline"
            size={50}
            color="#EF8D7F"
            style={styles.helpIcon}
          />
          <Text style={styles.helpText}>
            Need help with your baby? Check our tips to help you in parenting.
          </Text>
          <TouchableOpacity
            style={styles.helpButton}
            onPress={() => navigation.navigate('Tips')}>
            <Text style={styles.helpButtonText}>Get Parenting Tips</Text>
            <Ionicons name="arrow-forward-outline" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Logout Confirmation Modal */}
      <Modal
        visible={logoutModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setLogoutModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Confirm Logout</Text>
            <Text style={styles.modalMessage}>
              Are you sure you want to logout?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setLogoutModalVisible(false)}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={handleLogout}>
                <Text style={styles.buttonText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 3,
  },
  logoutButton: {
    padding: 10,
  },
  featuredContent: {},
  featuredItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircle: {
    backgroundColor: '#EF8D7F',
    padding: 12,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featuredTextContainer: {
    marginLeft: 15,
    flex: 1,
  },
  featuredText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 5,
    fontWeight: '600',
  },
  featuredDescription: {
    fontSize: 14,
    color: '#666',
  },
  helpContainer: {
    backgroundColor: '#fde9e5',
    padding: 20,
    borderRadius: 15,
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#EF8D7F',
    borderWidth: 1,
  },
  helpIcon: {
    marginBottom: 10,
  },
  helpText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: '500',
  },
  helpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EF8D7F',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  helpButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 5,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#ccc',
  },
  confirmButton: {
    backgroundColor: '#EF8D7F',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
});
