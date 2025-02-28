import React from "react";
import { View, Text, Image, Dimensions, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const CategoryBanner = () => {
    return (
        <View style={styles.container}>
            {/* Banner Image */}
            <Image 
                source={{ uri: "https://cdn.shopify.com/s/files/1/0997/6284/files/image_-_2025-02-28T112755.112.png?v=1740722406" }} 
                style={styles.bannerImage} 
            />

            {/* Banner Text Container */}
            <View style={styles.bannerTextContainer}>
                {/* Arrow Box */}
                <View style={styles.arrowBox}>
                    <Ionicons name="arrow-forward" size={16} color="black" />
                </View>

                {/* Title Text */}
                <View style={styles.textBox}>
                    <Text style={styles.bannerTitle}>JUST IN: NEW TO SALE</Text>
                </View>

                {/* Subtitle Text */}
                <View style={styles.textBox}>
                    <Text style={styles.bannerSubtitle}>Don't miss out.</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
    },
    bannerImage: {
        width: width, 
        height: 250, 
        resizeMode: "cover",
    },
    bannerTextContainer: {
        position: "absolute",
        top: "40%",
        left: 20,
    },
    arrowBox: {
        backgroundColor: "white",
        padding: 6,
        alignSelf: "flex-start",
    },
    textBox: {
        backgroundColor: "white",
        padding: 6,
        marginTop: 6,
        alignSelf: "flex-start",
    },
    bannerTitle: {
        fontWeight: "bold",
        fontSize: 14,
        letterSpacing: 1,
    },
    bannerSubtitle: {
        fontSize: 12,
        color: "gray",
    }
});

export default CategoryBanner;
