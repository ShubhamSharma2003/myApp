import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import Icon from "@expo/vector-icons/Ionicons";

export default function SearchBar() {
    return (
        <View style={styles.searchContainer}>
            <View style={styles.searchBar}>
                <TextInput placeholder="Search for products here..." style={styles.searchInput} />
                <View style={styles.searchActions}>
                    <Icon name="mic-outline" size={20} color="#666" style={styles.icon} />
                    <Icon name="camera-outline" size={20} color="#666" style={styles.icon} />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    searchContainer: {
        marginTop: 60, // Adjust based on the header height
        marginBottom: 12,
        paddingHorizontal: 16,
    },
    searchBar: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F5F5F5",
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 25,
    },
    searchInput: {
        flex: 1,
        marginLeft: 10,
        fontSize: 16,
    },
    searchActions: {
        flexDirection: "row",
        alignItems: "center",
    },
    icon: {
        marginLeft: 8,
    },
});
