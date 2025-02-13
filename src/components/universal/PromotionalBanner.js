import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions, Animated } from 'react-native';
import { Image as ExpoImage } from 'expo-image';
import { Video } from 'expo-av';

const { width } = Dimensions.get('window');

const banners = [
    { uri: 'https://blog.aweber.com/wp-content/uploads/2023/01/content-9035-2024-valentines-day-gifs_600x400.gif' }, // GIF
    { uri: 'https://cdn.shopify.com/videos/c/o/v/6e457ab1bd634d77b4b91161587ae051.mp4' }, // Static Image
    { uri: 'https://www.gonoise.com/cdn/shop/files/1920x992_D_500x.png?v=1738949146' }, // Static Image
    { uri: 'https://www.w3schools.com/html/mov_bbb.mp4', type: 'video' }, // Video Example
];

export default function PromotionalBanner() {
    const scrollX = useRef(new Animated.Value(0)).current;
    const scrollViewRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            let nextIndex = (currentIndex + 1) % banners.length;
            setCurrentIndex(nextIndex);

            // Smooth scrolling animation
            Animated.timing(scrollX, {
                toValue: nextIndex * width,
                duration: 800,
                useNativeDriver: false,
            }).start(() => {
                if (scrollViewRef.current) {
                    scrollViewRef.current.scrollTo({ x: nextIndex * width, animated: true });
                }
            });
        }, 3000);

        return () => clearInterval(interval);
    }, [currentIndex]);

    const renderMedia = (item) => {
        if (item.type === 'video' || item.uri.endsWith('.mp4')) {
            return (
                <Video
                    source={{ uri: item.uri }}
                    style={PromotionalBannerstyles.media}
                    resizeMode="cover"
                    shouldPlay
                    isLooping
                    isMuted={true}
                />
            );
        } else {
            return (
                <ExpoImage
                    source={{ uri: item.uri }}
                    style={PromotionalBannerstyles.media}
                    contentFit="cover"
                />
            );
        }
    };

    return (
        <Animated.ScrollView
            ref={scrollViewRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            onMomentumScrollEnd={(event) => {
                const newIndex = Math.round(event.nativeEvent.contentOffset.x / width);
                setCurrentIndex(newIndex);
            }}
        >
            {banners.map((item, index) => (
                <View key={index} style={PromotionalBannerstyles.container}>
                    {renderMedia(item)}
                </View>
            ))}
        </Animated.ScrollView>
    );
}

const PromotionalBannerstyles = StyleSheet.create({
    container: {
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 10,
        backgroundColor: '#fff',
    },
    media: {
        width: width - 32,
        height: 200,
        borderRadius: 12,
        overflow: 'hidden',
    },
});
