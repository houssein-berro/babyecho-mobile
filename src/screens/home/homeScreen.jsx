import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useSelector } from 'react-redux';
import ScreenWrapper from '../../components/screenWrapper/screenWrapper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

export default function HomeScreen({ navigation }) {
  const auth = useSelector(state => state.user.user);

  return (
    <ScreenWrapper>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>
          Hi, {auth ? auth.username : 'User'}
        </Text>
        <Text style={styles.subtitle}>What would you like to do today?</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.featuredContent}>
          {/* Add Member Section */}
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
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 10,
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
});
 