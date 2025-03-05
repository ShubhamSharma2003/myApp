// ProductPage.js
import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons'; 
import Feather from '@expo/vector-icons/Feather';
import ProductTilePlain from '../../components/universal/ProductTilePlain';
import ProductHeader from './ProductHeader';
import CardStackCarousal from '../universal/CardStackCarousal';
import VerticalImageSlider from '../../components/universal/VerticalScroll';
import ProductRating from './ProductRating';
import VideoBanner from '../universal/VideoBanner';
import ImageBanner from '../universal/ImageBanner';
import { formatPrice, formatUspTags, calculateDiscount } from '../../utils/helper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addToCart, fetchProductByHandle } from '../../../api/shopifyApi';
import Toast from 'react-native-toast-message';


const ProductPage = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedVariantMedia, setSelectedVariantMedia] = useState([]);

  useEffect(() => {
    const initialProduct = route.params?.product;
    const handle = route.params?.handle;

    if (initialProduct && initialProduct.variants && initialProduct.media) {
      setProduct(initialProduct);
      setSelectedVariant(initialProduct.variants[0]);
      setLoading(false);
    } else if (handle) {
      fetchFullProduct(handle);
    } else {
      console.error("❌ Invalid product data or handle:", route.params);
      setError("Product not found.");
      setLoading(false);
    }
  }, [route.params]);

  useEffect(() => {
    if (product && selectedVariant) {
      const mediaImages = product.media?.filter(media => media.altText === selectedVariant.title);
      setSelectedVariantMedia(mediaImages || []);
    }
  }, [product, selectedVariant]);

  //using for Search Functionality  to fetch product by handle
  const fetchFullProduct = async (handle) => {
    try {
      const fullProduct = await fetchProductByHandle(handle);
      if (fullProduct) {
        setProduct(fullProduct);
        setSelectedVariant(fullProduct.variants[0]);
      } else {
        console.error("Product not found for handle:", handle);
        setError("Product not found.");
      }
    } catch (error) {
      console.error("Error fetching product:", error);
      setError("Failed to load product.");
    } finally {
      setLoading(false);
    }
  };

  const handleVariantSelect = (variant) => {
    setSelectedVariant(variant);
  };

  const handleAddToCart = async () => {
    if (!selectedVariant) return;
  
    setLoading(true);
    try {
      const cart = await addToCart(selectedVariant.id, 1);
      if (cart) {
        navigation.navigate('Home', { screen: 'Cart' });
        Toast.show({
          type: 'success',
          text1: 'Item added to cart!',
          visibilityTime: 1500,
          autoHide: true,
          position: 'top',
        });
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      Toast.show({
        type: 'error',
        text1: 'Failed to add item!',
        visibilityTime: 1500,
        autoHide: true,
        position: 'top',
      });
    } finally {
      setLoading(false);
    }
  };


  // if (loading) {
  //   return <ActivityIndicator size="large" style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />;
  // }

  if (error) {
    return <Text style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>{error}</Text>;
  }

  if (!product) {
    return <Text style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>Product not found.</Text>;
  }

  const formattedUspTags = formatUspTags(product?.uspTags || []);


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView nestedScrollEnabled stickyHeaderIndices={[0, 2]}>
     
        <ProductHeader />
        <View style={styles.imageContainer}>
          <VerticalImageSlider images={selectedVariantMedia} selectedVariant={selectedVariant?.title} />
        </View>

        <View style={styles.stickyHeader}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.variantScroll}>
            {product?.variants?.map((variant) => (
              <TouchableOpacity
                key={variant.id}
                onPress={() => handleVariantSelect(variant)}
                style={[styles.variantButton, selectedVariant?.id === variant.id && styles.activeVariantButton]}
              >
                <Image
                  source={{ uri: variant?.image || 'https://via.placeholder.com/65' }}
                  style={styles.variantImage}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.details}>
          <Text style={styles.title}>{product?.metafield?.value || product.title || 'Product Name'} - {selectedVariant?.title}</Text>
          <Text style={styles.description}>
            {formattedUspTags ||
              (product?.descriptionHtml && product.descriptionHtml.replace(/<[^>]*>?/gm, '').substring(0, 50) + "...") ||
              'Product description goes here.'}
          </Text>
          <View style={styles.priceContainer}>
            <View style={styles.priceRow}>
              <Text style={styles.salePrice}> {formatPrice(selectedVariant?.price || '₹0')}</Text>
              <Text style={styles.originalPrice}>{formatPrice(selectedVariant?.compareAtPrice || '0')}</Text>
              <Text style={styles.discountText}>{calculateDiscount(selectedVariant?.price, selectedVariant?.compareAtPrice) || '0% OFF'}</Text>
            </View>
          </View>
        </View>
        <Toast /> 
        <TouchableOpacity
          style={styles.addToBagButton}
          onPress={handleAddToCart}
          disabled={loading}
        >
          
          {loading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <>
              <Text style={styles.addToBagText}>ADD TO BAG</Text>
              <MaterialCommunityIcons name="shopping" size={20} color="white" style={styles.bagIcon} />
            </>
          )}
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

        <VideoBanner />
        <ImageBanner />

        <ProductTilePlain />

        {/* <View style={{ height: '600', width: '100%' }}>
          <CardStackCarousal />
        </View> */}

        <ProductRating />

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

// ... (styles)

const styles = StyleSheet.create({
  imageContainer: {
    height: 470, // Fixed height for the image slider
    backgroundColor: '#eee',

  },
  variantScroll: { flexDirection: "row", backgroundColor: '#eaf0f0' , paddingHorizontal:10 },
    variantButton: {padding: 10, overflow: "hidden"},
    variantImage: { width: 65, height: 65, resizeMode: "cover",},
    activeVariantButton: {
      borderBottomWidth: 3,
      borderBottomColor: '#000',
    },
  details: { padding: 20 },
  title: { fontSize: 22, fontWeight: "bold" },
  description: { fontSize: 16, color: "gray", marginBottom: 5 },
  priceContainer: { flexDirection: "row", justifyContent: "space-between", padding: 1 },
  priceRow: { flexDirection: 'row', alignItems: 'center' },
  originalPrice: { textDecorationLine: 'line-through', color: '#777', fontSize: 12, marginLeft: 10 },
  discountText: { fontSize: 12, color: 'green', marginLeft: 10 },
  salePrice: { fontSize: 16, fontWeight: 'bold', color: '#000000' },
  discountContainer: { flexDirection: "row", justifyContent: "space-between", padding: 10, borderBottomWidth: 1, borderTopWidth: 1, borderColor: "#000", backgroundColor: "#fff" },
  emiText: { fontSize: 12, color: "#666" },
  detailsText: { fontSize: 12, color: "#000" },
  addToBagButton: { flexDirection: "row", backgroundColor: "black", padding: 15, alignItems: "center", justifyContent: "center", marginLeft: 20, marginRight:20, marginBottom: 0 },
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