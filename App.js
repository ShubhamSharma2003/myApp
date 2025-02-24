import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from '@expo/vector-icons/Ionicons';

import CartScreen from './src/screens/CartScreen.js';
import Home from './src/screens/home.js';
import CategoryScreen from './src/screens/categoryScreen.js';
import Premium from './src/screens/Premium.js';
import Profile from './src/screens/profile.js';
import ProductPage from './src/components/product/ProductPage.js';

import NoiseLogo from './assets/icons/noise3.svg';
import NoiseLogo2 from './assets/icons/noiseGrey.svg';
import HeartIcon from "./assets/icons/heartIcon.svg";
import HeartIcon2 from "./assets/icons/heartIconGrey.svg";
import nmclub from "./assets/icons/nmclub.svg";
import nmclub2 from "./assets/icons/nmclubgrey.svg";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// 📌 Animated Icon Component
const AnimatedTabIcon = ({ focused, defaultIcon: DefaultIcon, activeIcon: ActiveIcon, size }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(scaleAnim, {
      toValue: focused ? 1.2 : 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [focused]);

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      {focused ? <ActiveIcon width={size} height={size} /> : <DefaultIcon width={size} height={size} />}
    </Animated.View>
    
  );
};

// 📌 Bottom Tab Navigator
const MyTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Hello NOISEMAKER !"
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen 
        name="Hello NOISEMAKER !" 
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <AnimatedTabIcon 
              focused={focused}
              defaultIcon={NoiseLogo2}
              activeIcon={NoiseLogo}
              size={50}
            />
          ),
        }}
      />
      <Tab.Screen 
        name="Shop" 
        component={CategoryScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Animated.View style={{ transform: [{ scale: focused ? 1.2 : 1 }] }}>
              <Icon name="search-outline" size={20} style={[styles.icon, focused && styles.activeIcon]} />
            </Animated.View>
          ),
        }}
      />
      <Tab.Screen 
        name="Premium" 
        component={Premium}
        options={{
          tabBarIcon: ({ focused }) => (
            <AnimatedTabIcon 
              focused={focused}
              defaultIcon={HeartIcon2}
              activeIcon={HeartIcon}
              size={20}
            />
          ),
        }}
      />
      <Tab.Screen 
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Animated.View style={{ transform: [{ scale: focused ? 1.2 : 1 }] }}>
              <Icon name="bag-outline" size={20} style={[styles.icon, focused && styles.activeIcon]} />
            </Animated.View>
          ),
        }}
      />
      <Tab.Screen 
        name="Account"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => (
            <AnimatedTabIcon 
              focused={focused}
              defaultIcon={nmclub2}
              activeIcon={nmclub}
              size={70}
            />
          ),
        }}
      />
      {/* <Tab.Screen 
        name="ProductPage" 
        component={ProductPage} 
        options={{
          tabBarButton: () => null,  // Hides the tab button
          tabBarStyle: styles.tabBar, // Ensures the tab bar remains visible
        }}
      /> */}
    </Tab.Navigator>
  );
};

// 📌 Main Stack Navigator (Includes ProductPage)
const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={MyTabs} />
      <Stack.Screen name="ProductPage" component={ProductPage} />
    </Stack.Navigator>
  );
};

// 📌 App Component
export default function App() {
  const [fontsLoaded] = useFonts({
    'AdihausDIN-Regular': require('./assets/fonts/AdihausDIN-Regular.otf'),
    'AdihausDIN-Bold': require('./assets/fonts/AdihausDIN-Bold.otf'),
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {/* <ActivityIndicator size="large" /> */}
      </View>
    );
  }

  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  );
}

// ✅ Styles
const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#fff',
    borderTopWidth: 0,
    borderTopColor: '#f0f0f0',
    height: 60,
    paddingLeft: 10,
    paddingBottom: 19, 
    paddingTop: 10,
    paddingRight: 10,
  },
  icon: {
    color: "#B0B0B0",
  },
  activeIcon: {
    color: "#000000",
  },
  text: {
    fontFamily: 'AdihausDIN-Regular',
    fontSize: 18,
  },
  boldText: {
    fontFamily: 'AdihausDIN-Bold',
    fontSize: 20,
  },
});