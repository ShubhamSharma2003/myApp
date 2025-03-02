import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Shop from '../screens/CategoryScreen';
import CategoryItems from '../screens/CategoryItems';
import CartScreen from '../screens/CartScreen';
import CollectionScreen from '../screens/CollectionScreen';
import SearchScreen from '../screens/SearchScreen';

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
            <Stack.Screen name="SearchScreen" component={SearchScreen} />
            

            {/* <Stack.Screen name="CartScreen" component={CartScreen} /> */}
        </Stack.Navigator>
    );
}