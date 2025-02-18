import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import HeartIcon from '../../../assets/icons/heartIcon.svg';

const { width } = Dimensions.get('window');

const ProductTileLarge = ({ item }) => {
    const discountPercentage = item.discountedPrice
        ? Math.round(((item.price - item.discountedPrice) / item.price) * 100)
        : 0;

    return (
        <View style={styles.card}>
            <TouchableOpacity style={styles.heartIcon}>
                <HeartIcon width={24} height={24} />
            </TouchableOpacity>

            <Image source={{ uri: item.image }} style={styles.image} />

            <View style={styles.textContainer}>
                <View style={styles.priceContainer}>
                    <Text style={styles.discountedPrice}>₹{item.discountedPrice}</Text>
                    <Text style={styles.originalPrice}>₹{item.price}</Text>
                    <Text style={styles.discountText}>{discountPercentage}% OFF</Text>
                </View>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.description}>{item.description}</Text>
            </View>
        </View>
    );
};

const ProductGridLarge = () => {
    const products = [
        {
            id: '1',
            name: 'Airwave Max 5',
            description: "Adaptive ANC | 80H Playtime",
            price: 4499,
            discountedPrice: 3999,
            image: 'https://cdn.shopify.com/s/files/1/0997/6284/files/Halo-2-Carousel-1_5a47cb71-4d70-4ca0-92d2-905d36be5242.webp?v=1725621304?width=600',
        },
        {
            id: '2',
            name: 'NoiseFit Diva 2',
            description: "Amoled Display | Sleek Dial",
            price: 4499,
            discountedPrice: 3499,
            image: 'https://www.gonoise.com/cdn/shop/files/Twist-Go-GN-Carousel-black-1_ce50d4a5-d8d3-4bb7-85e1-b9e8cdb518a8.png?v=1709117060',
        },
        {
            id: '3',
            name: 'Airwave Max 5',
            description: "Adaptive ANC | 80H Playtime",
            price: 4499,
            discountedPrice: 3999,
            image: 'https://www.gonoise.com/cdn/shop/files/1_1_f69459f8-3c1c-47ea-9716-a7107326832e.webp?v=1738731966',
        },
        {
            id: '4',
            name: 'NoiseFit Diva 2',
            description: "Amoled Display | Sleek Dial",
            price: 4499,
            discountedPrice: 3499,
            image: 'https://www.gonoise.com/cdn/shop/files/Artboard_10.webp?v=1738306745',
        },
    ];

    return (
        <View>
            <Text style={styles.sectionTitle}>Bestsellers</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
                {products.map((item) => (
                    <ProductTileLarge key={item.id} item={item} />
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        paddingTop: 20,
        flexDirection: 'row',
        paddingBottom: 20,
        backgroundColor: '#fff',


    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        paddingLeft: 20,
        paddingTop: 20,
        color: '#000',
        backgroundColor: '#fff',

    },
    card: {
        width: width * 0.7,  // Increased width for larger cards
        backgroundColor: '#fff',
        padding: 15,
        marginRight: 20,
        alignItems: 'center',
        borderWidth: 1,
        borderColor:'#eee',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,

    },
    heartIcon: {
        position: 'absolute',
        top: 15,
        right: 15,
        zIndex: 1,
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'contain',
        marginBottom: 20,
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
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    originalPrice: {
        fontSize: 16,
        color: '#777',
        textDecorationLine: 'line-through',
        marginLeft: 10,
    },
    discountText: {
        fontSize: 14,
        color: 'green',
        fontWeight: 'bold',
        marginLeft: 10,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'left',
        marginTop: 10,
    },
    description: {
        fontSize: 14,
        color: '#777',
        textAlign: 'left',
        marginTop: 5,
    },
});

export default ProductGridLarge;
