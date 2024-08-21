import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, useColorScheme ,Text} from 'react-native';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? '#333' : '#FFF' }]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
    <Text>me</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
});

export default App;
