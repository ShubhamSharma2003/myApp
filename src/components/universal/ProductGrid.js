import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Dimensions, ImageBackground } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const ProductGrid = () => {
    const products = [
        {
            id: '1',
            name: 'Airwave Max 5',
            description: 'Adaptive ANC | 80H Playtime',
            originalPrice: '₹5,999',
            discount: '16%',
            salePrice: '₹4,499',
            image: 'https://cdn.shopify.com/s/files/1/0997/6284/files/Artboard_10.webp?v=1738306745',
        },
        {
            id: '2',
            name: 'NoiseFit Diva 2',
            description: 'Amoled Display | Sleek Dial',
            originalPrice: '₹6,999',
            discount: '35%',
            salePrice: '₹4,499',
            image: 'https://cdn.shopify.com/s/files/1/0997/6284/files/Artboard_34.webp?v=1738306745',
        },
        {
            id: '3',
            name: 'NoiseFit Diva',
            description: '11" Amoled Diamond Design',
            originalPrice: '₹7,999',
            discount: '41%',
            salePrice: 'Out of stock',
            image: 'https://cdn.shopify.com/s/files/1/0997/6284/files/Artboard_16.webp?v=1738558551',
        }
    ];

    return (
        <View style={styles.container}>
            {/* Background Image */}
            <ImageBackground 
                source={{ uri: 'https://cdn.shopify.com/s/files/1/0997/6284/files/Slice_4Master_buds_M.webp?v=1739372266' }}  
                style={styles.backgroundImage}
            />

            {/* Foreground Content */}
            <View style={styles.overlay}>
                {/* Section Heading */}
                <View style={styles.header}>
                    <Text style={styles.heading}>JUST FOR YOU</Text>
                    <TouchableOpacity style={styles.seeAllButton} >
                        <Text style={styles.seeAllText}>SEE ALL →</Text>
                    </TouchableOpacity>
                </View>

                {/* Product Grid */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
                    {products.map((item) => (
                        <View key={item.id} style={styles.card}>
                            {/* Wishlist Heart Icon */}
                            <TouchableOpacity style={styles.heartIcon}>
                                <FontAwesome name="heart-o" size={18} color="black" />
                            </TouchableOpacity>

                            <Image source={{ uri: item.image }} style={styles.image} />
                            <Text style={styles.name}>{item.name}</Text>
                            <Text style={styles.description}>{item.description}</Text>
                            <Text style={styles.originalPrice}>
                                {item.originalPrice} <Text style={styles.discount}>{item.discount} off</Text>
                            </Text>
                            <Text style={styles.salePrice}>{item.salePrice}</Text>
                        </View>
                    ))}
                </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',  
        width: '100%',
    },
    backgroundImage: {
        position: 'absolute', 
        top: 0,
        left: 0,
        width: '100%',
        height: 300,  
        resizeMode: 'cover',
    },
    overlay: {
        paddingVertical: 20,
        paddingHorizontal: 15,
        position: 'relative',
        zIndex: 10,  
    },
    header: {
        paddingTop: 100,
        alignItems: 'left', 
        marginBottom: 10,
    },
    heading: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 5,
    },
    seeAllButton: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#FFFFFF',
        paddingVertical: 12,
        paddingHorizontal: 40,
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 5, 
        alignSelf: 'flex-start',
    },
    seeAllText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '400',
        textAlign: 'center',
        fontFamily: 'Arial',
    },    
    scrollContainer: {
        paddingBottom: 6,
    },
    card: {
        width: width * 0.4,
        backgroundColor: '#fff',
        padding: 15,
        marginRight: 7,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        elevation: 5,  
    },
    heartIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 1,
    },
    image: {
        width: 120,
        height: 120,
        resizeMode: 'contain',
        marginBottom: 10,
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

export default ProductGrid;
