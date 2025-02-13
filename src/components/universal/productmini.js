import { Image, View, Text, TouchableOpacity, StyleSheet } from "react-native";

const ProductMini = ({ product }) => {
    return (
        <TouchableOpacity style={styles.card}>
            {/* Product Image */}
            <View style={styles.imageContainer}>
                <Image source={{ uri: product.image }} style={styles.productImage} />
            </View>

            {/* Product Details */}
            <View style={styles.detailsContainer}>
                <Text style={styles.productTitle} numberOfLines={1}>
                    {product.name}
                </Text>

                <Text style={styles.productDescription} numberOfLines={2}>
                    {product.description}
                </Text>

                {/* Pricing */}
                <View style={styles.priceContainer}>
                    <Text style={styles.originalPrice}>{product.originalPrice}</Text>
                    <Text style={styles.salePrice}>{product.salePrice}</Text>
                </View>

                {/* Shop Now Button */}
                <TouchableOpacity style={styles.btn}>
                    <Text style={styles.btnText}>Shop Now</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        width: 180,
        backgroundColor: "#fff", // White card background for contrast
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#ff69b4",
        padding: 10,
        alignItems: "center",
        marginRight: 10, // Right padding for spacing between cards
    },
    imageContainer: {
        alignItems: "center",
        marginBottom: 10,
    },
    productImage: {
        width: 100,
        height: 100,
        resizeMode: "contain",
    },
    detailsContainer: {
        alignItems: "center",
    },
    productTitle: {
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    },
    productDescription: {
        fontSize: 14,
        color: "#666",
        textAlign: "center",
        marginTop: 5,
    },
    priceContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 5,
    },
    originalPrice: {
        fontSize: 14,
        color: "#000",
        textDecorationLine: "line-through",
    },
    salePrice: {
        fontSize: 14,
        color: "red",
        marginLeft: 5,
        fontWeight: "bold",
    },
    btn: {
        width: "100%",
        height: 35,
        backgroundColor: "#ff69b4",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        marginTop: 10,
        paddingRight: 10,
        paddingLeft: 10,
    },
    btnText: {
        fontSize: 14,
        color: "#fff",
        fontWeight: "bold",
    },
});

export default ProductMini;
