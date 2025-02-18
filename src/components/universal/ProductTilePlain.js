import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import HeartIcon from '../../../assets/icons/heartIcon.svg';

const { width } = Dimensions.get('window');

const ProductTilePlain = ({ item }) => {
    const discountPercentage = item.discountedPrice
        ? Math.round(((item.price - item.discountedPrice) / item.price) * 100)
        : 0;

    return (
        <View style={styles.card}>
            <TouchableOpacity style={styles.heartIcon}>
                <HeartIcon width={18} height={18} />
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

const ProductGrid = () => {
    const products = [
        {
            id: '1',
            name: 'Airwave Max 5',
            description: "Adaptive ANC | 80H Playtime",
            price: 4499,
            discountedPrice: 3999,
            image: 'https://cdn.shopify.com/s/files/1/0997/6284/files/Artboard_10_200x.webp?v=1738306745',
        },
        {
            id: '2',
            name: 'NoiseFit Diva 2',
            description: "Amoled Display | Sleek Dial",
            price: 4499,
            discountedPrice: 3499,
            image: 'https://cdn.shopify.com/s/files/1/0997/6284/files/Artboard_34_200x.webp?v=1738306745',
        },
        {
            id: '3',
            name: 'Airwave Max 5',
            description: "Adaptive ANC | 80H Playtime",
            price: 4499,
            discountedPrice: 3999,
            image: 'https://cdn.shopify.com/s/files/1/0997/6284/files/Artboard_10_200x.webp?v=1738306745',
        },
        {
            id: '4',
            name: 'NoiseFit Diva 2',
            description: "Amoled Display | Sleek Dial",
            price: 4499,
            discountedPrice: 3499,
            image: 'https://cdn.shopify.com/s/files/1/0997/6284/files/Artboard_34_200x.webp?v=1738306745',
        },
    ];

    return (
        <View>
        <Text style={styles.sectionTitle}>You May Also Like</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
            {products.map((item) => (
                <ProductTilePlain key={item.id} item={item} />
            ))}
        </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexDirection: 'row',
        padding: 20,
        
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 20,
        paddingTop: 20,
        color: '#000',
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
        color: '#000',
    },
    originalPrice: {
        fontSize: 12,
        color: '#777',
        textDecorationLine: 'line-through',
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
