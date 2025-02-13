import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

const categories = [
    { id: 1, name: 'Best-Seller', icon: 'heart' },
    { id: 2, name: 'New Launches', icon: 'shopping-bag' },
    { id: 3, name: 'Curated Steals', icon: 'tag' },
    { id: 4, name: 'The Noise Choice', icon: 'check' },
];

const subcategories = [
    { id: 1, name: 'Smart-Watches', icon: 'watch' },
    { id: 2, name: 'Wireless Audio', icon: 'headphones' },
    { id: 3, name: 'Speakers ', icon: 'speaker' },
    { id: 4, name: 'Power Series', icon: 'battery-charging' },
    { id: 5, name: 'Accessories', icon: 'shopping-bag' },
];

export default function CategoryNav() {
    return (
        <View style={styles.container}>
            {/* Main Categories */}
            <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                style={styles.mainCategoryScroll}
                contentContainerStyle={{ paddingRight: 10 }}
            >
                {categories.map((category) => (
                    <TouchableOpacity 
                        key={category.id} 
                        style={styles.categoryButton}
                    >
                        <Feather name={category.icon} size={20} color="#FF3366" />
                        <Text style={styles.categoryText}>{category.name}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Subcategories */}
            <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                style={styles.subCategoryScroll}
                contentContainerStyle={{ paddingRight: 10}}
            >
                {subcategories.map((subcategory) => (
                    <TouchableOpacity 
                        key={subcategory.id} 
                        style={styles.subCategoryButton}
                    >
                        <Feather name={subcategory.icon} size={18} color="#666" />
                        <Text style={styles.subCategoryText}>{subcategory.name}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        paddingVertical: 8,
    },
    mainCategoryScroll: {
        paddingHorizontal: 16,
        paddingRight: 10,
        flexDirection: 'row',
        marginBottom: 12,
    },
    categoryButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFE4E9',
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderRadius: 20,
        marginRight: 12,
    },
    categoryText: {
        marginLeft: 5,
        fontSize: 12,
        fontWeight: '600',
        color: '#FF3366',
    },
    subCategoryScroll: {
        paddingHorizontal: 16,
    },
    subCategoryButton: {
        alignItems: 'center',
        marginRight: 20,
    },
    subCategoryText: {
        marginTop: 4,
        fontSize: 14,
        color: '#666',
    },
});