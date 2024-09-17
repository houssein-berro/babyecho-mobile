import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
import { useSelector } from 'react-redux';
import ScreenWrapper from '../../components/screenWrapper/screenWrapper';
import moment from 'moment';
import { ProgressBar } from 'react-native-paper';
import Modal from 'react-native-modal';
import LinearGradient from 'react-native-linear-gradient';
import LottieView from 'lottie-react-native';

function BirthdayCard({ baby, handleSetReminder }) {
  const animation = useState(new Animated.Value(0))[0];

  useEffect(() => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 500,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [animation]);

  const cardStyle = {
    opacity: animation,
    transform: [
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [20, 0],
        }),
      },
    ],
  };

  const progressPercent = Math.min(Math.max(baby.progress, 0), 1);

  // Calculate months and days remaining
  const duration = moment.duration(moment(baby.countdown.nextBirthday).diff(moment()));
  const monthsRemaining = Math.floor(duration.asMonths());
  const daysRemaining = duration.days();

  // Function to get progress bar color based on how close the birthday is
  const getProgressBarColor = (progress) => {
    const red = Math.floor(239 + (139 * progress)); 
    const green = Math.floor(211 - (211 * progress));
    const blue = Math.floor(127 - (127 * progress));
    return `rgb(${red}, ${green}, ${blue})`; 
  };

  return (
    <Animated.View style={[styles.cardContainer, cardStyle]}>
      <LinearGradient
        colors={['#f7f7f7', '#fff']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
        <View style={styles.cardContent}>
          {baby.photo ? (
            <Image source={{ uri: baby.photo }} style={styles.photo} />
          ) : (
            <View style={styles.letterPlaceholder}>
              <Text style={styles.letter}>{baby.name.charAt(0).toUpperCase()}</Text>
            </View>
          )}

          <View style={styles.infoContainer}>
            <Text style={styles.babyName}>{baby.name}</Text>
            <Text style={styles.countdownText}>
              {monthsRemaining} months, {daysRemaining} days left
            </Text>
            <Text style={styles.birthdayText}>
              Birthday: {moment(baby.birthdate).format('MMMM Do')}
            </Text>
            <ProgressBar
              progress={progressPercent}
              color={getProgressBarColor(progressPercent)}
              style={styles.progressBar}
            />
          </View>
        </View>

        <TouchableOpacity
          style={styles.reminderButton}
          onPress={() => handleSetReminder(baby)}
          activeOpacity={0.8}
        >
          <Text style={styles.reminderButtonText}>Set Reminder</Text>
        </TouchableOpacity>
      </LinearGradient>
    </Animated.View>
  );
}

export default function BirthdaysCountdownScreen({ navigation }) {
  const babies = useSelector(state => state.user.user.babies || []);
  const [countdowns, setCountdowns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(true); 
  const [modalVisible, setModalVisible] = useState(false);
  const [reminderMessage, setReminderMessage] = useState('');

  useEffect(() => {
    const updateCountdowns = () => {
      const now = moment();
      const updatedCountdowns = babies
        .map(baby => {
          const birthday = moment(baby.birthdate);
          if (!birthday.isValid()) return null;

          const nextBirthday = birthday.clone().year(now.year());
          if (nextBirthday.isBefore(now, 'day')) {
            nextBirthday.add(1, 'years');
          }

          const totalDays = nextBirthday.diff(birthday.clone().year(nextBirthday.year() - 1), 'days');
          const daysPassed = now.diff(birthday.clone().year(nextBirthday.year() - 1), 'days');
          const progress = daysPassed / totalDays;

          const duration = moment.duration(nextBirthday.diff(now));

          return {
            ...baby,
            countdown: {
              nextBirthday,
              months: duration.months(),
              days: duration.days(),
            },
            progress,
          };
        })
        .filter(item => item !== null);

      setCountdowns(updatedCountdowns);
    };

    const minLoadTime = new Promise(resolve => setTimeout(resolve, 1000)); 
    const fetchData = new Promise(resolve => {
      updateCountdowns();
      resolve();
    });

    // Use Promise.all to ensure both data fetching and the 1-second delay are finished
    Promise.all([minLoadTime, fetchData]).then(() => {
      setLoading(false); 
      setShowLoader(false); 
    });

    const interval = setInterval(updateCountdowns, 60000);
    return () => clearInterval(interval);
  }, [babies]);

  const handleSetReminder = baby => {
    const reminderText = `Reminder set for ${baby.name}'s birthday on ${moment(baby.birthdate).format('MMMM Do')}! 🎉`;
    setReminderMessage(reminderText);
    setModalVisible(true);
  };

  const renderItem = ({ item }) => (
    <BirthdayCard baby={item} handleSetReminder={handleSetReminder} />
  );

  return (
    <ScreenWrapper>
      {showLoader || loading ? (
        <View style={styles.loadingContainer}>
          <LottieView
            source={require('../../assets/public/loading.json')}
            autoPlay
            loop
            style={styles.lottie}
          />
        </View>
      ) : (
        <FlatList
          data={countdowns}
          renderItem={renderItem}
          keyExtractor={item => item._id.toString()}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No birthdays to display.</Text>
            </View>
          }
        />
      )}

      {/* Custom Modal for Reminder */}
      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
        animationIn="zoomIn"
        animationOut="zoomOut"
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>{reminderMessage}</Text>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </ScreenWrapper>
  );
}
