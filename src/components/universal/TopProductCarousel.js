import React from "react";
import { View, Text, Image, FlatList, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { Video } from "expo-av";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

// Top 5 products with image, GIF, or video URLs + product handle for navigation
const topProducts = [
    { id: "1", media: "https://cdn.shopify.com/s/files/1/0997/6284/files/Carousel_4_200x.webp?v=1740937257", handle: "noise-pure-pods-open-ear-headphones" },
    { id: "2", media: "https://cdn.shopify.com/s/files/1/0997/6284/files/Carousel_2_200x.webp?v=1740937257", handle: "noisefit-diva-2-smartwatch" },
    { id: "3", media: "https://cdn.shopify.com/s/files/1/0997/6284/files/Carousel_3_200x.webp?v=1740937257", handle: "noise-buds-n1-truly-wireless-earbuds" },
    { id: "4", media: "https://cdn.shopify.com/s/files/1/0997/6284/files/Carousel_1_200x.webp?v=1740937257", handle: "noise-air-clips-ows-open-ear-headphone" },
    { id: "5", media: "https://cdn.shopify.com/s/files/1/0997/6284/files/Carousel_4_200x.webp?v=1740937257", handle: "noise-pure-pods-open-ear-headphones" },
];

// Function to determine media type
const getMediaType = (url) => (url.endsWith(".mp4") || url.endsWith(".mov") || url.endsWith(".avi")) ? "video" : "image";

const TopProductsCarousel = () => {
    const navigation = useNavigation();

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
                        <TouchableOpacity 
                            onPress={() => navigation.navigate("ProductPage", { handle: item.handle })}
                            activeOpacity={0.8}
                            style={[
                                styles.productContainer,
                                index === 0 ? styles.firstItem : null
                            ]}
                        >
                            <Text style={[styles.rank, index === 0 ? styles.firstItem : null]}>{index + 1}</Text>
                            
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
                        </TouchableOpacity>
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
        paddingLeft: 30,
        position: "relative",
        paddingBottom: 15,
    },
    firstItem: {
        marginLeft: 8,
    },
    rank: {
        position: "absolute",
        fontSize: 120,
        fontWeight: "bold",
        color: "white",
        left: -17,
        top: "35%",
        zIndex: -1,
        textShadowColor: "rgba(0, 0, 0, 2.4)",
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 10,
    },
    productMedia: {
        width: "100%",
        height: 180,
    },
});

export default TopProductsCarousel;
