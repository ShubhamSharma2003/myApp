import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, Linking, SafeAreaView } from 'react-native';

const { width, height } = Dimensions.get('window');

const SuggestedProducts = () => {
    const looks = [
        {
            id: '1',
            source: 'https://cdn.shopify.com/s/files/1/0997/6284/files/IMG_4739.png?v=1739028371',
            link: 'https://mansinoise.myshopify.com/products/product-1',
        },
        {
            id: '2',
            source: 'https://cdn.shopify.com/s/files/1/0997/6284/files/IMG_4739.png?v=1739028371',
            link: 'https://mansinoise.myshopify.com/products/product-2',
        },
        {
            id: '3',
            source: 'https://cdn.shopify.com/s/files/1/0997/6284/files/IMG_4739.png?v=1739028371',
            link: 'https://mansinoise.myshopify.com/products/product-3',
        }
    ];

    return (
        <SafeAreaView style={styles.safeContainer}>
            <View style={styles.container}>
                {/* Header */}
                <Text style={styles.heading}>SHOP SUGGESTED PRODUCTS</Text>
                <Text style={styles.subHeading}>Select your favorite for more details</Text>

                {/* See All Looks Button */}
                <TouchableOpacity 
                    style={styles.seeAllButton} 
                    onPress={() => Linking.openURL('https://mansinoise.myshopify.com/collections/all')}
                >
                    <Text style={styles.seeAllText}>SEE ALL LOOKS →</Text>
                </TouchableOpacity>

                {/* Image Grid */}
                <View style={styles.gridContainer}>
                    {/* Top Container (Two images side by side) */}
                    <View style={styles.topContainer}>
                        <TouchableOpacity 
                            onPress={() => Linking.openURL(looks[0].link)} 
                            style={styles.sideBySideTouchable}
                        >
                            <Image source={{ uri: looks[0].source }} style={styles.sideImage} resizeMode="cover" />
                        </TouchableOpacity>

                        <TouchableOpacity 
                            onPress={() => Linking.openURL(looks[1].link)} 
                            style={styles.sideBySideTouchable}
                        >
                            <Image source={{ uri: looks[1].source }} style={styles.sideImage} resizeMode="cover" />
                        </TouchableOpacity>
                    </View>

                    {/* Bottom Container (One large image) */}
                    <View style={styles.bottomContainer}>
                        <TouchableOpacity 
                            onPress={() => Linking.openURL(looks[2].link)} 
                            style={styles.fullSizeTouchable}
                        >
                            <Image source={{ uri: looks[2].source }} style={styles.largeImage} resizeMode="cover" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
        paddingBottom: "60%", // Prevents bottom image from hiding behind the nav bar
    },
    heading: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#000',
    },
    subHeading: {
        fontSize: 14,
        color: '#555',
        marginBottom: 10,
    },
    seeAllButton: {
        borderWidth: 1,
        borderColor: '#000',
        paddingVertical: 10,
        paddingHorizontal: 15,
        alignSelf: 'flex-start',
        marginBottom: 15,
    },
    seeAllText: {
        color: '#000',
        fontSize: 14,
        fontWeight: 'bold',
    },
    gridContainer: {
        width: '100%',
        height: height * 0.5, // Adjust height dynamically
        justifyContent: 'space-between',
    },
    topContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 10,
        width: '100%',
        height: '50%', // Reserve space for top images
    },
    sideBySideTouchable: {
        width: '48%', // Ensures spacing
        height: '100%',
    },
    sideImage: {
        width: '100%',
        height: '100%',
    },
    bottomContainer: {

        marginTop: 10,
        width: '100%',
        height: '100%', 
    },
    largeImage: {
        width: '100%',
        height: '100%',
    },
    fullSizeTouchable: {
        width: '100%',
        height: '100%',
    },
});

export default SuggestedProducts;
