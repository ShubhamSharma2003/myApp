import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Image as ExpoImage } from 'expo-image';

const { width } = Dimensions.get('window');

const ProductCarousel = ({ title, showGif = true }) => {  // Added showGif prop
    // Accept title prop
    const products = [
        {
            id: '1',
            name: 'Airwave Max 5',
            description: 'Adaptive ANC | 80H Playtime',
            originalPrice: '₹5,999',
            discount: '16%',
            salePrice: '₹4,499',
            image: 'https://cdn.shopify.com/s/files/1/0997/6284/files/Artboard_10.webp?v=1738306745',
            rating: 4.5,
            reviews: 12,
        },
        {
            id: '2',
            name: 'NoiseFit Diva 2',
            description: 'Amoled Display | Sleek Dial',
            originalPrice: '₹6,999',
            discount: '35%',
            salePrice: '₹4,499',
            image: 'https://cdn.shopify.com/s/files/1/0997/6284/files/Artboard_34.webp?v=1738306745',
            rating: 4.8,
            reviews: 89,
        },
        {
            id: '3',
            name: 'NoiseFit Diva',
            description: '11" Amoled Diamond Design',
            originalPrice: '₹7,999',
            discount: '41%',
            salePrice: 'Out of stock',
            image: 'https://cdn.shopify.com/s/files/1/0997/6284/files/Artboard_16.webp?v=1738558551',
            rating: 4.2,
            reviews: 45,
        }
    ];

    return (
        <LinearGradient 
            colors={['#FFA8B8', 'rgba(255, 168, 184, 0)']} 
            style={ProductCarouselstyles.gradientBackground}
        >
            <View style={ProductCarouselstyles.container}>
                {/* Title Section */}
                {title && <Text style={ProductCarouselstyles.title}>{title}</Text>}

                {/* GIF Banner */}
                {showGif && (
                    <ExpoImage
                        source={{ uri: 'https://gifgifs.com/animations/holidays/valentines-day/happy_valentines_day_111.gif' }}
                        style={ProductCarouselstyles.gifBanner}
                    />
                )}
    
                {/* Product Scroll Section */}
                <ScrollView 
                    horizontal 
                    showsHorizontalScrollIndicator={false} 
                    contentContainerStyle={ProductCarouselstyles.scrollContainer}
                >
                    {products.map((item) => (
                        <View key={item.id} style={ProductCarouselstyles.card}>
                            <Image source={{ uri: item.image }} style={ProductCarouselstyles.image} />
                            <View style={ProductCarouselstyles.ratingContainer}>
                                <FontAwesome name="star" size={14} color="gold" />
                                <Text style={ProductCarouselstyles.ratingText}>{item.rating} ({item.reviews})</Text>
                            </View>
                            <Text style={ProductCarouselstyles.name}>{item.name}</Text>
                            <Text style={ProductCarouselstyles.description}>{item.description}</Text>
                            <Text style={ProductCarouselstyles.originalPrice}>
                                {item.originalPrice} <Text style={ProductCarouselstyles.discount}>{item.discount} off</Text>
                            </Text>
                            <Text style={ProductCarouselstyles.salePrice}>{item.salePrice}</Text>
                        </View>
                    ))}
                </ScrollView>
            </View>
        </LinearGradient>
    );
};

const ProductCarouselstyles = StyleSheet.create({
    gradientBackground: {
        paddingVertical: 20, 
        paddingHorizontal: 15,
        borderRadius: 20,
        overflow: 'hidden',
        backgroundColor: '#FFF',
    },
    container: {
        paddingBottom: 5, 
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
        color: '#333', // Dark text for readability
    },
    gifBanner: {
        width: width - 30, // Full width with padding
        height: 120, // Adjust height as needed
        alignSelf: 'center',
        marginBottom: 10, // Spacing below banner
    },
    scrollContainer: {
        paddingBottom: 6,
    },
    card: {
        width: width * 0.5,
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 15, 
        marginRight: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        elevation: 2,
    },
    image: {
        width: 120,
        height: 120,
        resizeMode: 'contain',
        marginBottom: 10,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    ratingText: {
        fontSize: 12,
        marginLeft: 5,
        color: '#444',
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    description: {
        fontSize: 12,
        color: '#777',
        textAlign: 'center',
        marginBottom: 5,
    },
    originalPrice: {
        textDecorationLine: 'line-through',
        color: '#777',
        fontSize: 12,
    },
    discount: {
        color: 'green',
        fontWeight: 'bold',
    },
    salePrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#6a1b9a',
        marginTop: 5,
    }
});

export default ProductCarousel;
