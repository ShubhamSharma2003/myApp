import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import ProductTilePlain from '../../components/universal/ProductTilePlain';
import ProductHeader from './ProductHeader';
import CardStackCarousal from '../universal/CardStackCarousal';
import VerticalImageSlider from '../../components/universal/VerticalScroll'; // Updated image slider

const ProductPage = () => {
  const route = useRoute();
  // (Define your image URLs and product data as before)
  const imageUrl = "https://cdn.shopify.com/s/files/1/0997/6284/files/Artboard_10.webp?v=1738306745";
  const imageUrl1 = "https://www.gonoise.com/cdn/shop/files/Artboard_40.webp?v=1738306745";
    const imageUrl2 = "https://www.gonoise.com/cdn/shop/files/Artboard_52.webp?v=1738306745";
    const imageUrl3 = "https://www.gonoise.com/cdn/shop/files/Artboard_46.webp?v=1738306745";
    const imageUrl4 = "https://www.gonoise.com/cdn/shop/files/Artboard_22.webp?v=1738306745";
    const imageUrl5 = "https://www.gonoise.com/cdn/shop/files/Artboard_8.webp?v=1738306745";
    const imageUrl6 = "https://www.gonoise.com/cdn/shop/files/Artboard_9.webp?v=1738306745";
    const imageUrl7 = "https://www.gonoise.com/cdn/shop/files/Artboard_12.webp?v=1738306745";

  // ... other image URLs

  const product = {
    id: route.params?.product?.id || 'demo',
    name: route.params?.product?.name || 'Demo Product',
    description: route.params?.product?.description || 'This is a demo product description.',
    originalPrice: route.params?.product?.originalPrice || '₹9,999',
    discount: route.params?.product?.discount || '20%',
    salePrice: route.params?.product?.salePrice || '₹7,999',
    image: imageUrl,
    images: route.params?.product?.images?.length > 0 
      ? route.params.product.images 
      : [imageUrl], // Simplified for clarity
    variants: route.params?.product?.variants?.length > 0 
      ? route.params.product.variants 
      : [
          { id: '1', image: imageUrl },
          { id: '2', image: imageUrl2 },
            { id: '3', image: imageUrl3 },
            { id: '4', image: imageUrl4 },
            { id: '5', image: imageUrl3 },

        ],
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* Outer ScrollView that wraps the entire page */}
      <ScrollView nestedScrollEnabled={true} style={{ flex: 1 }} stickyHeaderIndices={[0, 2]}>
        
        <ProductHeader />
        {/* Image container with fixed height containing our vertical image slider */}
        <View style={styles.imageContainer}>
          <VerticalImageSlider />
        </View>
        
        <View style={styles.stickyHeader}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.variantScroll}>
                {product.variants.map((variant) => (
                    <TouchableOpacity key={variant.id} style={styles.variantButton}>
                        <Image source={{ uri: variant.image }} style={styles.variantImage} />
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>

        {/* The rest of your product content */}
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


        <TouchableOpacity style={styles.addToBagButton}>
          <Text style={styles.addToBagText}>ADD TO BAG</Text>
          <MaterialCommunityIcons name="shopping" size={20} color="white" style={styles.bagIcon} />
        </TouchableOpacity>

        <View style={styles.deliveryContainer}>
          <Text style={styles.deliveryText}>Check delivery date</Text>
          <TextInput placeholder="Enter pincode" style={styles.pincodeInput} />
        </View>

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

        <View style={{ height: '600', width:'100%' }}>
        <CardStackCarousal />
        </View>

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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    height: 470, // Fixed height for the image slider
    backgroundColor: '#eee',

  },
  variantScroll: {paddingBottom: 10, paddingHorizontal: 16, flexDirection: "row", backgroundColor: '#eee', },
    variantButton: { paddingRight: 30, overflow: "hidden" },
    variantImage: { width: 90, height: 90, resizeMode: "cover" },
  details: { padding: 20 },
  title: { fontSize: 22, fontWeight: "bold" },
  description: { fontSize: 16, color: "gray", marginBottom: 5 },
  priceContainer: { flexDirection: "row", justifyContent: "space-between", padding: 1 },
  priceRow: { flexDirection: 'row', alignItems: 'center' },
  originalPrice: { textDecorationLine: 'line-through', color: '#777', fontSize: 12, marginRight: 10 },
  salePrice: { fontSize: 16, fontWeight: 'bold', color: '#000000' },
  discountContainer: { flexDirection: "row", justifyContent: "space-between", padding: 10, borderBottomWidth: 1, borderTopWidth: 1, borderColor: "#000", backgroundColor: "#fff" },
  emiText: { fontSize: 12, color: "#666" },
  detailsText: { fontSize: 12, color: "#000" },
  addToBagButton: { flexDirection: "row", backgroundColor: "black", padding: 15, alignItems: "center", justifyContent: "center", margin: 20, marginBottom: 0 },
  bagIcon: { marginLeft: 200 },
  addToBagText: { color: "white", fontSize: 16, fontWeight: "bold" },
  deliveryContainer: { padding: 20 },
  deliveryText: { fontSize: 16, fontWeight: "bold", marginBottom: 5 },
  shippingContainer: { padding: 15, borderWidth: 1, borderColor: "#EEE", flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  shippingText: { fontSize: 10, color: "#777", textAlign: "center" },
  pincodeInput: { borderWidth: 1, borderColor: "#ccc", padding: 10 },
  featuresContainer: { padding: 20, paddingBottom: 5 },
    featuresTitle: { fontSize: 18, fontWeight: "bold" },
    featuresGrid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
    featureCard: { alignItems: "center", width: "30%", padding: 10, backgroundColor: "#fff", marginVertical: 5 },
    featureText: { fontSize: 12, marginTop: 5 },
    warrantyContainer: { flexDirection: "row", justifyContent: "space-around", padding: 20, },
    warrantyItem: { flexDirection: "col", alignItems: "center" },
    warrantyText: { marginLeft: 8, fontSize: 10, color: "#000" },
  faqContainer: { padding: 20 },
  faqTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  faqRow: { flexDirection: "row", justifyContent: "space-around", width: "100%" },
  faqItem: { alignItems: "center" },
  faqText: { fontSize: 14, color: "#000", marginVertical: 10 },
  faqLink: { fontSize: 14, fontWeight: "bold", color: "#000", textDecorationLine: "underline" },
});

export default ProductPage;
