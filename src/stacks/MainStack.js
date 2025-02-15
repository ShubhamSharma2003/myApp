import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import Home from '../screens/home';
import CategoryScreen from '../screens/categoryScreen';
import ProductPage from '../components/product/ProductPage';

const Stack = createStackNavigator();

export default function MainStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                gestureEnabled: true,
                gestureDirection: 'horizontal',
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
        >
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="CategoryScreen" component={CategoryScreen} />
            <Stack.Screen
                name="ProductPage"
                component={ProductPage}
                options={{ headerShown: false, presentation: 'modal' }} // Hide Header & Tabs
            />
        </Stack.Navigator>
    );
}
