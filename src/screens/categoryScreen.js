import React from "react";
import { View, ScrollView, SafeAreaView, Text, Dimensions } from 'react-native';
import Header from "../components/universal/header";
import CategoryNav from "../components/universal/CategoryNav";
import ProductCarousel from "../components/universal/ProductCarousel";
import ProductMini from "../components/universal/productmini";
import { LinearGradient } from 'expo-linear-gradient';
import styles from '../../styles/mainStyle';

const { width } = Dimensions.get("window"); // Get device width
const cardWidth = (width / 2) - 20; // Ensure two cards fit in a row

const bestsellerdemoproducts = [
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
        name: 'NoiseFit Diva 3',
        description: 'AMOLED | 7-Day Battery',
        originalPrice: '₹5,999',
        discount: '20%',
        salePrice: '₹4,799',
        image: 'https://cdn.shopify.com/s/files/1/0997/6284/files/Artboard_20.webp?v=1738306745',
        rating: 4.6,
        reviews: 78,
    },
    {
        id: '4',
        name: 'Noise Air Buds Pro',
        description: 'Hybrid ANC | 45H Playtime',
        originalPrice: '₹4,999',
        discount: '25%',
        salePrice: '₹3,749',
        image: 'https://cdn.shopify.com/s/files/1/0997/6284/files/Artboard_12.webp?v=1738306745',
        rating: 4.7,
        reviews: 134,
    },
    {
        id: '5',
        name: 'Noise ColorFit Pro 4',
        description: '1.85" Display | 150+ Watch Faces',
        originalPrice: '₹3,999',
        discount: '15%',
        salePrice: '₹3,399',
        image: 'https://cdn.shopify.com/s/files/1/0997/6284/files/Artboard_30.webp?v=1738306745',
        rating: 4.5,
        reviews: 200,
    },
    {
        id: '6',
        name: 'NoiseFit Twist',
        description: 'Round Dial | 1.4" TFT Display',
        originalPrice: '₹2,999',
        discount: '30%',
        salePrice: '₹2,099',
        image: 'https://cdn.shopify.com/s/files/1/0997/6284/files/Artboard_15.webp?v=1738306745',
        rating: 4.4,
        reviews: 90,
    },
];


export default function Shop() {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1 }} nestedScrollEnabled={true}>

                <Header />
                <CategoryNav />

                {/* Limited Time Deals */}
                <ProductCarousel title="Limited Time Deals" showGif={false} />

                {/* Shop Now Section with LinearGradient */}
                <LinearGradient
                    colors={['#FF96AA', 'rgba(255, 213, 221, 0)']} // Your exact colors
                    start={{ x: 0.5, y: -0.15 }} // Simulating 2-degree angle
                    end={{ x: 0.5, y: 0.6 }}  // Match 59.25% stop point
                    style={categoryStyles.shopNowContainer}
                >
                    <Text style={categoryStyles.title}>Shop Now</Text>

                    {/* Rendering Products in Rows of Two */}
                    <View style={categoryStyles.productGrid}>
                        {bestsellerdemoproducts.map((data, index) => (
                            index % 2 === 0 ? (
                                <View key={data.id} style={categoryStyles.productRow}>
                                    <ProductMini
                                        width={cardWidth}
                                        height={270}
                                        productTitleStyle={styles.f14}
                                        productimgheight={110}
                                        productimgresizemode={"contain"}
                                        product={bestsellerdemoproducts[index]}
                                    />
                                    {bestsellerdemoproducts[index + 1] && (
                                        <ProductMini
                                            width={cardWidth}
                                            height={270}
                                            productTitleStyle={styles.f14}
                                            productimgheight={110}
                                            productimgresizemode={"contain"}
                                            product={bestsellerdemoproducts[index + 1]}
                                        />
                                    )}
                                </View>
                            ) : null
                        ))}
                    </View>
                </LinearGradient>
            </ScrollView>
        </SafeAreaView>
    );
}

const categoryStyles = {
    shopNowContainer: {
        backgroundColor: "#ffe6ff", // Pink background for the whole section
        paddingVertical: 20,
        paddingHorizontal: 1,
        alignItems: "center", // Center everything
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
    },
    productGrid: {
        width: "100%",
    },
    productRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        paddingHorizontal: 10,
        marginBottom: 15, // Spacing between rows
    },
};
