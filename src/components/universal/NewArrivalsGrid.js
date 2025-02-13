import React, { useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Video } from 'expo-av';
import { Ionicons } from '@expo/vector-icons'; // Icon for play/pause

const { width } = Dimensions.get('window');

const NewArrivalsGrid = () => {
    const newArrivals = [
        {
            id: '1',
            type: 'video',
            source: 'https://cdn.shopify.com/videos/c/o/v/32ca002305a54cf4969f415d066744e7.mp4',
        },
        {
            id: '2',
            type: 'video',
            source: "https://cdn.shopify.com/videos/c/o/v/a162806cae974724a05c274a8138e76f.mp4",
        },
        {
            id: '3',
            type: 'video',
            source: 'https://cdn.shopify.com/videos/c/o/v/d4615dd1f62c4ed0bcfb5448722488eb.mp4',
        }
    ];

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.heading}>NEW ARRIVALS</Text>
                <TouchableOpacity style={styles.shopNewInButton}>
                    <Text style={styles.shopNewInText}>SHOP NEW IN →</Text>
                </TouchableOpacity>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
                {newArrivals.map((item) => (
                    <DynamicCard key={item.id} item={item} />
                ))}
            </ScrollView>
        </View>
    );
};

// Component that dynamically adjusts height
const DynamicCard = ({ item }) => {
    const [height, setHeight] = useState(400); // Default height
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = React.useRef(null);

    const togglePlayPause = async () => {
        if (videoRef.current) {
            if (isPlaying) {
                await videoRef.current.pauseAsync();
            } else {
                await videoRef.current.playAsync();
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <View style={[styles.card, { height }]}>
            {item.type === 'image' ? (
                <Image
                    source={{ uri: item.source }}
                    style={styles.media}
                    resizeMode="cover"
                    onLoad={(event) => {
                        const { width: imgWidth, height: imgHeight } = event.nativeEvent.source;
                        setHeight((imgHeight / imgWidth) * (width * 0.7)); // Maintain aspect ratio
                    }}
                />
            ) : (
                <View style={styles.videoContainer}>
                    <Video
                        ref={videoRef}
                        source={{ uri: item.source }}
                        style={styles.media}
                        resizeMode="cover"
                        shouldPlay={true}
                        isLooping
                    />
                    {/* Custom Play/Pause Button */}
                    <TouchableOpacity style={styles.playPauseButton} onPress={togglePlayPause}>
                        <Ionicons name={isPlaying ? 'pause' : 'play'} size={30} color="#fff" />
                    </TouchableOpacity>
                </View>
            )}
            <TouchableOpacity style={styles.exploreButton}>
                <Text style={styles.exploreText}>Explore More</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
        paddingHorizontal: 15,
    },
    header: {
        paddingTop: 20,
        marginBottom: 10,
    },
    heading: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#000',
    },
    shopNewInButton: {
        backgroundColor: 'transparent',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: '#000',
        marginTop: 5,
    },
    shopNewInText: {
        color: '#000000',
        fontSize: 14,
        fontWeight: 'bold',
    },
    scrollContainer: {
        paddingBottom: 6,
    },
    card: {
        width: width * 0.7,
        marginRight: 10,
        overflow: 'hidden',
        position: 'relative',
    },
    media: {
        width: '100%',
        height: '100%',
    },
    videoContainer: {
        width: '100%',
        height: '100%',
        position: 'relative',
    },
    exploreButton: {
        position: 'absolute',
        bottom: 20,
        left: '50%',
        transform: [{ translateX: -75 }],
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 30,
    },
    exploreText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
});

export default NewArrivalsGrid;
