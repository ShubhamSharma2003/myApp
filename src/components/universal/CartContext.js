import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createCart } from '../../../api/shopifyApi'; // Adjust path if needed

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartId, setCartId] = useState(null);

  useEffect(() => {
    const initializeCart = async () => {
      try {
        const storedCartId = await AsyncStorage.getItem('cartId');
        if (storedCartId) {
          setCartId(storedCartId);
        } else {
          const newCart = await createCart();
          if (newCart?.id) {
            await AsyncStorage.setItem('cartId', newCart.id);
            setCartId(newCart.id);
          }
        }
      } catch (error) {
        console.error('Error initializing cart:', error);
      }
    };

    initializeCart();
  }, []);

  return (
    <CartContext.Provider value={{ cartId, setCartId }}>
      {children}
    </CartContext.Provider>
  );
};
