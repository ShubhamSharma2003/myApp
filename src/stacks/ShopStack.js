import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Shop from '../screens/categoryScreen';
import CategoryItems from '../screens/CategoryItems';

const Stack = createStackNavigator();

export default function ShopStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: true,
                headerStyle: {
                    backgroundColor: '#fff',
                },
                headerTintColor: '#333',
            }}
        >
            <Stack.Screen 
                name="ShopMain" 
                component={Shop}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen 
                name="CategoryItems" 
                component={CategoryItems}
                options={({ route }) => ({ 
                    title: route.params.categoryName
                })}
            />
        </Stack.Navigator>
    );
}