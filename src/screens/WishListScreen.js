import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { Feather } from "@expo/vector-icons";
import HeartIconFilled from "../../assets/icons/heartIconFilled.svg";
import Header from "../components/universal/header";

export default function WishlistScreen() {
    const [wishlist, setWishlist] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        const focusListener = navigation.addListener("focus", loadWishlist);
        return () => navigation.removeListener("focus", focusListener);
    }, [navigation]);

    const loadWishlist = async () => {
        try {
            const storedWishlist = await AsyncStorage.getItem("wishlist");
            setWishlist(storedWishlist ? JSON.parse(storedWishlist) : []);
        } catch (error) {
            console.error("Error loading wishlist:", error);
        }
    };

    const removeFromWishlist = async (productId, productTitle) => {
        try {
            let storedWishlist = await AsyncStorage.getItem("wishlist");
            let wishlistArray = storedWishlist ? JSON.parse(storedWishlist) : [];

            wishlistArray = wishlistArray.filter((item) => item.id !== productId);

            await AsyncStorage.setItem("wishlist", JSON.stringify(wishlistArray));
            setWishlist([...wishlistArray]);

            Toast.show({
                type: "info",
                text1: "Removed from Wishlist",
                text2: `${productTitle} has been removed!`,
            });
        } catch (error) {
            console.error("Error removing from wishlist:", error);
        }
    };

    const renderWishlistItem = ({ item }) => {
        const imageUrl = item.featuredImage ? item.featuredImage.url : "https://via.placeholder.com/150";
        const price = item.priceRange?.minVariantPrice?.amount;

        return (
            <View style={styles.smallCardContainer}>
                <TouchableOpacity 
                    style={styles.wishlistCard} 
                    onPress={() => navigation.navigate("ProductPage", { product: item })}
                >
                    {/* Wishlist Heart Icon */}
                    <TouchableOpacity style={styles.heartIcon} onPress={() => removeFromWishlist(item.id, item.title)}>
                        <HeartIconFilled width={18} height={18} />
                    </TouchableOpacity>

                    {/* Product Image */}
                    <Image source={{ uri: imageUrl }} style={styles.productImage} />

                    {/* Product Title */}
                    <Text style={styles.productTitle}>{item.title}</Text>

                    {/* Price Section */}
                    <Text style={styles.priceText}>₹{parseFloat(price).toFixed(2)}</Text>

                    {/* Add to Bag Button */}
                    <TouchableOpacity style={styles.addToBagButton}>
                        <Text style={styles.addToBagText}>ADD TO BAG</Text>
                        <Feather name="shopping-bag" size={16} color="black" />
                    </TouchableOpacity>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <View style={styles.safeArea}>
            <Header />
            {wishlist.length === 0 ? (
                <View style={styles.emptyContainer}>
                    {/* Empty Wishlist Image */}
                    <Image 
                        source={{ uri: "https://cdn.shopify.com/s/files/1/0997/6284/files/cart_illustration.png" }} // ✅ Add your image here
                        style={styles.emptyImage}
                    />

                    {/* Empty Wishlist Text */}
                    <Text style={styles.emptyText}>Your Wishlist is Empty</Text>
                    
                    {/* Explore More Button */}
                    <TouchableOpacity 
                        style={styles.exploreButton} 
                        onPress={() => navigation.navigate("Shop")}
                    >
                        <Text style={styles.exploreButtonText}>EXPLORE MORE</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <FlatList 
                    data={wishlist}
                    renderItem={renderWishlistItem}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={2} // Two items per row
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.listContainer}
                />
            )}
            <Toast />
        </View>
    );
}

// Styles
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#fff",
    },
    listContainer: {
        padding: 10,
        paddingTop: 50,
    },
    smallCardContainer: {
        width: "48%", 
        margin: "1%",
    },
    wishlistCard: {
        backgroundColor: "#f9f9f9",
        padding: 9,
        alignItems: "flex-start",
        elevation: 2,
        paddingTop: 5,
        height: "auto",
        flexGrow: 1,  
    },
    heartIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 1,
    },
    productImage: {
        width: 100,
        height: 100,
        alignSelf: "center",
        resizeMode: "contain",
        marginBottom: 10,
    },
    productTitle: {
        fontSize: 15,
        fontWeight: "bold",
        textAlign: "left",
    },
    priceText: {
        fontSize: 14,
        fontWeight: "bold",
        color: "black",
        marginVertical: 5,
    },
    addToBagButton: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "black",
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 4,
        justifyContent: "center",
        width: "100%",
    },
    addToBagText: {
        fontSize: 14,
        fontWeight: "bold",
        marginRight: 6,
    },
    emptyText: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 50,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    emptyImage: {
        width: 200, // Adjust size as needed
        height: 200, // Adjust size as needed
        resizeMode: "contain",
        marginBottom: 20,
    },
    emptyText: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
    },
    exploreButton: {
        backgroundColor: "#000", // Change to your theme color
        paddingVertical: 12,
        paddingHorizontal: 20,
    },
    exploreButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});

