import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const PromoTiles = () => {
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <TouchableOpacity style={styles.tile}>
                    <Ionicons name="pricetag-outline" size={22} />
                    <Text style={styles.tileText}>SALE</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.tile}>
                    <Ionicons name="star-outline" size={22} />
                    <Text style={styles.tileText}>BESTSELLERS</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.row}>
                <TouchableOpacity style={styles.tile}>
                    <Ionicons name="sparkles-outline" size={22} />
                    <Text style={styles.tileText}>NEW LAUNCH</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.tile}>
                    <Ionicons name="card-outline" size={22} />
                    <Text style={styles.tileText}>GIFTCARDS</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor:'#fff',
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10, // Space between rows
    },
    tile: {
        flex: 1,
        alignItems: "center",
        paddingVertical: 20,
        borderWidth: 1,
        borderColor: "#e0e0e0",
        marginHorizontal: 5,
    },
    tileText: {
        marginTop: 5,
        fontSize: 14,
    },
});

export default PromoTiles;
