import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from '../../components/button/button';
import ScreenWrapper from '../../components/screenWrapper/screenWrapper';

export default function HomeScreen({navigation}) {
  const user = useSelector(state => state.user.user);

  return (
    <ScreenWrapper>
      {/* Welcome Message */}
      <View style={styles.header}>
        <Text style={styles.welcomeText}>
          Hi, {user ? user.username : 'there'}!
        </Text>
        <Text style={styles.subtitle}>What would you like to do today?</Text>
      </View>

      {/* Scrollable Content */}
      <ScrollView style={styles.content}>
        {/* Navigation Links */}
        <View style={styles.buttonGroup}>
          <Button
            title="Add a Baby"
            onPress={() => navigation.navigate('Settings')}
            style={styles.button}
            icon={<Icon name="plus" size={20} color="#fff" />}
          />
          <Button
            title="Profile"
            outlined={true}
            onPress={() => navigation.navigate('Profile')}
            style={styles.button}
            icon={<Icon name="user" size={20} color="#EF8D7F" />}
          />
        </View>

        {/* Featured Content */}
        <Text style={styles.sectionTitle}>Featured Content</Text>
        <View style={styles.featuredContent}>
          <TouchableOpacity style={styles.featuredItem}>
            <Icon name="heartbeat" size={24} color="#EF8D7F" />
            <Text style={styles.featuredText}>Monitor Baby's Health</Text>
            <Text style={styles.featuredDescription}>
              Track sleep patterns, monitor vitals, and get health insights for your baby.
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.featuredItem}>
            <Icon name="microphone" size={24} color="#EF8D7F" />
            <Text style={styles.featuredText}>Baby's Cry Analyzer</Text>
            <Text style={styles.featuredDescription}>
              Use AI to analyze your baby's cry and understand their needs.
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.featuredItem}>
            <Icon name="lightbulb-o" size={24} color="#EF8D7F" />
            <Text style={styles.featuredText}>Daily Baby Tips</Text>
            <Text style={styles.featuredDescription}>
              Receive daily tips and advice for baby care from experts.
            </Text>
          </TouchableOpacity>
        </View>

        {/* Promotions or Announcements */}
        <Text style={styles.sectionTitle}>Promotions</Text>
        <View style={styles.promotions}>
          <TouchableOpacity style={styles.promotionItem}>
            <Icon name="gift" size={24} color="#0288D1" />
            <Text style={styles.promotionText}>Get 50% off on the Baby Cry Analyzer Premium</Text>
            <Text style={styles.promotionDescription}>
              Upgrade now and get detailed insights and personalized baby care advice.
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Footer Navigation */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Icon name="home" size={24} color="#007BFF" />
          <Text style={styles.footerText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Explore')}>
          <Icon name="search" size={24} color="#007BFF" />
          <Text style={styles.footerText}>Explore</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
          <Icon name="bell" size={24} color="#007BFF" />
          <Text style={styles.footerText}>Notifications</Text>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: 30,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  content: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
    color: '#333',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
  },
  featuredContent: {
    marginBottom: 20,
  },
  featuredItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  featuredText: {
    fontSize: 18,
    color: '#333',
    marginLeft: 10,
    marginBottom: 5,
  },
  featuredDescription: {
    fontSize: 14,
    color: '#666',
    marginLeft: 10,
  },
  promotions: {
    marginBottom: 20,
  },
  promotionItem: {
    backgroundColor: '#e3f2fd',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  promotionText: {
    fontSize: 16,
    color: '#0288D1',
    marginLeft: 10,
    marginBottom: 5,
  },
  promotionDescription: {
    fontSize: 14,
    color: '#666',
    marginLeft: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  footerText: {
    fontSize: 16,
    color: '#007BFF',
  },
});
