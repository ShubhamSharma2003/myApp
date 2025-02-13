import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import ProductMini from '../components/universal/productmini';

export default function CategoryItems({ route }) {
    const { categoryName } = route.params;

    // This would typically come from an API or data store
    const categoryItems = [
        // Temporary mock data - replace with real data
        { id: '1', name: 'Product 1', price: '299', category: categoryName },
        { id: '2', name: 'Product 2', price: '399', category: categoryName },
        { id: '3', name: 'Product 3', price: '499', category: categoryName },
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{categoryName}</Text>
            <FlatList
                data={categoryItems}
                renderItem={({ item }) => <ProductMini product={item} />}
                keyExtractor={item => item.id}
                numColumns={2}
                style={styles.grid}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    grid: {
        flex: 1,
    },
});