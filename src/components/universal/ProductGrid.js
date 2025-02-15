import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Dimensions, ImageBackground } from 'react-native';
import { Video } from 'expo-av';
import ContentLoader, { Rect } from 'react-content-loader/native';
import PremiumTouchable from './Pressable';
import HeartIcon from "../../../assets/icons/heartIcon.svg";
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const ProductGrid = ({ backgroundType = 'video' }) => {
    const navigation = useNavigation(); // Get navigation instance

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setProducts([
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
            ]);
            setLoading(false);
        }, 100);
    }, []);

    return (
        <View style={styles.container}>
            {backgroundType === 'video' ? (
                <Video
                    source={{ uri: 'https://cdn.shopify.com/videos/c/o/v/32ca002305a54cf4969f415d066744e7.mp4' }}
                    style={styles.backgroundVideo}
                    resizeMode="cover"
                    shouldPlay
                    isLooping
                />
            ) : (
                <ImageBackground
                    source={{ uri: 'https://cdn.shopify.com/s/files/1/0997/6284/files/Slice_4Master_buds_M.webp?v=1739372266' }}
                    style={styles.backgroundImage}
                />
            )}

            <View style={styles.overlay}>
                <View style={styles.header}>
                    <Text style={styles.heading}>JUST FOR YOU</Text>
                    <PremiumTouchable onPress={() => console.log("See All Clicked")} style={styles.seeAllButton}>
                        <Text style={styles.seeAllText}>SEE ALL →</Text>
                    </PremiumTouchable>
                </View>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
                    {loading
                        ? Array(3).fill(0).map((_, index) => (
                            <View key={index} style={styles.card}>
                                <ProductPlaceholder />
                            </View>
                        ))
                        : products.map((item) => (
                            <TouchableOpacity 
                                key={item.id} 
                                style={styles.card} 
                                onPress={() => navigation.navigate('ProductPage', { product: item })} // ✅ Fixed navigation
                            >
                                <TouchableOpacity style={styles.heartIcon}>
                                    <HeartIcon width={18} height={18} />
                                </TouchableOpacity>
                                <Image source={{ uri: item.image }} style={styles.image} />
                                <Text style={styles.name}>{item.name}</Text>
                                <Text style={styles.description}>{item.description}</Text>
                                <Text style={styles.originalPrice}>
                                    {item.originalPrice} <Text style={styles.discount}>{item.discount} off</Text>
                                </Text>
                                <Text style={styles.salePrice}>{item.salePrice}</Text>
                            </TouchableOpacity>
                        ))}
                </ScrollView>
            </View>
        </View>
    );
};

// Skeleton Loader
const ProductPlaceholder = () => (
    <ContentLoader
        speed={1.5}
        width={width * 0.4}
        height={200}
        viewBox={`0 0 ${width * 0.4} 200`}
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
    >
        <Rect x="10" y="10" rx="10" ry="10" width="120" height="120" />
        <Rect x="10" y="140" rx="4" ry="4" width="100" height="10" />
        <Rect x="10" y="160" rx="4" ry="4" width="80" height="10" />
        <Rect x="10" y="180" rx="4" ry="4" width="50" height="10" />
    </ContentLoader>
);

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
        height: 550,
        resizeMode: 'cover',
    },
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: 550,
    },
    overlay: {
        paddingTop: 180,
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
        borderColor: '#eee',
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
        color: '#000000',
        marginTop: 5,
    },
});

export default ProductGrid;
