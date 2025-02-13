import React, { useEffect } from 'react';
import { View, StyleSheet, Platform, Text } from 'react-native';
import LottieView from 'lottie-react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Home');
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigation]);

  // Disable Lottie on web, show a simple loading screen instead
  if (Platform.OS === 'web') {
    return null; 
    // return (
    //   <View style={styles.container}>
    //     <Text style={{ fontSize: 20 }}>Loading...</Text>
    //   </View>
    // );
  }

  return (
    <View style={styles.container}>
      <LottieView
        source={require('../../assets/splashscreen.json')}
        autoPlay
        loop={false}
        style={styles.animation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    width: '100%',
    height: '100%',
  },
});

export default SplashScreen;
