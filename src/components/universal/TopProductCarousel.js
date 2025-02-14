import React from "react";
import { View, Text, Image, FlatList, StyleSheet, Dimensions } from "react-native";
import { Video } from "expo-av"; // Import Video component from Expo

const { width } = Dimensions.get("window");

// Top 5 products with image, GIF, or video URLs
const topProducts = [
    { id: "1", media: "https://cdn.shopify.com/s/files/1/0997/6284/files/pass4.png?v=1739184733" },
    { id: "2", media: "https://cdn.shopify.com/s/files/1/0997/6284/files/pass4.png?v=1739184733" },
    { id: "3", media: "https://cdn.shopify.com/s/files/1/0997/6284/files/pass4.png?v=1739184733" },
    { id: "4", media: "https://cdn.shopify.com/s/files/1/0997/6284/files/pass4.png?v=1739184733" },
    { id: "5", media: "https://cdn.shopify.com/s/files/1/0997/6284/files/pass4.png?v=1739184733" },
];

// Function to determine media type
const getMediaType = (url) => {
    if (url.endsWith(".mp4") || url.endsWith(".mov") || url.endsWith(".avi")) {
        return "video";
    } else {
        return "image"; // Covers images & GIFs
    }
};

const TopProductsCarousel = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Top 5 Products</Text>
            <FlatList
                data={topProducts}
                horizontal
                keyExtractor={(item) => item.id}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => {
                    const mediaType = getMediaType(item.media);

                    return (
                        <View style={[
                            styles.productContainer, 
                            index === 0 ? styles.firstItem : null // Extra padding for the first item
                        ]}>
                            {/* Large Number in Background with Full Black Outline */}
                            <Text style={ [styles.rank , index === 0 ? styles.firstItem : null]}>{index + 1}</Text>

                            {/* Render Image, GIF, or Video */}
                            {mediaType === "image" ? (
                                <Image source={{ uri: item.media }} style={styles.productMedia} />
                            ) : (
                                <Video
                                    source={{ uri: item.media }}
                                    style={styles.productMedia}
                                    useNativeControls
                                    resizeMode="cover"
                                    isLooping
                                    shouldPlay
                                />
                            )}
                        </View>
                    );
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#000",
        marginBottom: 10,
    },
    productContainer: {
        width: width * 0.4,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 20,
        paddingLeft: 30, // Default padding for all items
        position: "relative",
        paddingBottom:15,
    },
    firstItem: {
        marginLeft: 8, // Increased left padding for the first item
    },
    rank: {
        position: "absolute",
        marginLeft: 1,
        fontSize: 120,
        fontWeight: "bold",
        color: "white",
        left: -17,
        top: "35%", // Moved slightly up
        zIndex: -1,

        // 🔥 Full black outline effect
        textShadowColor: "rgba(0, 0, 0, 2.4)", // Darker shadow
        textShadowOffset: { width: 0, height: 0 }, 
        textShadowRadius: 10,
    },
    productMedia: {
        width: "100%",
        height: 180,
    },
});

export default TopProductsCarousel;
