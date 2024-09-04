import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  FlatList,
} from 'react-native';
import {useSelector} from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomHeader from '../../components/customHeader/customHeader';
import ScreenWrapper from '../../components/screenWrapper/screenWrapper';
