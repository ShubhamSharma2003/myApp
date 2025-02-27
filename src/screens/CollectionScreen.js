import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, SafeAreaView, Animated } from 'react-native';
import { fetchProducts } from '../../api/shopifyApi';
import { useNavigation, useRoute } from '@react-navigation/native';
import HeartIcon from "../../assets/icons/heartIcon.svg";
import { formatPrice, calculateDiscount, formatUspTags } from '../utils/helper';
import ProductHeader from '../components/product/ProductHeader';
import FilterScroll from '../components/universal/FilterScroll';

const SkeletonLoader = () => {
    const opacity = new Animated.Value(0.3);

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(opacity, { toValue: 1, duration: 500, useNativeDriver: true }),
                Animated.timing(opacity, { toValue: 0.3, duration: 500, useNativeDriver: true }),
            ])
        ).start();
    }, []);

    return (
        <View style={styles.skeletonContainer}>
            {Array(10).fill(null).map((_, index) => (
                <Animated.View key={index} style={[styles.skeletonCard, { opacity }]}>
                    <View style={styles.skeletonImage} />
                    <View style={styles.skeletonText} />
                    <View style={styles.skeletonPrice} />
                </Animated.View>
            ))}
        </View>
    );
};

const CollectionScreen = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigation = useNavigation();
    const route = useRoute();
 
    // ✅ Get selected filters from `FilterScreen`
    const selectedVariants = route.params?.selectedVariants || [];
    const priceRange = route.params?.priceRange || null; // Price filter
    const sortBy = route.params?.sortBy || "";

    useEffect(() => {
        const loadProducts = async () => {
            const data = await fetchProducts();
            let modifiedProducts = [];
    
            for (let i = 0; i < data.length; i++) {
                modifiedProducts.push({ type: 'small', ...data[i] });

                if ((modifiedProducts.length) % 6 === 0) {
                    modifiedProducts.push({ type: 'large', ...data[i] });
                }
            }
    
            setProducts(modifiedProducts);
            setIsLoading(false);
        };

        loadProducts();
    }, []);

    useEffect(() => {
        let filtered = products;

        // ✅ Apply variant filter
        if (selectedVariants.length > 0) {
            filtered = filtered.filter(product =>
                product.variants?.some(variant => selectedVariants.includes(variant.title))
            );
        }

        // ✅ Apply price range filter
        if (priceRange) {
            filtered = filtered.filter(product => {
                const productPrice = parseFloat(product.priceRange?.minVariantPrice?.amount);
                return productPrice <= priceRange; // Only products within price range
            });
        }

        if (sortBy === "lowToHigh") {
            filtered.sort((a, b) => parseFloat(a.priceRange?.minVariantPrice?.amount) - parseFloat(b.priceRange?.minVariantPrice?.amount));
        } else if (sortBy === "highToLow") {
            filtered.sort((a, b) => parseFloat(b.priceRange?.minVariantPrice?.amount) - parseFloat(a.priceRange?.minVariantPrice?.amount));
        }

        setFilteredProducts(filtered);
    }, [selectedVariants, priceRange, products]);

    // ✅ Function to render each product (small or large)
    const renderProduct = ({ item, index }) => {
        const imageUrl = item.featuredImage ? item.featuredImage.url : 'https://via.placeholder.com/150';
        const title = item.metafield?.value || item.title;
        const price = item.priceRange?.minVariantPrice?.amount;
        const maxPrice = item.priceRange?.maxVariantPrice?.amount;
        const uspTags = formatUspTags(item.uspTags);

        if (item.type === 'large') {
            return (
                <View style={styles.largeCardContainer}>
                    <TouchableOpacity 
                        style={styles.largeCard} 
                        onPress={() => navigation.navigate('ProductPage', { product: item })}
                    >
                        <TouchableOpacity style={styles.heartIcon}>
                            <HeartIcon width={22} height={22} />
                        </TouchableOpacity>
                        <Image source={{ uri: imageUrl }} style={styles.largeImage} />
                        <Text style={styles.largeTitle}>{title}</Text>
                        <Text style={styles.largeDescription}>
                            {uspTags || item.descriptionHtml.replace(/<[^>]*>?/gm, '').substring(0, 80) + "..."}
                        </Text>

                        <View style={styles.priceContainer}>
                            <Text style={styles.salePrice}>{formatPrice(price)}</Text>
                            {maxPrice && (
                                <Text style={styles.originalPrice}>{formatPrice(maxPrice)}</Text>
                            )}
                            {maxPrice && (
                                <Text style={styles.discountText}>{calculateDiscount(price, maxPrice)}</Text>
                            )}
                        </View>

                    </TouchableOpacity>
                </View>
            );
        }

        return (
            <View style={styles.smallCardContainer}>
                <TouchableOpacity 
                    style={styles.card} 
                    onPress={() => navigation.navigate('ProductPage', { product: item })}
                >
                    <TouchableOpacity style={styles.heartIcon}>
                        <HeartIcon width={18} height={18} />
                    </TouchableOpacity>
                    <Image source={{ uri: imageUrl }} style={styles.image} />
                    <Text style={styles.name}>{title}</Text>
                    <Text style={styles.description}>
                        {uspTags || item.descriptionHtml.replace(/<[^>]*>?/gm, '').substring(0, 50) + "..."}
                    </Text>

                    <View style={styles.priceContainer}>
                        <Text style={styles.salePrice}>₹{parseFloat(price).toFixed(2)}</Text>
                        {maxPrice && (
                            <Text style={styles.originalPrice}>₹{parseFloat(maxPrice).toFixed(2)}</Text>
                        )}
                        {maxPrice && (
                            <Text style={styles.discountText}>{calculateDiscount(price, maxPrice)}</Text>
                        )}
                    </View>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ProductHeader style={{ backgroundColor: '#fff' }} />
            <FilterScroll />

            {isLoading ? (
                <SkeletonLoader />
            ) : (
                <FlatList 
                    data={filteredProducts} // ✅ Use filtered products here
                    renderItem={renderProduct}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.listContainer}
                />
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    listContainer: {
        padding: 10,
        paddingTop: 10,
    },

    smallCardContainer: {
        width: '48%', 
        margin: '1%',
    },
    card: {
        backgroundColor: '#f9f9f9',
        padding: 9,
        alignItems: 'flex-start',
        elevation: 2,
        paddingTop:5,
        height: 210,
    },
    heartIcon: {
        position: 'absolute',
        top: 8,
        right: 8,
        zIndex: 1,
    },
    image: {
        width: 110,
        height: 110,
        alignSelf: 'center',
        resizeMode: 'contain',
        marginBottom: 10,
    },
    name: {
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'left',
    },
    description: {
        fontSize: 12,
        textAlign: 'left',
        color: '#777',
        marginVertical: 2,
    },

    priceContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
        justifyContent: 'left',
    },
    salePrice: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black',
        marginRight: 5,
    },
    originalPrice: {
        fontSize: 11,
        textDecorationLine: 'line-through',
        color: 'gray',
        marginRight: 5,
    },
    discountText: {
        fontSize: 10,
        color: 'green',
        fontWeight: 'bold',
    },

    // **LARGE PRODUCT CARD STYLES**
    largeCardContainer: {
        width: '100%',
        marginBottom: 5,
        marginTop: 5,
    },
    largeCard: {
        backgroundColor: '#f5f5f5',
        padding: 15,
        alignItems: 'flex-start',
        elevation: 3,
        width: '100%',
    },
    largeImage: {
        width: 280,
        height: 280,
        alignSelf: 'center',
        resizeMode: 'contain',
        marginBottom: 10,
    },
    largeTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'left',
    },
    largeDescription: {
        fontSize: 14,
        textAlign: 'left',
        color: '#555',
        marginVertical: 1,
    },
     // **Skeleton Loader Styles**
     skeletonContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        padding: 10,
    },
    skeletonCard: {
        width: '48%',
        height: 210,
        backgroundColor: '#f3f3f3',
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
    },
    skeletonImage: {
        width: '100%',
        height: 100,
        backgroundColor: '#e0e0e0',
        borderRadius: 5,
    },
    skeletonText: {
        width: '70%',
        height: 12,
        backgroundColor: '#dcdcdc',
        marginTop: 10,
        borderRadius: 3,
    },
    skeletonPrice: {
        width: '50%',
        height: 12,
        backgroundColor: '#dcdcdc',
        marginTop: 5,
        borderRadius: 3,
    },
});


export default CollectionScreen;
