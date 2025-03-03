import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const categories = [
    { id: 1, name: "SMART-WATCHES", icon: "watch-outline", handle: "smart-watches" },
    { id: 2, name: "AUDIO GEAR", icon: "headset-outline", handle: "anc-earbuds" },
    { id: 3, name: "POWER SERIES", icon: "flash-outline", handle: "noise-power-series-gan-chargers" },
    { id: 4, name: "ACCESSORIES", icon: "extension-puzzle-outline", handle: "accessories" }
];

const CategoryList = () => {
    const navigation = useNavigation();

    const handlePress = (handle) => {
        navigation.navigate("CollectionScreen", { handle });
    };

    return (
        <View style={styles.container}>
            {categories.map((category) => (
                <TouchableOpacity 
                    key={category.id} 
                    style={styles.categoryItem} 
                    onPress={() => handlePress(category.handle)}
                >
                    <View style={styles.leftSection}>
                        <Ionicons name={category.icon} size={22} style={styles.icon} />
                        <Text style={styles.categoryText}>{category.name}</Text>
                    </View>
                    <Ionicons name="chevron-forward-outline" size={20} color="#000" />
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 0,
        paddingVertical: 10,
        backgroundColor: '#fff',
        paddingBottom: 20,
    },
    categoryItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 40,
        paddingHorizontal: 30,
        borderBottomWidth: 1,
        borderBottomColor: "#E5E5E5",
        backgroundColor: "#FFF",
    },
    leftSection: {
        flexDirection: "row",
        alignItems: "center",
    },
    icon: {
        marginRight: 15,
    },
    categoryText: {
        fontSize: 16,
        fontWeight: "bold",
        fontFamily: "adihausdin_bold",
    },
});

export default CategoryList;
