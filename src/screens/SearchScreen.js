import React, { useState, useEffect } from "react";
import { View, TextInput, Text, FlatList, Pressable, StyleSheet, Image, Keyboard } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { searchProducts } from "../../api/shopifyApi"; 

export default function SearchScreen() {
    const navigation = useNavigation();
    const [searchText, setSearchText] = useState("");
    const [searchHistory, setSearchHistory] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        loadSearchHistory();
    }, []);

    // Load search history from AsyncStorage
    const loadSearchHistory = async () => {
        try {
            const history = await AsyncStorage.getItem("searchHistory");
            if (history) setSearchHistory(JSON.parse(history));
        } catch (error) {
            console.error("Failed to load search history", error);
        }
    };


    // Save search history
    const saveSearchHistory = async (searchTerm) => {
        if (!searchTerm.trim()) return;
        const updatedHistory = [searchTerm, ...searchHistory.filter(item => item !== searchTerm)].slice(0, 10);
        setSearchHistory(updatedHistory);
        await AsyncStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
    };

    // Clear search history
    const clearHistory = async () => {
        await AsyncStorage.removeItem("searchHistory");
        setSearchHistory([]);
    };

    // Handle search submission
    const handleSearch = async () => {
        if (!searchText.trim()) return;
        Keyboard.dismiss(); // Hide keyboard
        setIsLoading(true);
        
        saveSearchHistory(searchText);

        const results = await searchProducts(searchText);
        setSearchResults(results);
        setIsLoading(false);
    };

    return (
        <View style={styles.container}>
            {/* Search Bar with Back Button */}
            <View style={styles.searchBar}>
                <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </Pressable>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search for products..."
                    value={searchText}
                    onChangeText={setSearchText}
                    onSubmitEditing={handleSearch} // Search on enter
                    autoFocus
                />
            </View>

            {/* Search Results */}
            {isLoading ? (
                <Text style={styles.loadingText}>Searching...</Text>
            ) : searchResults.length > 0 ? (
                <FlatList
                    data={searchResults}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <Pressable
                            onPress={() => navigation.navigate("ProductPage", { handle: item.handle })}
                            style={styles.resultItem}
                        >
                            <Image source={{ uri: item.image }} style={styles.resultImage} />
                            <View>
                                <Text style={styles.resultTitle}>{item.title}</Text>
                                <Text style={styles.resultPrice}>{item.currency} {item.price}</Text>
                            </View>
                        </Pressable>
                    )}
                />
            ) : (
                searchText !== "" && <Text style={styles.noResults}>No products found.</Text>
            )}

            {/* Search History */}
            {searchHistory.length > 0 && searchResults.length === 0 && (
                <View style={styles.historyContainer}>
                    <View style={styles.historyHeader}>
                        <Text style={styles.historyTitle}>Recent Searches</Text>
                        <Pressable onPress={clearHistory}>
                            <Text style={styles.clearButton}>Clear All</Text>
                        </Pressable>
                    </View>
                    <FlatList
                        data={searchHistory}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <Pressable onPress={() => setSearchText(item)} style={styles.historyItem}>
                                <Ionicons name="time-outline" size={18} color="gray" />
                                <Text style={styles.historyText}>{item}</Text>
                            </Pressable>
                        )}
                    />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    searchBar: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    backButton: {
        padding: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        padding: 10,
    },
    loadingText: {
        textAlign: "center",
        marginTop: 20,
    },
    noResults: {
        textAlign: "center",
        marginTop: 20,
        color: "gray",
    },
    resultItem: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    resultImage: {
        width: 50,
        height: 50,
        marginRight: 10,
        borderRadius: 5,
    },
    resultTitle: {
        fontSize: 16,
        fontWeight: "bold",
    },
    resultPrice: {
        fontSize: 14,
        color: "#888",
    },
    historyContainer: {
        padding: 20,
    },
    historyHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    historyTitle: {
        fontSize: 16,
        fontWeight: "bold",
    },
    clearButton: {
        fontSize: 14,
        color: "red",
    },
    historyItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    historyText: {
        marginLeft: 10,
        fontSize: 16,
    },
});

