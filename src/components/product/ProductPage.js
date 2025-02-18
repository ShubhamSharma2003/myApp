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
import VerticalImageSlider from '../../components/universal/VerticalScroll';
import ProductRating from './ProductRating';

const ProductPage = () => {
  const route = useRoute();
  // (Define your image URLs and product data as before)
  const imageUrl11 = "https://www.gonoise.com/cdn/shop/files/5_debf6487-e016-42fa-9731-6abff3721427.webp?v=1721364459";
  const imageUrl12 = "https://www.gonoise.com/cdn/shop/files/4_344ca49c-c4a9-44a5-b34e-7aa4a40d87ef.webp?v=1721364460";
  const imageUrl13 = "https://www.gonoise.com/cdn/shop/files/2_4d8489ad-5bcd-4a39-98ea-1328e084a9f3.webp?v=1721364459";
  const imageUrl14 = "https://www.gonoise.com/cdn/shop/files/2_4d8489ad-5bcd-4a39-98ea-1328e084a9f3.webp?v=1721364459";
  const imageUrl21 = "https://cdn.shopify.com/s/files/1/0997/6284/files/Halo-2-Carousel-1_5a47cb71-4d70-4ca0-92d2-905d36be5242.webp?v=1725621304?width=600";
  const imageUrl22 = "https://cdn.shopify.com/s/files/1/0997/6284/files/Halo-2-Carousel-2_2c6b8bcc-4ff5-4d72-b3dd-19b79e591351.webp?v=1725621303?width=600";
  const imageUrl23 = "https://cdn.shopify.com/s/files/1/0997/6284/files/Halo-2-Carousel-5_5d8b0c53-8efb-4927-bbdc-241da07d455a.webp?v=1725621303?width=600";
  const imageUrl24 = "https://cdn.shopify.com/s/files/1/0997/6284/files/Halo-2-Carousel-3_b2b56d3d-0144-4fe5-86c3-e1577052265d.webp?v=1725621303?width=600";
  const imageUrl31 = "https://www.gonoise.com/cdn/shop/files/1_ecb6bab3-7552-4d31-a0bb-833b19044577.png?v=1716538343";
  const imageUrl32 = "https://www.gonoise.com/cdn/shop/files/5_3cf0e0ba-6c51-4a11-91eb-100a9fd64630.png?v=1716538337";
  const imageUrl33 = "https://www.gonoise.com/cdn/shop/files/8_b47d2f17-a9c5-4320-b260-41d301c8c0e2.png?v=1716538341";
  const imageUrl34 = "https://www.gonoise.com/cdn/shop/files/7_f387af89-7c11-4a85-a371-e11920815e39.png?v=1716538340";
  const imageUrl41 = "https://www.gonoise.com/cdn/shop/files/Artboard_26_pro6max.webp?v=1739277875";
  const imageUrl42 = "https://www.gonoise.com/cdn/shop/files/Artboard_8_pro6max.webp?v=1739277875";
  const imageUrl43 = "http://www.gonoise.com/cdn/shop/files/Artboard_33_pro6max.webp?v=1739277875";
  const imageUrl44 = "https://www.gonoise.com/cdn/shop/files/Artboard_16_pro6max.webp?v=1739277875";


  const product = {
    id: route.params?.product?.id || 'demo',
    name: route.params?.product?.name || 'Demo Product',
    description: route.params?.product?.description || 'This is a demo product description.',
    originalPrice: route.params?.product?.originalPrice || '₹9,999',
    discount: route.params?.product?.discount || '20%',
    salePrice: route.params?.product?.salePrice || '₹7,999',
    image: imageUrl11,
    images: route.params?.product?.images?.length > 0 
      ? route.params.product.images 
      : [imageUrl11], // Simplified for clarity
    variants: route.params?.product?.variants?.length > 0 
      ? route.params.product.variants 
      : [
        { 
          id: '1', 
          images: [imageUrl11, imageUrl12, imageUrl13, imageUrl14],
        },
        { 
          id: '2', 
          images: [imageUrl21, imageUrl22, imageUrl23, imageUrl24] ,
        },
        { 
          id: '3', 
          images: [imageUrl31, imageUrl32, imageUrl33, imageUrl34] , 
        },
        { 
          id: '4', 
          images: [imageUrl41, imageUrl42, imageUrl43, imageUrl44] , 
        }
        ,
        { 
          id: '5', 
          images: [imageUrl11, imageUrl12, imageUrl13, imageUrl14] ,
        }
        ,
        { 
          id: '6', 
          images: [imageUrl21, imageUrl22, imageUrl23, imageUrl24] , 
        }
        ],
  };

  const [selectedImages, setSelectedImages] = useState(product.variants[0].images);
  const [selectedVariantId, setSelectedVariantId] = useState(product.variants[0].id);


  const handleVariantSelect = (variant) => {
    if (variant && Array.isArray(variant.images) && variant.images.length > 0) {
      setSelectedImages(variant.images); 
      setSelectedVariantId(variant.id);
    } else {
      console.log('Variant is undefined or does not have images', variant); // Log the variant for debugging
      setSelectedImages([imageUrl11]); 
    }
  };
  

  return (
    <SafeAreaView style={{ flex: 1 }}>

      <ScrollView nestedScrollEnabled={true} style={{ flex: 1 }} stickyHeaderIndices={[0, 2]}>
        
        <ProductHeader />
        <View style={styles.imageContainer}>
         <VerticalImageSlider images={selectedImages.map((img, index) => ({ id: index, url: img }))} />

        </View>
        
        <View style={styles.stickyHeader}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.variantScroll}>
          {product.variants.map((variant) => (
            <TouchableOpacity
              key={variant.id}
              onPress={() => handleVariantSelect(variant)}
              style={[
                styles.variantButton,
                selectedVariantId === variant.id && styles.activeVariantButton // Apply active style
              ]}
            >
              <Image source={{ uri: variant.images[0] }} style={styles.variantImage} />
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

        <ProductTilePlain />

        <ProductRating />

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
  variantScroll: {paddingBottom: 10,paddingTop:10, paddingLeft:20, flexDirection: "row", backgroundColor: '#eee'},
    variantButton: { paddingRight: 20, overflow: "hidden", },
    variantImage: { width: 60, height: 60, resizeMode: "cover",},
    activeVariantButton: {
      borderBottomWidth: 2,
      width:80,
      paddingBottom:5,
      borderBottomColor: '#777',
    },
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
  faqContainer: { padding: 20,paddingTop: 10, backgroundColor:'#fff' },
  faqTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  faqRow: { flexDirection: "row", justifyContent: "space-around", width: "100%" },
  faqItem: { alignItems: "center" },
  faqText: { fontSize: 14, color: "#000", marginVertical: 10 },
  faqLink: { fontSize: 14, fontWeight: "bold", color: "#000", textDecorationLine: "underline" },
});

export default ProductPage;
