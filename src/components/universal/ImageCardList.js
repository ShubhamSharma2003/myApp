import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Animated, Pressable } from 'react-native';
import PremiumTouchable from './Pressable';

const categories = [
    { label: 'SHOP SMARTWATCH', imageSource: 'https://www.gonoise.com/cdn/shop/files/image_-_2025-02-13T113058.326_400x.png?v=1739426600' },
    { label: 'SHOP AUDIO', imageSource: 'https://www.gonoise.com/cdn/shop/files/image_92_17c8cc35-4762-424a-a900-5e6efe91ca4f_400x.png?v=1738561848' },
    { label: 'SHOP SPEAKERS', imageSource: 'https://www.gonoise.com/cdn/shop/files/image_-_2025-02-13T113058.326_400x.png?v=1739426600' },
    { label: 'SHOP ACCESSORIES', imageSource: 'https://www.gonoise.com/cdn/shop/files/image_92_17c8cc35-4762-424a-a900-5e6efe91ca4f_400x.png?v=1738561848' },
];

// Skeleton Loader Component
const SkeletonLoader = () => {
    const opacity = new Animated.Value(0.3);
    
    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(opacity, { toValue: 1, duration: 800, useNativeDriver: true }),
                Animated.timing(opacity, { toValue: 0.3, duration: 800, useNativeDriver: true }),
            ])
        ).start();
    }, []);

    return (
        <View style={styles.skeletonContainer}>
            {[...Array(4)].map((_, index) => (
                <Animated.View key={index} style={[styles.skeletonCard, { opacity }]}>
                    <View style={styles.skeletonImage} />
                    <View style={styles.skeletonTextContainer}>
                        <View style={styles.skeletonDiscount} />
                        <View style={styles.skeletonLabel} />
                    </View>
                </Animated.View>
            ))}
        </View>
    );
};

const ImageCardList = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 2000); 
    }, []);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {isLoading ? (
                <SkeletonLoader />
            ) : (
                categories.map((item, index) => (
                    <PremiumTouchable onPress={() => console.log("See All Clicked")} style={styles.seeAllButton}>
                        <Image source={{ uri: item.imageSource }} style={styles.image} resizeMode="cover" />
                        <View style={styles.overlay}>
                            {/* <Text style={styles.discount}>%</Text> */}
                            <Text style={styles.label}>{item.label}</Text>
                        </View>
                    </PremiumTouchable>
                ))
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingTop: 50,
        paddingBottom: 20,
        gap:10,
    },
    cardContainer: {
        width: '100%',
        marginBottom: 10,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: 120,

    },
    overlay: {
        position: 'absolute',
        left: 10,
        top: 10,
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,

    },
    discount: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'red',
        marginRight: 5,
    },
    label: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#fff',
    },

    // Skeleton Loader Styles
    skeletonContainer: {
        width: '100%',
    },
    skeletonCard: {
        width: '100%',
        height: 120,
        backgroundColor: '#f3f3f3',
        borderRadius: 10,
        marginBottom: 10,
        overflow: 'hidden',
    },
    skeletonImage: {
        width: '100%',
        height: '100%',
        backgroundColor: '#ecebeb',
    },
    skeletonTextContainer: {
        position: 'absolute',
        left: 10,
        top: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ecebeb',
        paddingHorizontal: 10,
        paddingVertical: 5,

    },
    skeletonDiscount: {
        width: 20,
        height: 15,
        backgroundColor: '#ecebeb',
        marginRight: 5,

    },
    skeletonLabel: {
        width: 100,
        height: 15,
        backgroundColor: '#ecebeb',

    },
});

export default ImageCardList;
