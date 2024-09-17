import React, { useEffect, useState, useCallback, memo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  Animated,
  Dimensions,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecordingsByBaby } from '../../redux/recording/RecordingActions';
import ScreenWrapper from '../../components/screenWrapper/screenWrapper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useColorScheme } from 'react-native';
import LottieView from 'lottie-react-native';

const { width } = Dimensions.get('window');

// Memoized Recording Item for performance optimization
const RecordingItem = memo(({ item, onPress }) => {
  const scaleValue = new Animated.Value(1);

  const onPressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={[styles.recordingCard, { transform: [{ scale: scaleValue }] }]}
    >
      <TouchableOpacity
        style={styles.recordingCardInner}
        activeOpacity={0.8}
        onPress={() => onPress(item)}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        accessibilityRole="button"
        accessibilityLabel={`Recording: ${item.analysisResults?.resultDetails || 'No Prediction'}, Date: ${new Date(item.timestamp).toLocaleDateString()}`}
      >
        <View style={styles.iconContainer}>
          <FontAwesome5 name="music" size={24} color="#fff" />
        </View>
        <View style={styles.recordingInfo}>
          <Text style={styles.recordingPrediction}>
            {item.analysisResults?.resultDetails || 'No Prediction'}
          </Text>
          <Text style={styles.recordingDate}>
            {new Date(item.timestamp).toLocaleDateString()}
          </Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
});

export default function BabyRecordingsScreen({ route, navigation }) {
  const { baby } = route.params;
  const dispatch = useDispatch();
  const { recordings, status, error } = useSelector((state) => state.recordings);

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const fetchRecordings = useCallback(async () => {
    try {
      await dispatch(fetchRecordingsByBaby(baby._id));
    } catch (err) {
    }
  }, [dispatch, baby._id]);

  useEffect(() => {
    const minLoadTime = new Promise(resolve => setTimeout(resolve, 1000)); 
    const fetchData = fetchRecordings();

    Promise.all([minLoadTime, fetchData]).then(() => {
      setShowLoader(false);
    });

    return () => {
      setShowLoader(false);
    };
  }, [fetchRecordings]);

  const onRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await fetchRecordings();
    setIsRefreshing(false);
  }, [fetchRecordings]);

  const handleRetry = () => {
    fetchRecordings();
  };

  const handlePressItem = (item) => {
    console.log('Pressed item:', item);
  };

  const renderRecordingItem = ({ item }) => (
    <RecordingItem item={item} onPress={handlePressItem} />
  );

  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <FontAwesome5 name="file-audio" size={50} color="#ccc" />
      <Text style={styles.noRecordingsText}>No recordings found.</Text>
    </View>
  );

  const renderErrorComponent = () => (
    <View style={styles.errorContainer}>
      <FontAwesome5 name="exclamation-triangle" size={50} color="#D32F2F" />
      <Text style={styles.errorText}>Error: {error}</Text>
      <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
        <Text style={styles.retryButtonText}>Retry</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScreenWrapper>
      <View style={[styles.container, isDarkMode && styles.containerDark]}>
        {/* Header with Back Button and Title */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            accessibilityRole="button"
            accessibilityLabel="Go Back"
          >
            <FontAwesome name="arrow-left" size={24} color={isDarkMode ? '#fff' : '#333'} />
          </TouchableOpacity>
          <Text style={[styles.title, isDarkMode && styles.titleDark]}>
            {baby.name}'s Recordings
          </Text>
          <View style={styles.placeholder} />
        </View>

        {/* Display total number of recordings */}
        {recordings.length > 0 && (
          <Text style={[styles.totalRecordings, isDarkMode && styles.totalRecordingsDark]}>
            Total Recordings: {recordings.length}
          </Text>
        )}

        {showLoader || (status === 'loading' && recordings.length === 0) ? (
          // Show Lottie animation when loading
          <View style={styles.loaderContainer}>
            <LottieView
              source={require('../../assets/public/loading.json')}
              autoPlay
              loop
              style={styles.lottie}
            />
          </View>
        ) : status === 'failed' ? (
          renderErrorComponent()
        ) : (
          <FlatList
            data={recordings}
            renderItem={renderRecordingItem}
            keyExtractor={(item) => item._id.toString()}
            ListEmptyComponent={renderEmptyComponent}
            contentContainerStyle={[
              styles.listContent,
              recordings.length === 0 && styles.listContentEmpty,
            ]}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={onRefresh}
                colors={['#EF8D7F']}
                tintColor="#EF8D7F"
              />
            }
            accessibilityRole="list"
          />
        )}
      </View>
    </ScreenWrapper>
  );
}
