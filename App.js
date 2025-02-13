import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Platform, SafeAreaView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import CartScreen from './src/screens/CartScreen.js';
import Home from './src/screens/home.js';
import categoryScreen from './src/screens/categoryScreen.js';
import Premium from './src/screens/Premium.js';
import Profile from './src/screens/profile.js';
import AccountStacks from './src/stacks/accountArena.js';
// import SplashScreen from './src/screens/SplashScreen.js';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MyTabs = () => {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerShown: false,
                tabBarStyle: styles.tabBar,
            }}
        >
            <Tab.Screen 
                name="Home" 
                component={Home}
                options={{
                    tabBarIcon: ({ color }) => <Icon name="home" color={color} size={25} />,
                    tabBarLabel: ({ focused }) => <Text style={[styles.navText, focused && styles.activeText]}>Home</Text>
                }}
            />
            <Tab.Screen 
                name="categoryScreen" 
                component={categoryScreen}
                options={{
                    tabBarIcon: ({ color }) => <Icon name="grid-outline" color={color} size={25} />,
                    tabBarLabel: ({ focused }) => <Text style={[styles.navText, focused && styles.activeText]}>Categories</Text>
                }}
            />
            <Tab.Screen 
                name="Premium" 
                component={Premium}
                options={{
                    tabBarIcon: ({ color }) => <Icon name="diamond-outline" color={color} size={25} />,
                    tabBarLabel: ({ focused }) => <Text style={[styles.navText, focused && styles.activeText]}>Premium</Text>
                }}
            />
            <Tab.Screen 
                name="Cart"
                component={CartScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <View style={styles.badgeContainer}>
                            <Icon name="bag-outline" color={color} size={25} />
                        </View>
                    ),
                    tabBarLabel: ({ focused }) => <Text style={[styles.navText, focused && styles.activeText]}>Cart</Text>
                }}
            />
            <Tab.Screen 
                name="Account"
                options={{
                    tabBarIcon: ({ color }) => (
                        <View style={styles.badgeContainer}>
                            <Icon name="person-outline" color={color} size={25} />
                        </View>
                    ),
                    tabBarLabel: ({ focused }) => <Text style={[styles.navText, focused && styles.activeText]}>Account</Text>
                }}
            >
                {(props) => <AccountStacks {...props} />}
            </Tab.Screen>
        </Tab.Navigator>
    );
};

const MyTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: '#ffffff',
    },
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

const s = StyleSheet.create({
    fl1: { flex: 1 },
    mgtp30: { marginTop: 30 },
});

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
        paddingVertical: 5,
    },
    navText: {
        fontSize: 11,
        color: '#666',
        paddingBottom: 2,
    },
    activeText: {
        color: '#FF3366',
        fontWeight: '600',
    },
    badgeContainer: {
        position: 'relative',
    },
    badge: {
        position: 'absolute',
        top: -3,
        right: -10,
        backgroundColor: '#FF3366',
        paddingHorizontal: 3,
        paddingVertical: 1,
        borderRadius: 10,
    },
    badgeText: {
        color: '#fff',
        fontSize: 7,
        fontWeight: 'bold',
    },
    notificationBadge: {
        position: 'absolute',
        top: -1,
        right: -1,
        width: 8,
        height: 8,
        backgroundColor: '#FF3366',
        borderRadius: 4,
    },
});