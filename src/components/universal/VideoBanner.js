import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Video } from 'expo-av';

const videoSection = {
    title: 'Video Banner',
    media: [{ uri: 'https://cdn.shopify.com/videos/c/o/v/f24a20ec44f24cfb91b1069d8e15cc33.mp4', type: 'video' }],
    
};

export default function SingleVideoBanner() {
    return (
        <View style={styles.container}>
            {videoSection.media.map((item, index) => (
                <View key={index} style={styles.mediaContainer}>
                    <Video
                        source={{ uri: item.uri }}
                        style={styles.media}
                        resizeMode="cover" 
                        shouldPlay
                        isLooping
                        isMuted
                    />
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mediaContainer: {
        width: '100%',
        height: '700', // Set a fixed height for the video
    },
    media: {
        width: '100%',
        height: '100%',
    },
});