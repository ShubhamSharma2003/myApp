import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';

const CartScreen = () => {
    const cartItems = [
        { id: '1', name: 'Product 1', description: 'High-quality product 1', price: '₹1600', discount: '₹1440', image: 'https://cdn.shopify.com/s/files/1/0997/6284/files/Artboard_55.webp?v=1738306745', returnPolicy: '30 Days Return Available', deliveryDate: 'Expected Delivery: 5-7 days' },
        { id: '2', name: 'Product 2', description: 'Premium product 2', price: '₹2800', discount: '₹2400', image: 'https://cdn.shopify.com/s/files/1/0997/6284/files/Artboard_59.webp?v=1738306745', returnPolicy: '30 Days Return Available', deliveryDate: 'Expected Delivery: 3-5 days' },
        { id: '3', name: 'Product 3', description: 'Affordable product 3', price: '₹1200', discount: '₹960', image: 'https://cdn.shopify.com/s/files/1/0997/6284/files/Artboard_10.webp?v=1738306745', returnPolicy: '30 Days Return Available', deliveryDate: 'Expected Delivery: 6-8 days' },
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.title}>My Cart</Text>
            
            <View style={styles.addressContainer}>
                <Text style={styles.addressTitle}>Delivery Address</Text>
                <Text>123, Main Street, City, Country</Text>
                <TouchableOpacity style={styles.changeButton}><Text style={styles.changeText}>Change</Text></TouchableOpacity>
            </View>

            <FlatList
                data={cartItems}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <Image source={{ uri: item.image }} style={styles.image} />
                        <View style={styles.itemDetails}>
                            <Text style={styles.itemName}>{item.name}</Text>
                            <Text style={styles.itemDescription}>{item.description}</Text>
                            <Text style={styles.itemPrice}>MRP: {item.price}</Text>
                            <Text style={styles.itemDiscount}>Discounted Price: {item.discount}</Text>
                            <Text style={styles.itemTags}>{item.returnPolicy}</Text>
                            <Text style={styles.itemTags}>{item.deliveryDate}</Text>
                        </View>
                        <TouchableOpacity>
                            <Icon name="trash-outline" size={24} color="#FF3366" />
                        </TouchableOpacity>
                    </View>
                )}
            />
            
            <View style={styles.smallSection}>
                <Text style={styles.smallSectionTitle}>Apply Coupons</Text>
                <TextInput style={styles.smallInput} placeholder="Enter Coupon Code" />
                <TouchableOpacity style={styles.smallApplyButton}><Text style={styles.smallApplyText}>Apply</Text></TouchableOpacity>
            </View>
            
            <View style={styles.smallSection}>
                <Text style={styles.smallSectionTitle}>Gifting & Personalization</Text>
                <TouchableOpacity><Text style={styles.smallLinkText}>Add Gift Wrap</Text></TouchableOpacity>
            </View>

            <View style={styles.smallPriceDetails}>
                <Text style={styles.smallSectionTitle}>Price Details</Text>
                <Text>Total MRP: ₹5600</Text>
                <Text>Discount on MRP: -₹800</Text>
                <Text>Coupon Discount: -₹400</Text>
                <Text>Shipping Fee: ₹160</Text>
                <Text style={styles.totalAmount}>Total Amount: ₹4560</Text>
            </View>
            
            <TouchableOpacity style={styles.smallCheckoutButton}>
                <Text style={styles.smallCheckoutText}>Proceed to Checkout</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20,paddingTop:35 ,backgroundColor: '#fff' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 12 },
    addressContainer: { marginBottom: 10 },
    addressTitle: { fontSize: 18, fontWeight: 'bold' },
    changeButton: { marginTop: 5 },
    changeText: { color: '#FF3366', fontWeight: '600' },
    itemContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 15, backgroundColor: '#f9f9f9', padding: 15, borderRadius: 8, minHeight: 120 },
    image: { width: 80, height: 80, borderRadius: 8, marginRight: 15 },
    itemDetails: { flex: 1 },
    itemName: { fontSize: 18, fontWeight: '600' },
    itemDescription: { fontSize: 14, color: '#666' },
    itemPrice: { fontSize: 14, color: '#666', textDecorationLine: 'line-through' },
    itemDiscount: { fontSize: 16, fontWeight: '600', color: '#FF3366' },
    itemTags: { fontSize: 12, color: '#999' },
    smallSection: { marginVertical: 5 },
    smallSectionTitle: { fontSize: 14, fontWeight: 'bold' },
    smallInput: { borderWidth: 1, borderColor: '#ccc', padding: 8, borderRadius: 5, marginTop: 3 },
    smallApplyButton: { marginTop: 5, backgroundColor: '#FF3366', padding: 8, borderRadius: 5, alignItems: 'center' },
    smallApplyText: { color: '#fff' },
    smallLinkText: { color: '#FF3366', fontWeight: '600' },
    smallPriceDetails: { marginTop: 10 },
    smallCheckoutButton: { backgroundColor: '#FF3366', padding: 10, borderRadius: 8, alignItems: 'center', marginTop: 5 },
    smallCheckoutText: { color: '#fff', fontSize: 14, fontWeight: '600' },
    totalAmount: { fontSize: 16, fontWeight: 'bold', marginTop: 5 },
});

export default CartScreen;
