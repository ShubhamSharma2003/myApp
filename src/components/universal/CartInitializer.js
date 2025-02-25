import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { createCart } from '../../../api/shopifyApi'; // Adjust the import path based on your project structure

const CartInitializer = () => {
  useEffect(() => {
    const initializeCart = async () => {
      try {
        const cartId = await AsyncStorage.getItem('cartId');
        if (cartId) {
          console.log('✅ Existing cart found:', cartId);
        } else {
          console.log('🛒 No cart found, creating a new cart...');
          const newCart = await createCart(); 
          if (newCart?.id) {
            await AsyncStorage.setItem('cartId', newCart.id);
            console.log('✅ New cart created:', newCart.id);
          }
        }
      } catch (error) {
        console.error('❌ Error initializing cart:', error);
      }
    };

    initializeCart();
  }, []);

  return null; 
};

export default CartInitializer;
