import React, {useState} from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';  // Import SafeAreaView
import { useRoute } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import ProductTilePlain from '../../components/universal/ProductTilePlain';
import StackedSwipeGallery from '../../components/universal/StackedSwipeGallery';
import ProductHeader from './ProductHeader';
import VerticalScroll from '../../components/universal/VerticalScroll'

const ProductPage = () => {
    const route = useRoute();
    const imageUrl = "https://cdn.shopify.com/s/files/1/0997/6284/files/Artboard_10.webp?v=1738306745";
    const imageUrl1 = "https://www.gonoise.com/cdn/shop/files/Artboard_40.webp?v=1738306745";
    const imageUrl2 = "https://www.gonoise.com/cdn/shop/files/Artboard_52.webp?v=1738306745";
    const imageUrl3 = "https://www.gonoise.com/cdn/shop/files/Artboard_46.webp?v=1738306745";
    const imageUrl4 = "https://www.gonoise.com/cdn/shop/files/Artboard_22.webp?v=1738306745";
    const imageUrl5 = "https://www.gonoise.com/cdn/shop/files/Artboard_8.webp?v=1738306745";
    const imageUrl6 = "https://www.gonoise.com/cdn/shop/files/Artboard_9.webp?v=1738306745";
    const imageUrl7 = "https://www.gonoise.com/cdn/shop/files/Artboard_12.webp?v=1738306745";


    const product = {
        id: route.params?.product?.id || 'demo',
        name: route.params?.product?.name || 'Demo Product',
        description: route.params?.product?.description || 'This is a demo product description.',
        originalPrice: route.params?.product?.originalPrice || '₹9,999',
        discount: route.params?.product?.discount || '20%',
        salePrice: route.params?.product?.salePrice || '₹7,999',
        image: imageUrl,
        images: route.params?.product?.images?.length > 0 ? route.params.product.images : [imageUrl, imageUrl5, imageUrl6, imageUrl7],
        variants: route.params?.product?.variants?.length > 0 ? route.params.product.variants : [
            { id: '1', image: imageUrl1 },
            { id: '2', image: imageUrl2 },
            { id: '3', image: imageUrl3 },
            { id: '4', image: imageUrl4 },
            { id: '5', image: imageUrl3 },
        ],
    };

    return (
        <SafeAreaView style={{ flex: 1 }}> {/* Wrap with SafeAreaView */}
            <View style={styles.container}>
                    <View style={styles.imageContainer}>
                        <VerticalScroll />
                    </View>
                <ProductHeader />
                <ScrollView >

                    <View style={styles.stickyHeader}>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.variantScroll}>
                            {product.variants.map((variant) => (
                                <TouchableOpacity key={variant.id} style={styles.variantButton}>
                                    <Image source={{ uri: variant.image }} style={styles.variantImage} />
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>

                   

                    <View style={styles.details}>
                        <Text style={styles.title}>{product.name}</Text>
                        <Text style={styles.description}>{product.description}</Text>
                        <View style={styles.priceContainer}>
                            <View style={styles.priceRow}>
                                <Text style={styles.originalPrice}>{product.originalPrice}</Text>
                                <Text style={styles.salePrice}>{product.salePrice}</Text>
                            </View>
                        </View>
                    </View>

                    {/* Limited Time Offer */}
                    <View style={styles.offerContainer}>
                        <Text style={styles.offerText}>Limited Time Offer</Text>
                        <Text style={styles.offerDiscount}>25% OFF</Text>
                        <Text style={styles.offerTimer}>11h 25m 29s left</Text>
                    </View>

                    {/* Pricing Section */}
                    <View style={styles.discountContainer}>
                        {/* <Text style={styles.priceText}>Get it for ₹6,999</Text>  */}
                        <Text style={styles.emiText}>Get it for 1249 with No Cost EMI</Text>
                        {/* <Text style={styles.extraDiscount}>Extra ₹500 off</Text> */}
                        <Text style={styles.detailsText}>Details ›</Text>
                    </View>

                    {/* Add to Bag Button */}
                    <TouchableOpacity style={styles.addToBagButton}>
                        <Text style={styles.addToBagText}>ADD TO BAG</Text>
                        <MaterialCommunityIcons name="shopping" size={20} color="white" style={styles.bagIcon} />
                    </TouchableOpacity>

                    {/* Delivery Date Check */}
                    <View style={styles.deliveryContainer}>
                        <Text style={styles.deliveryText}>Check delivery date</Text>
                        <TextInput placeholder="Enter pincode" style={styles.pincodeInput} />
                    </View>

                    {/* Free Shipping Section */}
                    <View style={styles.shippingContainer}>
                        <MaterialCommunityIcons name="check-circle-outline" size={20} color="black" />
                        <Text style={styles.shippingText}>FREE STANDARD SHIPPING + FREE RETURNS & EXCHANGES.</Text>
                        <MaterialCommunityIcons name="information-outline" size={20} color="black" />
                    </View>

                    {/* Key Features */}
                    <View style={styles.featuresContainer}>
                        <Text style={styles.featuresTitle}>Key Features</Text>
                        <View style={styles.featuresGrid}>
                            <View style={styles.featureCard}>
                                <MaterialCommunityIcons name="water" size={24} color="#000" />
                                <Text style={styles.featureText}>5 ATM</Text>
                            </View>
                            <View style={styles.featureCard}>
                                <MaterialCommunityIcons name="robot" size={24} color="#000" />
                                <Text style={styles.featureText}>AI Companion</Text>
                            </View>
                            <View style={styles.featureCard}>
                                <MaterialCommunityIcons name="palette" size={24} color="#000" />
                                <Text style={styles.featureText}>AI Create</Text>
                            </View>
                            <View style={styles.featureCard}>
                                <MaterialCommunityIcons name="map-marker" size={24} color="#000" />
                                <Text style={styles.featureText}>GPS</Text>
                            </View>
                            <View style={styles.featureCard}>
                                <MaterialCommunityIcons name="chip" size={24} color="#000" />
                                <Text style={styles.featureText}>EN2 Chip</Text>
                            </View>
                            <View style={styles.featureCard}>
                                <MaterialCommunityIcons name="watch" size={24} color="#000" />
                                <Text style={styles.featureText}>Nebula UI 2.0</Text>
                            </View>
                        </View>
                    </View>

                    {/* Warranty and Secure Payment */}
                    <View style={styles.warrantyContainer}>
                        <View style={styles.warrantyItem}>
                            <MaterialCommunityIcons name="autorenew" size={22} color="black" />
                            <Text style={styles.warrantyText}>7 Day Replacement</Text>
                        </View>
                        <View style={styles.warrantyItem}>
                            <MaterialCommunityIcons name="shield-check" size={22} color="black" />
                            <Text style={styles.warrantyText}>1 Year Warranty</Text>
                        </View>
                        <View style={styles.warrantyItem}>
                            <MaterialCommunityIcons name="lock" size={22} color="black" />
                            <Text style={styles.warrantyText}>Secure Payment</Text>
                        </View>
                    </View>

                    <ProductTilePlain />

                    {/* Questions & FAQ Section */}
                    <View style={styles.faqContainer}>
                        <Text style={styles.faqTitle}>QUESTIONS?</Text>
                        <View style={styles.faqRow}>
                            <View style={styles.faqItem}>
                                <Ionicons name="chatbox-ellipses-outline" size={24} color="black" />
                                <Text style={styles.faqText}>Chat with an agent</Text>
                                <TouchableOpacity>
                                    <Text style={styles.faqLink}>START CHAT</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.faqItem}>
                                <Feather name="help-circle" size={24} color="black" />
                                <Text style={styles.faqText}>Visit our help section</Text>
                                <TouchableOpacity>
                                    <Text style={styles.faqLink}>FAQ & HELP</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#FFFFFF", paddingTop: 40 }, // Added paddingTop to container
    imageScroll: { paddingTop: 10, height: 400, backgroundColor: '#eee' },
    productImage: { width: "100%", height: 400, resizeMode: "contain" },
    imageContainer: {
        position: 'relative',
        height: 400,
        backgroundColor: '#eee',
    },
    productImage: {
        width: "100%",
        height: 300,
        resizeMode: "contain",
    },
    stickyHeader: { backgroundColor: "#fff" },
    details: { padding: 20 },
    title: { fontSize: 22, fontWeight: "bold" },
    description: { fontSize: 16, color: "gray", marginBottom: 5 },
    priceContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 1,
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    originalPrice: {
        textDecorationLine: 'line-through',
        color: '#777',
        fontSize: 12,
        marginRight: 10
    },
    salePrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000000'
    },
    variantScroll: { padding: 20, paddingHorizontal: 16, flexDirection: "row", backgroundColor: '#eee', },
    variantButton: { paddingRight: 10, overflow: "hidden" },
    variantImage: { width: 80, height: 80, resizeMode: "cover" },
    offerContainer: { flexDirection: "row", justifyContent: "space-between", padding: 10, backgroundColor: "#000", color: "#fff" },
    offerText: { color: "#fff", fontSize: 12, fontWeight: "bold" },
    offerDiscount: { color: "#fff", fontSize: 12, fontWeight: "bold" },
    offerTimer: { color: "#fff", fontSize: 12 },
    discountContainer: { flexDirection: "row", justifyContent: "space-between", padding: 10, borderBottomWidth: 1, borderTopWidth: 1, borderColor: "#000", backgroundColor: "#fff", },
    priceText: { fontSize: 12, fontWeight: "bold", color: "#000" },
    emiText: { fontSize: 12, color: "#666" },
    extraDiscount: { fontSize: 12, fontWeight: "bold", color: "#000" },
    detailsText: { fontSize: 12, color: "#000" },
    deliveryContainer: { padding: 20 },
    deliveryText: { fontSize: 16, fontWeight: "bold", marginBottom: 5 },
    shippingContainer: { padding: 20, flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 15, borderWidth: 1, borderColor: "#EEE" },
    shippingText: { fontSize: 10, color: "#777", textAlign: "center" },
    pincodeInput: { borderWidth: 1, borderColor: "#ccc", padding: 10 },
    addToBagButton: { flexDirection: "row", backgroundColor: "black", padding: 15, alignItems: "center", justifyContent: "center", margin: 20, marginBottom: 0 },
    bagIcon: { marginLeft: 200 },
    addToBagText: { color: "white", fontSize: 16, fontWeight: "bold" },
    featuresContainer: { padding: 20, paddingBottom: 5 },
    featuresTitle: { fontSize: 18, fontWeight: "bold" },
    featuresGrid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
    featureCard: { alignItems: "center", width: "30%", padding: 10, backgroundColor: "#f5f5f5", marginVertical: 5 },
    featureText: { fontSize: 12, marginTop: 5 },
    warrantyContainer: { flexDirection: "row", justifyContent: "space-around", padding: 20, },
    warrantyItem: { flexDirection: "col", alignItems: "center" },
    warrantyText: { marginLeft: 8, fontSize: 10, color: "#000" },
    faqContainer: { padding: 20, alignItems: "left" },
    faqTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
    faqRow: { flexDirection: "row", justifyContent: "space-around", width: "100%" },
    faqItem: { alignItems: "center" },
    faqText: { fontSize: 14, color: "#000", marginVertical: 10 },
    faqLink: { fontSize: 14, fontWeight: "bold", color: "#000", textDecorationLine: "underline" },
});

export default ProductPage;
