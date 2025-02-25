export const formatPrice = (price) => {
    if (!price) return "N/A";
    return parseInt(price, 10); 
};

export const calculateDiscount = (minPrice, maxPrice) => {
    if (!minPrice || !maxPrice || minPrice >= maxPrice) return null; // Avoid negative or invalid discounts
    return `${parseInt(((maxPrice - minPrice) / maxPrice) * 100)}% OFF`;
};

export const formatUspTags = (uspTags) => {
    return Array.isArray(uspTags) 
        ? uspTags.map(tag => tag.replace(/^usp\d*_?/i, "")).join(" | ")
        : "";
};

import AsyncStorage from '@react-native-async-storage/async-storage';

export const getCartId = async () => {
  return await AsyncStorage.getItem('cart_id');
};

export const setCartId = async (cartId) => {
  await AsyncStorage.setItem('cart_id', cartId);
};
