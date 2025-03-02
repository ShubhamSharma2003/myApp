import React from "react";
import { View, TextInput, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function SearchBar() {
    const navigation = useNavigation();

    return (
        <Pressable onPress={() => navigation.navigate("SearchScreen")} style={styles.searchContainer}>
            <View style={styles.searchBar}>
                <Ionicons name="search" size={20} color="gray" />
                <TextInput
                    placeholder="Search for products here..."
                    style={styles.searchInput}
                    editable={false} // Prevents typing here; redirects to SearchScreen
                />
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    searchContainer: {
        paddingHorizontal: 16,
        marginTop: 50,
    },
    searchBar: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFF",
        paddingHorizontal: 16,
        paddingVertical: 10,
    },
    searchInput: {
        flex: 1,
        marginLeft: 10,
        fontSize: 16,
    },
});
