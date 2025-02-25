import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { getCart, removeFromCart } from '../../api/shopifyApi';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/universal/header';

const CartScreen = ({ navigation }) => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingItems, setLoadingItems] = useState({}); // Track loading state for individual items

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
  
      setLoadingItems((prev) => ({ ...prev, [lineId]: true })); // Set loading for specific item
      const updatedCart = await removeFromCart(cart.id, lineId);
      if (updatedCart) {
        fetchCart(); // Update state only if successful
      }
    } catch (error) {
      console.error('Error removing item:', error);
    } finally {
      setLoadingItems((prev) => ({ ...prev, [lineId]: false })); // Remove loading state for specific item
    }
  };

//   if (loading) {
//     return (
//       <View style={styles.loaderContainer}>
//         <ActivityIndicator size="large" color="#000" />
//       </View>
//     );
//   }

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
            <Text style={styles.emptyCartText}>Your cart is empty.</Text>
          )}
        </ScrollView>

        {cart && cart.checkoutUrl && (
  <TouchableOpacity
    style={styles.checkoutButton}
    onPress={() =>
      navigation.navigate('WebViewScreen', { url: cart.checkoutUrl }) // Update this line
    }
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
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  emptyCartText: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 20,
    color: '#888',
  },
  checkoutButton: {
    position: 'absolute', 
    bottom: 0, 
    left: 20,
    right: 20,
    marginBottom:10,
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
