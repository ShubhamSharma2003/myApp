import React, { useState, useEffect } from "react";
import { 
    View, TextInput, Text, FlatList, Pressable, 
    StyleSheet, Image, Keyboard, ActivityIndicator 
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { searchProducts } from "../../api/shopifyApi"; 
import { formatPrice, calculateDiscount, formatUspTags } from "../utils/helper";

export default function SearchScreen() {
    const navigation = useNavigation();
    const [searchText, setSearchText] = useState("");
    const [searchHistory, setSearchHistory] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        loadSearchHistory();
    }, []);

    const loadSearchHistory = async () => {
        try {
            const history = await AsyncStorage.getItem("searchHistory");
            if (history) setSearchHistory(JSON.parse(history));
        } catch (error) {
            console.error("Failed to load search history", error);
        }
    };

    const saveSearchHistory = async (searchTerm) => {
        if (!searchTerm.trim()) return;
        const updatedHistory = [searchTerm, ...searchHistory.filter(item => item !== searchTerm)].slice(0, 10);
        setSearchHistory(updatedHistory);
        await AsyncStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
    };

    const clearHistory = async () => {
        await AsyncStorage.removeItem("searchHistory");
        setSearchHistory([]);
    };

    const handleSearch = async () => {
        if (!searchText.trim()) return;
        Keyboard.dismiss();
        setIsLoading(true);
        
        saveSearchHistory(searchText);

        const results = await searchProducts(searchText);
        setSearchResults(results);
        setIsLoading(false);
    };

    return (
        <View style={styles.container}>
            {/* Search Bar */}
            <View style={styles.searchBar}>
                <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </Pressable>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search for products..."
                    value={searchText}
                    onChangeText={setSearchText}
                    onSubmitEditing={handleSearch}
                    autoFocus
                />
            </View>

            {/* Loading Indicator */}
            {isLoading ? (
                <ActivityIndicator size="large" color="#000" style={{ marginTop: 20 }} />
            ) : searchResults.length > 0 ? (
                <FlatList
                    data={searchResults}
                    key={"2-columns"} 
                    numColumns={2} 
                    contentContainerStyle={styles.productList}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <Pressable
                            onPress={() => navigation.navigate("ProductPage", { handle: item.handle })}
                            style={styles.productCard}
                        >
                            <Image source={{ uri: item?.image }} style={styles.productImage} />
                            <Text style={styles.productTitle} numberOfLines={2} ellipsizeMode="tail">
                                {item?.metafield?.value}
                            </Text>

                            <Text style={styles.description}>{formatUspTags(item?.tags || "Shop Now")}</Text>
                            <View style={styles.priceRow}>
                                <Text style={styles.salePrice}>{formatPrice(item?.price || '₹0')}</Text>
                                <Text style={styles.originalPrice}>{formatPrice(item?.maxPrice || '₹0')}</Text>
                                <Text style={styles.discountText}>{calculateDiscount(item?.price, item?.maxPrice) || '0% OFF'}</Text>
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
        backgroundColor: "#f9f9f9",
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
    productList: {
        paddingHorizontal: 10,
        paddingTop: 10,
    },
    productCard: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 10,
        margin: 5,
        alignItems: "flex-start",
        borderWidth:1,
        borderColor:'#eee',
    },
    productImage: {
        width: 150,
        height: 150,
        resizeMode: "cover",
    },
    productTitle: {
        fontSize: 14,
        fontWeight: "bold",
        marginTop: 5,
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'baseline',
        gap: 6,
        maxWidth: '100%',
    },
    originalPrice: {
        textDecorationLine: 'line-through',
        color: '#777',
        fontSize: 11,
    },
    salePrice: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#000000',

    },
    discountText:{
        fontSize: 10,
        color: '#27ae60',
        fontWeight: 'bold',
        marginTop: 5,
    },
    description: {
        fontSize: 11,
        color: '#777',
        textAlign: 'left',
    },
    noResults: {
        textAlign: "center",
        marginTop: 20,
        color: "gray",
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
        color: "grey",
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

