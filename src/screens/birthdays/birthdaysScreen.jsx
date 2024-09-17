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

const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: 12,
  },
  card: {
    borderRadius: 15,
    padding: 15,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  letterPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F6B7A3',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
    elevation: 1,
  },
  letter: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  babyName: {
    fontSize: 22,
    fontWeight: '500',
    fontFamily: 'roboto',
    color: '#333',
  },
  countdownText: {
    fontSize: 16,
    color: '#EF8D7F',
    marginTop: 5,
  },
  birthdayText: {
    fontSize: 14,
    color: '#666',
    marginTop: 3,
  },
  progressBar: {
    marginTop: 10,
    height: 8,
    borderRadius: 5,
    backgroundColor: '#f2f2f2',
  },
  reminderButton: {
    marginTop: 15,
    backgroundColor: '#EF8D7F',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  reminderButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 15,
  },
  closeButton: {
    backgroundColor: '#EF8D7F',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyContainer: {
    marginTop: 50,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottie: {
    width: 200,
    height: 200,
  },
});
