import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

export default function Button({ title, onPress, outlined, style, textStyle, icon }) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        outlined ? styles.outlinedButton : styles.filledButton,
        style,
      ]}
      activeOpacity={0.6}  
      onPress={onPress}
    >
      <View style={styles.content}>
        {icon && <View style={styles.iconContainer}>{icon}</View>}
        <Text
          style={[
            styles.buttonText,
            outlined ? styles.outlinedButtonText : styles.filledButtonText,
            textStyle,
          ]}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: 10,
  },
  filledButton: {
    backgroundColor: '#EF8D7F',
  },
  outlinedButton: {
    backgroundColor: '#FFFFFF',
    borderColor: '#EF8D7F',
    borderWidth: 1,
  },
  filledButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  outlinedButtonText: {
    color: '#EF8D7F',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
