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

