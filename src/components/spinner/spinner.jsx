import React, { useEffect, useRef } from 'react';
import { View, Animated, Easing, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function MoonAndStarsSpinner() {

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
