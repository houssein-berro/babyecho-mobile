import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useSelector } from 'react-redux';
import Button from '../../components/button/button';
import ScreenWrapper from '../../components/screenWrapper/screenWrapper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/MaterialCommunityIcons';

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
        <View style={styles.buttonGroup}>
          <Button
            title="Add member"
            onPress={() => navigation.navigate('Babies')}
            style={styles.button}
            icon={<FontAwesome name="plus" size={20} color="#fff" />}
          />
          <Button
            title="Record Audio"
            outlined={true}
            onPress={() => navigation.navigate('Recording')}
            style={[styles.button, styles.outlinedButton]}
            icon={<FontAwesome5 name="microphone" size={20} color="#EF8D7F" />}
          />
        </View>

        <Text style={styles.sectionTitle}>Featured Content</Text>
        <View style={styles.featuredContent}>
          <TouchableOpacity style={styles.featuredItem}>
            <FontAwesome name="heartbeat" size={24} color="#EF8D7F" />
            <View style={styles.featuredTextContainer}>
              <Text style={styles.featuredText}>Monitor Baby's Health</Text>
              <Text style={styles.featuredDescription}>
                Track sleep patterns, monitor vitals, and get health insights
                for your baby.
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.featuredItem}>
            <FontAwesome name="microphone" size={24} color="#EF8D7F" />
            <View style={styles.featuredTextContainer}>
              <Text style={styles.featuredText}>Baby's Cry Analyzer</Text>
              <Text style={styles.featuredDescription}>
                Use AI to analyze your baby's cry and understand their needs.
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.featuredItem}>
            <FontAwesome5 name="lightbulb" size={24} color="#EF8D7F" />
            <View style={styles.featuredTextContainer}>
              <Text style={styles.featuredText}>Daily Baby Tips</Text>
              <Text style={styles.featuredDescription}>
                Receive daily tips and advice for baby care from experts.
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Promotions</Text>
        <View style={styles.promotions}>
          <TouchableOpacity style={styles.promotionItem}>
            <AntDesign name="gift" size={24} color="#0288D1" />
            <View style={styles.featuredTextContainer}>
              <Text style={styles.promotionText}>
                Get 50% off on the Baby Cry Analyzer Premium
              </Text>
              <Text style={styles.promotionDescription}>
                Upgrade now and get detailed insights and personalized baby care
                advice.
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: 30,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
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
    borderRadius: 10,
    overflow: 'hidden',
  },
  outlinedButton: {
    borderColor: '#EF8D7F',
    borderWidth: 2,
  },
  featuredContent: {
    marginBottom: 20,
  },
  featuredItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  featuredTextContainer: {
    marginLeft: 10,
    flex: 1,
  },
  featuredText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 5,
  },
  featuredDescription: {
    fontSize: 14,
    color: '#666',
  },
  promotions: {
    marginBottom: 20,
  },
  promotionItem: {
    backgroundColor: '#e3f2fd',
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  promotionText: {
    fontSize: 16,
    color: '#0288D1',
    marginBottom: 5,
  },
  promotionDescription: {
    fontSize: 14,
    color: '#666',
  },
});
