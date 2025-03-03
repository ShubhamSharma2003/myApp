import React, { useEffect, useState } from 'react';
import { 
  View, Text, FlatList, Image, TouchableOpacity, 
  ActivityIndicator, StyleSheet, ScrollView, SafeAreaView 
} from 'react-native';
import { getCart, removeFromCart } from '../../api/shopifyApi';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/universal/header';

const CartScreen = ({ navigation }) => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingItems, setLoadingItems] = useState({});

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const cartData = await getCart();
      setCart(cartData);
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveItem = async (lineId) => {
    try {
      if (!cart?.id) {
        console.error("Cart ID is missing.");
        return;
      }
  
      setLoadingItems((prev) => ({ ...prev, [lineId]: true }));
      const updatedCart = await removeFromCart(cart.id, lineId);
      if (updatedCart) {
        fetchCart();
      }
    } catch (error) {
      console.error('Error removing item:', error);
    } finally {
      setLoadingItems((prev) => ({ ...prev, [lineId]: false }));
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header />
      <View style={styles.container}>
        <ScrollView style={{ flex: 1 }} nestedScrollEnabled={true} contentContainerStyle={{ paddingBottom: 100 }}>
          <Text style={styles.title}>Your Cart</Text>

          {cart && cart.lines.edges.length > 0 ? (
            <FlatList
              data={cart.lines.edges}
              keyExtractor={(item) => item.node.id}
              renderItem={({ item }) => (
                <View style={styles.cartItem}>
                  <Image
                    source={{ uri: item?.node?.merchandise?.image?.url || 'https://via.placeholder.com/80' }}
                    style={styles.productImage}
                  />
                  <View style={styles.productDetails}>
                    <Text style={styles.productTitle}>{item.node.merchandise.product.title}</Text>
                    <Text style={styles.productVariant}>Variant: {item.node.merchandise.title}</Text>
                    <Text style={styles.productPrice}>Price: ₹{item.node.merchandise.price.amount}</Text>
                    <Text style={styles.productQuantity}>Qty: {item.node.quantity}</Text>
                  </View>
                  <TouchableOpacity onPress={() => handleRemoveItem(item.node.id)} style={styles.deleteButton}>
                    {loadingItems[item.node.id] ? (
                      <ActivityIndicator size="small" color="red" />
                    ) : (
                      <Ionicons name="trash-outline" size={24} color="red" />
                    )}
                  </TouchableOpacity>
                </View>
              )}
            />
          ) : (
            <View style={styles.emptyCartContainer}>
              <Image 
                source={{ uri: 'https://cdn.shopify.com/s/files/1/0997/6284/files/cart_illustration.png' }} 
                style={styles.emptyCartImage} 
              />
              <Text style={styles.emptyCartText}>Your cart is empty</Text>
              <Text style={styles.emptyCartText2}>Start Shopping Shop</Text>
              <TouchableOpacity 
                style={styles.shopNowButton} 
                onPress={() => navigation.navigate("Shop")}
              >
                <Text style={styles.shopNowText}>Shop Now</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>

        {cart && cart.lines.edges.length > 0 && cart.checkoutUrl && (
          <TouchableOpacity
            style={styles.checkoutButton}
            onPress={() => navigation.navigate('WebViewScreen', { url: cart.checkoutUrl })}
          >
            <Text style={styles.checkoutText}>Proceed to Checkout</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  productImage: {
    width: 80,
    height: 80,
    marginRight: 10,
    borderRadius: 5,
  },
  productDetails: {
    flex: 1,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productVariant: {
    fontSize: 14,
    color: '#555',
  },
  productPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  productQuantity: {
    fontSize: 14,
    color: '#333',
  },
  deleteButton: {
    padding: 8,
    marginLeft: 10,
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 200,
  },
  emptyCartImage: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  emptyCartText: {
    fontSize: 15,
    color: '#888',
  },
  emptyCartText2: {
    fontSize: 18,
    color: '#000',
    marginBottom: 20,
  },
  shopNowButton: {
    backgroundColor: 'black',
    paddingVertical: 12,
    paddingHorizontal: 20,

  },
  shopNowText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  checkoutButton: {
    position: 'absolute', 
    bottom: 0, 
    left: 20,
    right: 20,
    marginBottom: 10,
    backgroundColor: 'black',
    padding: 15,
    alignItems: 'center',
  },
  checkoutText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CartScreen;
