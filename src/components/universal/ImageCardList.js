import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Animated, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const categories = [
    { label: 'SHOP SMARTWATCH', handle: 'smart-watches', imageSource: 'https://cdn.shopify.com/s/files/1/0997/6284/files/Black_and_Gray_Minimalist_LinkedIn_Banner_1.png?v=1739523096' },
    { label: 'SHOP AUDIO', handle: 'anc-earbuds', imageSource: 'https://cdn.shopify.com/s/files/1/0997/6284/files/Black_and_Gray_Minimalist_LinkedIn_Banner_2.png?v=1739523656' },
    { label: 'SHOP SPEAKERS', handle: 'speakers', imageSource: 'https://cdn.shopify.com/s/files/1/0997/6284/files/Black_and_Gray_Minimalist_LinkedIn_Banner_1.png?v=1739523096' },
    { label: 'SHOP ACCESSORIES', handle: 'accessories', imageSource: 'https://cdn.shopify.com/s/files/1/0997/6284/files/Black_and_Gray_Minimalist_LinkedIn_Banner_2.png?v=1739523656' },
];

// **Category Card Component (With Animation)**
const CategoryCard = ({ item, onPress }) => {
    const scaleAnim = new Animated.Value(1);

    const handlePressIn = () => {
        Animated.timing(scaleAnim, {
            toValue: 0.95,
            duration: 100,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 100,
            useNativeDriver: true,
        }).start();
    };

    return (
        <Animated.View style={[styles.card, { transform: [{ scale: scaleAnim }] }]}>
            <Pressable
                onPress={() => onPress(item.handle)}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
            >
                <Image source={{ uri: item.imageSource }} style={styles.image} resizeMode="cover" />
                <View style={styles.overlay}>
                    <Text style={styles.label}>{item.label}</Text>
                </View>
            </Pressable>
        </Animated.View>
    );
};

// **Main Component**
const ImageCardList = () => {
    const navigation = useNavigation();

    const handleCategoryPress = (handle) => {
        navigation.navigate('CollectionScreen', { handle });
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {categories.map((item, index) => (
                <CategoryCard key={index} item={item} onPress={handleCategoryPress} />
            ))}
        </ScrollView>
    );
};

// **Styles**
const styles = StyleSheet.create({
    container: {
        padding: 20,
        gap: 10,
    },
    card: {
        width: '100%',
    },
    image: {
        width: '100%',
        height: 120,
        borderRadius: 8,
    },
    overlay: {
        position: 'absolute',
        left: 10,
        top: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
    },
    label: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#fff',
    },
});

export default ImageCardList;
