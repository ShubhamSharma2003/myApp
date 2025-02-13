import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const categories = [
    { label: 'SHOP SMARTWATCH', imageSource: 'https://cdn.shopify.com/s/files/1/0997/6284/files/Slice_9Master_buds_D.webp?v=1739372267' },
    { label: 'SHOP AUDIO', imageSource: 'https://cdn.shopify.com/s/files/1/0997/6284/files/Slice_9Master_buds_D.webp?v=1739372267' },
    { label: 'SHOP SPEAKERS', imageSource: 'https://cdn.shopify.com/s/files/1/0997/6284/files/Slice_9Master_buds_D.webp?v=1739372267' },
    { label: 'SHOP ACCESSORIES', imageSource: 'https://cdn.shopify.com/s/files/1/0997/6284/files/Slice_9Master_buds_D.webp?v=1739372267' },
];

const ImageCardList = () => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            {categories.map((item, index) => (
                <TouchableOpacity key={index} style={styles.cardContainer} onPress={() => console.log(`${item.label} clicked`)}>
                    <Image source={{ uri: item.imageSource }} style={styles.image} resizeMode="cover" />
                    <View style={styles.overlay}>
                        <Text style={styles.discount}>%</Text>
                        <Text style={styles.label}>{item.label}</Text>
                    </View>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingTop: 50,
        paddingBottom:20,
    },
    cardContainer: {
        width: '100%',
        marginBottom: 10,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: 120,
    },
    overlay: {
        position: 'absolute',
        left: 10,
        top: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    discount: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'red',
        marginRight: 5,
    },
    label: {
        fontSize: 14,
        fontWeight: 'bold',
    },
});

export default ImageCardList;
