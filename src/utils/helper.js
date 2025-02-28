export const formatPrice = (price) => {
  if (!price) return "N/A";
  
  // Convert price to number and remove decimals
  const formattedPrice = parseInt(price, 10); 
  
  return `₹${formattedPrice}`; // Ensure ₹ is always prefixed
};


export const calculateDiscount = (minPrice, maxPrice) => {
    if (!minPrice || !maxPrice || minPrice >= maxPrice) return null; // Avoid negative or invalid discounts
    return `${parseInt(((maxPrice - minPrice) / maxPrice) * 100)}% OFF`;
};

export const formatUspTags = (uspTags) => {
  if (!Array.isArray(uspTags)) return "";

  // Match usp1_, usp_1_, usp2_, usp_2_
  const filteredTags = uspTags
    .filter(tag => /^usp[_]?1[_]?|^usp[_]?2[_]?/i.test(tag)) // Match usp1_, usp_1_, usp2_, usp_2_
    .map(tag => tag.replace(/^usp[_]?1[_]?|^usp[_]?[_]?/i, "")) // Remove only the prefix, keeping numbers

  // Limit to max 2 tags and join with " | "
  return filteredTags.slice(0, 2).join(" | "); 
};





import AsyncStorage from '@react-native-async-storage/async-storage';

export const getCartId = async () => {
  return await AsyncStorage.getItem('cart_id');
};

export const setCartId = async (cartId) => {
  await AsyncStorage.setItem('cart_id', cartId);
};

export const formatHandleToTitle = (handle) => {
  return handle ? handle.replace(/[-_]/g, " ").toUpperCase() : "";
};
