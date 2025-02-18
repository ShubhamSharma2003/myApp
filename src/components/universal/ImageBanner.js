import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Image as ExpoImage } from 'expo-image';

const { width: screenWidth } = Dimensions.get('window');

const imageBanner = {
    title: 'Image Banner',
    media: [{ uri: 'https://www.gonoise.com/cdn/shop/files/Slice_2_pro6max_M.webp?v=1737567340' }],
};

export default function ImageBanner() {
    return (
        <View style={styles.container}>
            {imageBanner.media.map((item, index) => (
                <View key={index} style={styles.mediaContainer}>
                    <ExpoImage
                        source={{ uri: item.uri }}
                        style={styles.media}
                        contentFit="contain" 
                    />
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor:'#000',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mediaContainer: {
        width: '100%',
        height: '800', 
    },
    media: {

        width: '100%',
        height: '100%',
    },
});