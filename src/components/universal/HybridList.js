import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, FlatList, Linking } from "react-native";

const { width } = Dimensions.get("window");

const SuggestedProducts = () => {
    const products = [
        { id: "1", source: "https://cdn.shopify.com/s/files/1/0997/6284/files/image_-_2025-03-03T111840.688_1.webp?v=1740981031", link: "https://mansinoise.myshopify.com/products/product-1" },
        { id: "2", source: "https://cdn.shopify.com/s/files/1/0997/6284/files/image_-_2025-02-28T121046.800.png?v=1740767737", link: "https://mansinoise.myshopify.com/products/product-2" },
        { id: "3", source: "https://cdn.shopify.com/s/files/1/0997/6284/files/Carousel_4.webp?v=1740937257", link: "https://mansinoise.myshopify.com/products/product-3" },
        { id: "4", source: "https://cdn.shopify.com/s/files/1/0997/6284/files/IMG_5354.png?v=1740497286", link: "https://mansinoise.myshopify.com/products/product-4" },
        { id: "5", source: "https://cdn.shopify.com/s/files/1/0997/6284/files/Carousel_1.webp?v=1740937257", link: "https://mansinoise.myshopify.com/products/product-4" },
        { id: "6", source: "https://cdn.shopify.com/s/files/1/0997/6284/files/Carousel_3.webp?v=1740937257", link: "https://mansinoise.myshopify.com/products/product-4" },
        { id: "7", source: "https://cdn.shopify.com/s/files/1/0997/6284/files/IMG_4739.png?v=1739028371", link: "https://mansinoise.myshopify.com/products/product-4" },
        { id: "8", source: "https://cdn.shopify.com/s/files/1/0997/6284/files/IMG_4739.png?v=1739028371", link: "https://mansinoise.myshopify.com/products/product-4" },

    ];

    const renderItem = ({ item, index }) => {
        if (index % 4 === 0 && index + 1 < products.length) {
            // **First two images (side-by-side)**
            return (
                <View style={styles.sideBySideContainer}>
                    <TouchableOpacity onPress={() => Linking.openURL(item.link)} style={styles.sideImage}>
                        <Image source={{ uri: item.source }} style={styles.image} resizeMode="cover" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => Linking.openURL(products[index + 1]?.link)} style={styles.sideImage}>
                        <Image source={{ uri: products[index + 1]?.source }} style={styles.image} resizeMode="cover" />
                    </TouchableOpacity>
                </View>
            );
        } else if (index % 4 === 2 && index + 1 < products.length) {
            // **Stacked Images**
            return (
                <View style={styles.stackedContainer}>
                    <TouchableOpacity onPress={() => Linking.openURL(item.link)} style={styles.halfHeightImage}>
                        <Image source={{ uri: item.source }} style={styles.image} resizeMode="cover" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => Linking.openURL(products[index + 1]?.link)} style={styles.halfHeightImage}>
                        <Image source={{ uri: products[index + 1]?.source }} style={styles.image} resizeMode="cover" />
                    </TouchableOpacity>
                </View>
            );
        } else if (index % 4 === 3) {
            // **Full-Size Product Image**
            return (
                <View style={styles.fullImageContainer}>
                    <TouchableOpacity onPress={() => Linking.openURL(item.link)} style={styles.fullImage}>
                        <Image source={{ uri: item.source }} style={styles.image} resizeMode="cover" />
                    </TouchableOpacity>
                </View>
            );
        }
    };
    

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>ADD YOUR INTERESTS</Text>
            <FlatList
                data={products}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                horizontal={true} // Enables horizontal scrolling
                showsHorizontalScrollIndicator={false} // Hides scrollbar for a cleaner look
                contentContainerStyle={styles.flatListContent}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: "#fff",
    },
    heading: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#000",
        marginBottom: 5,
    },
    flatListContent: {
        flexDirection: "row",
    },

    // **First Two Images (Side-by-Side)**
    sideBySideContainer: {
        flexDirection: "row",
        width: width * 0.8, // Adjust width for correct spacing
    },
    sideImage: {
        width: "50%",
        height: 200, // Adjust height
        paddingHorizontal: 3,
    },

    // **Third Card (Stacked)**
    stackedContainer: {
        flexDirection: "column",
        width: width * 0.4,
        paddingHorizontal: 3,
    },
    halfHeightImage: {
        height: 98, // Half height
        marginBottom: 5,
        paddingRight: 3,
    },

    // **Fourth Card (Full-Size)**
    fullImageContainer: {
        width: width * 0.4,
    },
    fullImage: {
        height: 200,
    },

    // **Common Image Styling**
    image: {
        width: "100%",
        height: "100%",
    },
});

export default SuggestedProducts;
