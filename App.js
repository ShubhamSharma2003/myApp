import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import CartScreen from './src/screens/CartScreen.js';
import Home from './src/screens/home.js';
import categoryScreen from './src/screens/categoryScreen.js';
import Premium from './src/screens/Premium.js';
import Profile from './src/screens/profile.js';
import NoiseLogo from './assets/icons/noise3.svg';
import NoiseLogo2 from './assets/icons/noiseGrey.svg';
import HeartIcon from "./assets/icons/heartIcon.svg"
import HeartIcon2 from "./assets/icons/heartIconGrey.svg"
import nmclub from "./assets/icons/nmclub.svg"
import nmclub2 from "./assets/icons/nmclubgrey.svg"

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// 📌 Animated Icon Component
const AnimatedTabIcon = ({ focused, defaultIcon: DefaultIcon, activeIcon: ActiveIcon, size }) => {
    const scaleAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        Animated.timing(scaleAnim, {
            toValue: focused ? 1.2 : 1, // Zoom in when focused
            duration: 200, // Smooth transition
            useNativeDriver: true,
        }).start();
    }, [focused]);

    return (
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            {focused ? <ActiveIcon width={size} height={size} /> : <DefaultIcon width={size} height={size} />}
        </Animated.View>
    );
};

const MyTabs = () => {
    return (
        <Tab.Navigator
            initialRouteName="Hello NOISEMAKER !"
            screenOptions={{
                headerShown: false,
                tabBarStyle: styles.tabBar,
                tabBarShowLabel: false, // Hide labels
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
                name="Category" 
                component={categoryScreen}
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
        </Tab.Navigator>
    );
};

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen 
                    name="Home" 
                    component={MyTabs} 
                    options={{ headerShown: false }} 
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

// ✅ **Updated Styles**
const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: '#fff',
        borderTopWidth: 0,
        borderTopColor: '#f0f0f0',
        height: 60,
        paddingLeft: 10,
        paddingBottom: 19, 
        paddingTop: 10,
        paddingRight:10,
    },
    icon: {
        color: "#B0B0B0",
    },
    activeIcon: {
        color: "#000000",
    }
});
