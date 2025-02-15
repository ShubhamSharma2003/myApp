import React, { useRef, useState } from 'react';
import { View, Text, Image, StyleSheet, Animated, PanResponder, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');


const images = [
    'www.gonoise.com/cdn/shop/files/Artboard_13_pro6max.webp?v=1737440923',
    'www.gonoise.com/cdn/shop/files/5_debf6487-e016-42fa-9731-6abff3721427.webp?v=1721364459',
    'www.gonoise.com/cdn/shop/files/6_3a92cd9d-6031-43bf-9401-e3716248e959.png?v=1716531880',
];


const StackedSwipeGallery = () => {
    const position = useRef(new Animated.Value(0)).current;
    const [currentIndex, setCurrentIndex] = useState(0);

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (_, gesture) => {
            position.setValue(gesture.dx);
        },
        onPanResponderRelease: (_, gesture) => {
            if (gesture.dx < -50 && currentIndex < images.length - 1) {
                Animated.timing(position, {
                    toValue: -width,
                    duration: 300,
                    useNativeDriver: true,
                }).start(() => {
                    position.setValue(0);
                    setCurrentIndex((prevIndex) => prevIndex + 1);
                });
            } else {
                Animated.spring(position, {
                    toValue: 0,
                    useNativeDriver: true,
                }).start();
            }
        },
    });

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>SHARE HOW YOU WEAR IT</Text>
            <View style={styles.stackContainer}>
                {images.map((image, index) => {
                    const isTopCard = index === currentIndex;
                    return (
                        <Animated.View
                            key={index}
                            {...(isTopCard ? panResponder.panHandlers : {})}
                            style={[
                                styles.card,
                                {
                                    zIndex: images.length - index,
                                    transform: [
                                        { translateX: isTopCard ? position : new Animated.Value(0) },
                                        { scale: 1 - (images.length - index) * 0.05 },
                                    ],
                                },
                            ]}
                        >
                            <Image source={{ uri: image }} style={styles.image} />
                        </Animated.View>
                    );
                }).reverse()}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingVertical: 20,
    },
    heading: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    stackContainer: {
        width: width * 0.9,
        height: 300,
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        borderRadius: 10,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
});

export default StackedSwipeGallery;