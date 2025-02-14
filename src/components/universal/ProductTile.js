import React, { useRef } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Video } from 'expo-av';
import HeartIcon from '../../../assets/icons/heartIcon.svg';

const { width } = Dimensions.get('window');

const ProductTile = ({ item, isFullWidth }) => {
    const videoRef = useRef(null);

    // Calculate discount percentage
    const discountPercentage = item.discountedPrice
        ? Math.round(((item.price - item.discountedPrice) / item.price) * 100)
        : 0;

    return (
        <View style={[styles.card, isFullWidth && styles.fullWidthCard]}>
            {/* Wishlist Heart Icon */}
            {!isFullWidth && (
                <TouchableOpacity style={styles.heartIcon}>
                    <HeartIcon width={18} height={18} />
                </TouchableOpacity>
            )}

            {/* Render Video for First Tile */}
            {isFullWidth ? (
                <Video
                    ref={videoRef}
                    source={{ uri: item.video }}
                    style={styles.fullWidthVideo}
                    resizeMode="cover"
                    shouldPlay
                    isLooping
                    useNativeControls={false}
                    isMuted
                />
            ) : (
                <Image source={{ uri: item.image }} style={styles.image} />
            )}

            {/* Product Details (Only for non-Video items) */}
            {!isFullWidth && (
                <View style={styles.textContainer}>
                    {/* Discounted Price & Original Price */}
                    <View style={styles.priceContainer}>
                        <Text style={styles.discountedPrice}>₹{item.discountedPrice}</Text>
                        <Text style={styles.originalPrice}>₹{item.price}</Text>
                        <Text style={styles.discountText}>{discountPercentage}% OFF</Text>
                    </View>

                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.description}>{item.description}</Text>
                </View>
            )}
        </View>
    );
};

const ProductGrid = () => {
    const products = [
        {
            id: '0',
            type: 'video',
            video: 'https://cdn.shopify.com/videos/c/o/v/ac185a25210d4d4fb92d7b7134d5d3f4.mp4', 
        },
        {
            id: '1',
            name: 'Airwave Max 5',
            description: "Adaptive ANC | 80H Playtime",
            price: 4499,
            discountedPrice: 3999, // New discounted price
            image: 'https://cdn.shopify.com/s/files/1/0997/6284/files/Artboard_10_200x.webp?v=1738306745',
        },
        {
            id: '2',
            name: 'NoiseFit Diva 2',
            description: "Amoled Display | Sleek Dial",
            price: 4499,
            discountedPrice: 3499, // New discounted price
            image: 'https://cdn.shopify.com/s/files/1/0997/6284/files/Artboard_34_200x.webp?v=1738306745',
        },
        {
            id: '3',
            name: 'Airwave Max 5',
            description: "Adaptive ANC | 80H Playtime",
            price: 4499,
            discountedPrice: 3999, // New discounted price
            image: 'https://cdn.shopify.com/s/files/1/0997/6284/files/Artboard_10_200x.webp?v=1738306745',
        },
        {
            id: '4',
            name: 'NoiseFit Diva 2',
            description: "Amoled Display | Sleek Dial",
            price: 4499,
            discountedPrice: 3499, // New discounted price
            image: 'https://cdn.shopify.com/s/files/1/0997/6284/files/Artboard_34_200x.webp?v=1738306745',
        },
    ];

    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
            {/* First Tile (Video) with Full Width */}
            <ProductTile item={products[0]} isFullWidth />

            {/* Other Product Tiles */}
            {products.slice(1).map((item) => (
                <ProductTile key={item.id} item={item} />
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexDirection: 'row',
        padding: 20,
    },
    card: {
        width: width * 0.4,
        backgroundColor: '#fff',
        padding: 3,
        paddingTop: 4,
        marginRight: 7,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#eee',
    },
    fullWidthCard: {
        width: width * 0.4,
        height: 240,
        justifyContent: 'center',
    },
    heartIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 1,
    },
    image: {
        marginTop: 10,
        width: 120,
        height: 120,
        resizeMode: 'contain',
        marginBottom: 15,
    },
    fullWidthVideo: {
        width: '100%',
        height: '100%',
    },
    textContainer: {
        alignItems: 'flex-start',
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    discountedPrice: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000', // Red for discount
    },
    originalPrice: {
        fontSize: 12,
        color: '#777',
        textDecorationLine: 'line-through', // Strikethrough effect
        marginLeft: 5,
    },
    discountText: {
        fontSize: 10,
        color: 'green',
        fontWeight: 'bold',
        marginLeft: 5,
    },
    name: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'left',
    },
    description: {
        fontSize: 12,
        color: '#777',
        textAlign: 'left',
    },
});

export default ProductGrid;
