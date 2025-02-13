import React, { useRef, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const carouselData = [
    { id: '1',  image: 'https://cdn.shopify.com/s/files/1/0997/6284/files/Slice_1_fcd7ef53-a395-4592-ab0e-5993a03d5842.webp?v=1738863257' },
    { id: '2',  image: 'https://www.gonoise.com/cdn/shop/files/image_-_2025-02-06T172733.386.webp?v=1738843214' },
    { id: '3',  image: 'https://cdn.shopify.com/s/files/1/0997/6284/files/Slice_1_fcd7ef53-a395-4592-ab0e-5993a03d5842.webp?v=1738863257' },
];

const ImageCarousel = () => {
    const scrollRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const handleScroll = (event) => {
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const index = Math.round(contentOffsetX / width);
        setActiveIndex(index);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.mainTitle}>Collections</Text>
            <ScrollView
                ref={scrollRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={16}
            >
                {carouselData.map((item, index) => (
                    <View key={item.id} style={styles.slide}>
                        <Image source={{ uri: item.image }} style={styles.image} />
                        <Text style={styles.title}>{item.title}</Text>
                    </View>
                ))}
            </ScrollView>

            {/* Pagination Dots */}
            <View style={styles.pagination}>
                {carouselData.map((_, index) => (
                    <View key={index} style={[styles.dot, activeIndex === index && styles.activeDot]} />
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginVertical: 0,
        paddingBottom: 10,
        backgroundColor: '#fff',
    },
    mainTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    slide: {
        width,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    image: {
        width: width * 0.92,
        height: 200,
        borderRadius: 10,
    },
    title: {
        position: 'absolute',
        bottom: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        color: '#fff',
        padding: 8,
        borderRadius: 5,
        fontSize: 16,
        fontWeight: 'bold',
    },
    pagination: {
        flexDirection: 'row',
        marginTop: 10,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#bbb',
        marginHorizontal: 5,
    },
    activeDot: {
        backgroundColor: '#FF3366',
    },
});

export default ImageCarousel;
