import React from 'react';
import { createStackNavigator, CardStyleInterpolators, TransitionSpecs } from '@react-navigation/stack';
import Home from '../screens/home';
import CategoryScreen from '../screens/categoryScreen';
import ProductPage from '../components/product/ProductPage';

const Stack = createStackNavigator();

export default function MainStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false, // Hides the header globally
                gestureEnabled: true, // Enables gestures (swipe to go back)
                gestureDirection: 'horizontal', // Horizontal swipe to go back
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, // Sliding effect
                transitionSpec: {
                    open: TransitionSpecs.RevealFromBottomAndroid, // Transition for opening the screen
                    close: {
                        ...TransitionSpecs.FadeOutToBottomAndroid,
                        duration: 600, 
                    },
                },
            }}
        >
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="CategoryScreen" component={CategoryScreen} />
            <Stack.Screen
                name="ProductPage"
                component={ProductPage}
                options={{
                    headerShown: false, // Hide header for this screen
                    presentation: 'transparentModal', // Optional: Use modal presentation style for product page
                }}
            />
            
        </Stack.Navigator>
    );
}
