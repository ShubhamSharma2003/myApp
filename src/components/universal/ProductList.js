import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { fetchProducts } from '../../../api/shopifyApi';

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const data = await fetchProducts();
                setProducts(data);
            } catch (error) {
                console.error("Error loading products:", error);
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" color="#000" style={styles.loader} />;
    }

    return (
        <FlatList
            data={products}
            keyExtractor={(item) => item.id}
            numColumns={2}
            contentContainerStyle={styles.listContainer}
            renderItem={({ item }) => {
                const imageUrl = item.featuredImage ? item.featuredImage.url : null;
                const title = item.metafield?.value || item.title; // ✅ Use metafield value if available
                const price = item.priceRange?.minVariantPrice?.amount + " " + item.priceRange?.minVariantPrice?.currencyCode;
                
                const formattedUspTags = Array.isArray(item.uspTags)
                    ? item.uspTags
                        .map(tag => tag.replace(/^usp\d*_?/i, "")) 
                        .join(" | ")
                    : "";


                return (
                    <View style={styles.productCard}>
                        {imageUrl ? (
                            <Image source={{ uri: imageUrl }} style={styles.image} />
                        ) : (
                            <View style={styles.imagePlaceholder}>
                                <Text style={styles.noImageText}>No Image</Text>
                            </View>
                        )}
                        <Text style={styles.title} numberOfLines={2}>{title}</Text>
                        <Text style={styles.uspTags} numberOfLines={2}>{formattedUspTags || "No USP Tags"}</Text>
                        <Text style={styles.price}>{price}</Text>
                    </View>
                );
            }}
        />
    );
}

const styles = StyleSheet.create({
    loader: {
        marginTop: 20,
    },
    listContainer: {
        marginTop: 20,
        paddingBottom: 20,
        paddingHorizontal: 10,
    },
    productCard: {
        flex: 1,
        margin: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 12,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
    },
    image: {
        width: 120,
        height: 120,
        resizeMode: 'contain',
        borderRadius: 10,
    },
    imagePlaceholder: {
        width: 120,
        height: 120,
        backgroundColor: '#ddd',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    noImageText: {
        fontSize: 12,
        color: 'gray',
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 5,
    },
    price: {
        fontSize: 14,
        color: '#27ae60',
        fontWeight: 'bold',
    },
    uspTags: {
        fontSize: 12,
        color: '#d35400',
        textAlign: 'center',
        marginTop: 5,
    },
});

