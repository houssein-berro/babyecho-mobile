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
import ScreenWrapper from '../../components/screenWrapper/screenWrapper';

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
    {
      title: 'Bonding Time',
      content:
        'Spend time cuddling, talking, and interacting with your baby to strengthen your bond.',
      icon: 'heart',
    },
    {
      title: 'Tummy Time',
      content:
        'Give your baby tummy time every day to strengthen their neck and shoulder muscles.',
      icon: 'child',
    },
    {
      title: 'Baby Proofing',
      content:
        'Ensure a safe home environment by covering sharp edges and securing hazardous items.',
      icon: 'shield',
    },
    {
      title: 'Diaper Care',
      content:
        'Change diapers regularly and apply gentle baby powder or cream to avoid rashes.',
      icon: 'flask',
    },
    {
      title: 'Introducing Solids',
      content:
        'At around 6 months, begin introducing solid foods to complement breastfeeding or formula.',
      icon: 'apple',
    },
  ];

  return (
    <ScreenWrapper>
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
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  accordionContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginBottom: 15,
    padding: 15,
    shadowColor: '#2D3748',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  accordionTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  titleWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
  },
  accordionTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#4A5568',
    fontFamily: 'Inter-Medium',
  },
  accordionContent: {
    padding: 10,
    backgroundColor: '#EDF2F7',
    borderRadius: 8,
  },
  accordionText: {
    fontSize: 16,
    color: '#2D3748',
    lineHeight: 24,
    fontFamily: 'Inter-Regular',
  },
});
