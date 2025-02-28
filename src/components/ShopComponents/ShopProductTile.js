import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import ContentLoader, { Rect } from 'react-content-loader/native';
import HeartIcon from "../../../assets/icons/heartIcon.svg";
import { useNavigation } from '@react-navigation/native';
import { fetchProducts } from '../../../api/shopifyApi'; 
import { formatPrice, calculateDiscount, formatUspTags } from '../../utils/helper'; 

const { width } = Dimensions.get('window');

const ShopProductTiles = ({ categoryHandle  }) => {
    const navigation = useNavigation(); 
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [categoryName, setCategoryName] = useState(categoryHandle); 

    useEffect(() => {
        const loadProducts = async () => {
            setLoading(true);
            console.log(`Fetching products for category handle: ${categoryHandle}`);
            const data = await fetchProducts(categoryHandle);
            setProducts(data);
            setCategoryName(categoryHandle.replace("-", " ").toUpperCase());
            setLoading(false);
        };

        loadProducts();
    }, [categoryHandle]); 

    return (
        <View style={styles.shopContainer}>
            <View style={styles.shopHeader}>
                <Text style={styles.shopHeading}>{categoryName}</Text>
                <TouchableOpacity onPress={() => navigation.navigate('CollectionScreen')} style={styles.shopSeeAllButton}>
                    <Text style={styles.shopSeeAllText}>SEE ALL →</Text>
                </TouchableOpacity>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.shopScrollContainer}>
                {loading ? (
                    Array(3).fill(0).map((_, index) => (
                        <View key={index} style={styles.shopCard}>
                            <ProductPlaceholder />
                        </View>
                    ))
                ) : (
                    products?.products.map((item) => {
                        const imageUrl = item.featuredImage ? item.featuredImage.url : 'https://via.placeholder.com/150';
                        const title = item.metafield?.value || item.title;
                        const price = item.priceRange?.minVariantPrice?.amount;
                        const formattedUspTags = formatUspTags(item.uspTags);

                        return (
                          <TouchableOpacity
                            key={item.id}
                            style={styles.shopCard}
                            onPress={() =>
                              navigation.navigate("ProductPage", {
                                product: item,
                              })
                            }
                          >
                            <TouchableOpacity style={styles.shopHeartIcon}>
                              <HeartIcon width={18} height={18} />
                            </TouchableOpacity>

                            <Image source={{ uri: imageUrl }} style={styles.shopImage} />

                            <View style={styles.shopInfoContainer}>
                                <Text style={styles.shopName} numberOfLines={1} ellipsizeMode="tail">{title}</Text>
                                <Text style={styles.shopDescription}>{formattedUspTags}</Text>

                                <View style={styles.shopPriceContainer}>
                                    <Text style={styles.shopSalePrice}>{formatPrice(price)}</Text>
                                    {item.priceRange?.maxVariantPrice?.amount && (
                                        <Text style={styles.shopOriginalPrice}>
                                            {formatPrice(item?.variants?.[0]?.compareAtPrice || "0")}
                                        </Text>
                                    )}
                                    {item.priceRange?.minVariantPrice?.amount &&
                                      item.priceRange?.maxVariantPrice?.amount && (
                                        <Text style={styles.shopDiscountText}>
                                            {calculateDiscount(price, item.priceRange?.maxVariantPrice?.amount)}
                                        </Text>
                                    )}
                                </View>
                            </View>
                          </TouchableOpacity>
                        );
                    })
                )}
            </ScrollView>
        </View>
    );
};

const ProductPlaceholder = () => (
    <ContentLoader
        speed={1.5}
        width={width * 0.4}
        height={200}
        viewBox={`0 0 ${width * 0.4} 200`}
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
    >
        <Rect x="10" y="10" rx="10" ry="10" width="120" height="120" />
        <Rect x="10" y="140" rx="4" ry="4" width="100" height="10" />
        <Rect x="10" y="160" rx="4" ry="4" width="80" height="10" />
        <Rect x="10" y="180" rx="4" ry="4" width="50" height="10" />
    </ContentLoader>
);

const styles = StyleSheet.create({
    shopContainer: {
        width: '100%',
        padding: 20,
        paddingTop: 20,
        backgroundColor:'#FFF',
    },
    shopHeader: {
        flexDirection: 'col',
        justifyContent: 'space-between',
        alignItems: 'left',
        marginBottom: 10,
    },
    shopHeading: {
        paddingBottom: 10,
        fontSize: 22,
        fontWeight: 'bold',
        color: '#000',
    },
    shopSeeAllButton: {
        width: 100,
        borderWidth: 1,
        borderColor: '#000',
        paddingVertical: 2,
        alignItems: 'center',
    },
    shopSeeAllText: {
        color: '#000',
        fontSize: 14,
        fontWeight: 'bold',
    },
    shopScrollContainer: {
        paddingBottom: 6,
    },
    shopCard: {
        width: width * 0.41,
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        marginRight: 7,
        alignItems: 'flex-start',
        borderWidth: 1,
        borderColor: '#eee',
    },
    shopHeartIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 1,
    },
    shopImage: {
        marginTop: 5,
        width: 100,
        height: 100,
        alignSelf: 'center',
        resizeMode: 'contain',
        marginBottom: 10,
    },
    shopInfoContainer: {
        width: '100%',
        alignItems: 'flex-start',
        paddingTop: 5,
        paddingBottom: 10,
    },
    shopName: {
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'left',
        lineHeight: 20, 
        width: '100%',  
    },
    shopDescription: {
        fontSize: 11,
        color: '#777',
        textAlign: 'left',
    },
    shopPriceContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
        gap: 6,
        maxWidth: '100%',
    },
    shopOriginalPrice: {
        textDecorationLine: 'line-through',
        color: '#777',
        fontSize: 11,
    },
    shopSalePrice: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#000000',
        marginTop: 5,
    },
    shopDiscountText:{
        fontSize: 10,
        color: '#27ae60',
        fontWeight: 'bold',
        marginTop: 5,
    }
});

export default ShopProductTiles;
