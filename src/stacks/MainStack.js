import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import Home from '../screens/home';
import CategoryScreen from '../screens/categoryScreen';

const Stack = createStackNavigator();

export default function MainStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                gestureEnabled: true,
                gestureDirection: 'horizontal', // Right to Left
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, // Smooth iOS-style transition
            }}
        >
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="CategoryScreen" component={CategoryScreen} />
        </Stack.Navigator>
    );
}
