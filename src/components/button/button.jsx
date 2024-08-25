import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function Button({ title, onPress, outlined, style, textStyle }) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        outlined ? styles.outlinedButton : styles.filledButton,
        style,
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.buttonText,
          outlined ? styles.outlinedButtonText : styles.filledButtonText,
          textStyle,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
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
