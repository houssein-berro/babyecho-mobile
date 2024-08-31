import React, { useEffect, useRef } from 'react';
import { View, Animated, Easing, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function MoonAndStarsSpinner() {
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const starPulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [rotateAnim]);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(starPulseAnim, {
          toValue: 1.5,
          duration: 500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(starPulseAnim, {
          toValue: 1,
          duration: 500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [starPulseAnim]);

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.moon, { transform: [{ rotate: rotation }] }]}>
        <MIcon name="moon-waning-crescent" size={80} color="#FFD700" />
      </Animated.View>
      <Animated.View style={[styles.star, { top: 50, left: 100, transform: [{ scale: starPulseAnim }] }]}>
        <FontAwesome name="star" size={15} color="#FFD700" />
      </Animated.View>
      <Animated.View style={[styles.star, { top: 120, left: 200, transform: [{ scale: starPulseAnim }] }]}>
        <FontAwesome name="star" size={10} color="#FFD700" />
      </Animated.View>
      <Animated.View style={[styles.star, { top: 160, left: 50, transform: [{ scale: starPulseAnim }] }]}>
        <FontAwesome name="star" size={12} color="#FFD700" />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moon: {
    position: 'absolute',
  },
  star: {
    position: 'absolute',
  },
});
