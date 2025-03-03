import React from 'react';
import { createStackNavigator, CardStyleInterpolators, TransitionSpecs } from '@react-navigation/stack';
import Home from '../screens/home';
import CategoryScreen from '../screens/categoryScreen';
import CartScreen from '../screens/CartScreen';
import WebViewScreen from '../screens/WebViewScreen';
import ProductPage from '../components/product/ProductPage';
import CollectionScreen from '../screens/CollectionScreen';
import FilterScreen from '../screens/FilterScreen';

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
            <Stack.Screen name="CartScreen" component={CartScreen} />
            <Stack.Screen name="CollectionScreen" component={CollectionScreen} options={{ title: 'Collection' }} />
            <Stack.Screen name="WebViewScreen" component={WebViewScreen} />
            <Stack.Screen name="FilterScreen" component={FilterScreen} />
        </Stack.Navigator>
    );
}
