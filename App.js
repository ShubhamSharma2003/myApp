import { View, Image, StyleSheet } from 'react-native';
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



const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

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
                        focused ? (
                            <View style={styles.imageContainer}>
                                <NoiseLogo width={50} height={20} style={focused && styles.imageActive} />
                            </View>
                        ) : (
                            <View style={styles.imageContainer}>
                                <NoiseLogo2 width={50} height={20} style={focused && styles.imageActive} />
                            </View>
                        )
                    ),
                }}
            />

            <Tab.Screen 
                name="Category" 
                component={categoryScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Icon name="search-outline" size={20} style={[styles.icon, focused && styles.activeIcon]} />
                    ),
                }}
            />
            <Tab.Screen 
                name="Premium" 
                component={Premium}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Icon name="heart-outline" size={20} style={[styles.icon, focused && styles.activeIcon]} />
                    ),
                }}
            />
            <Tab.Screen 
                name="Cart"
                component={CartScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Icon name="bag-outline" size={20} style={[styles.icon, focused && styles.activeIcon]} />
                    ),
                }}
            />
            <Tab.Screen 
                name="Account"
                component={Profile}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Icon name="person-outline" size={20} style={[styles.icon, focused && styles.activeIcon]} />
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
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
        height: 60, // Adjust height for better spacing
        paddingBottom: 19, 
        paddingTop: 10,
    },
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 20,
        width: 100,  // Make image container larger
        height: 60,
    },
    image: {
        width: 50,  // Adjust for better spacing
        height: 20,
    },
    imageActive: {
        tintColor: "#000000", // Highlight active tab
    },
    icon: {
        paddingLeft: 10,
        color: "#B0B0B0",
    },
    activeIcon: {
        color: "#000000", // Make active icon black
    }
});
