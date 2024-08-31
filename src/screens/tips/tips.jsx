import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomHeader from '../../components/customHeader/customHeader'; // Adjust the path according to your project structure

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function ParentingTipsScreen() {
  const [expanded, setExpanded] = useState(null);

  const handleToggle = index => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(expanded === index ? null : index);
  };

  const tips = [
    {
      title: 'Sleep better',
      content:
        'Ensure a consistent bedtime routine and a calming environment to help your baby sleep better.',
      icon: 'moon-o',
    },
    {
      title: 'Soothing Techniques',
      content:
        'Try swaddling, rocking, and white noise to soothe a fussy baby and promote relaxation.',
      icon: 'medkit',
    },
    {
      title: 'Feeding Tips',
      content:
        'Feed your baby on demand and pay attention to hunger cues for a happier feeding experience.',
      icon: 'cutlery',
    },
  ];

  return (
    <View>
      <CustomHeader title="Tips" />
      <ScrollView contentContainerStyle={styles.container}>
        {tips.map((tip, index) => (
          <View key={index} style={styles.accordionContainer}>
            <TouchableOpacity
              style={styles.accordionTitleContainer}
              onPress={() => handleToggle(index)}>
              <View style={styles.titleWithIcon}>
                <FontAwesome name={tip.icon} size={24} color="#4A5568" style={styles.icon} />
                <Text style={styles.accordionTitle}>{tip.title}</Text>
              </View>
              <FontAwesome
                name={expanded === index ? 'chevron-up' : 'chevron-down'}
                size={18}
                color="#A0AEC0"
              />
            </TouchableOpacity>
            {expanded === index && (
              <View style={styles.accordionContent}>
                <Text style={styles.accordionText}>{tip.content}</Text>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

