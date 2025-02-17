import React, { useState, useRef } from 'react';
import {
  View,
  ScrollView,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

// Fixed dimensions for the container
const containerHeight = 370;
const containerWidth = 370;

// Example images - replace with your real product images
const images = [
  { id: 1, url: 'https://cdn.shopify.com/s/files/1/0997/6284/files/Artboard_10.webp?v=1738306745' },
  { id: 2, url: 'https://www.gonoise.com/cdn/shop/files/Artboard_9.webp?v=1738306745' },
  { id: 3, url: 'https://www.gonoise.com/cdn/shop/files/Artboard_12.webp?v=1738306745' },
  { id: 4, url: 'https://cdn.shopify.com/s/files/1/0997/6284/files/Artboard_10.webp?v=1738306745' },
  { id: 5, url: 'https://www.gonoise.com/cdn/shop/files/Artboard_9.webp?v=1738306745' },
];
const VerticalImageSlider = () => {
    const scrollViewRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
  
    // Track the current slide by listening to ScrollView's onScroll
    const onScroll = (e) => {
      const yOffset = e.nativeEvent.contentOffset.y;
      const newIndex = Math.round(yOffset / containerHeight); // Adjust scroll based on 200px height
      setCurrentIndex(newIndex);
    };
  
    // Allow tapping a rectangle strip to jump to that slide
    const scrollToIndex = (index) => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({
          x: 0,
          y: index * containerHeight, // Adjust scroll offset accordingly
          animated: true,
        });
      }
    };
  
    return (
      <View style={styles.container}>
        {/* Fixed-size container wrapping the ScrollView */}
        <View style={styles.scrollContainer}>
          <ScrollView
            ref={scrollViewRef}
            pagingEnabled
            showsVerticalScrollIndicator={false}
            onScroll={onScroll}
            scrollEventThrottle={16} // ~60fps
          >
            {images.map((item, index) => (
              <View key={item.id} style={[styles.slide]}>
                <Image source={{ uri: item.url }} style={styles.image} />
              </View>
            ))}
          </ScrollView>
        </View>
  
        {/* Pagination strips on the right side */}
        <View style={styles.paginationContainer}>
          {images.map((_, index) => {
            const isActive = index === currentIndex;
            return (
              <TouchableOpacity
                key={index}
                onPress={() => scrollToIndex(index)}
                activeOpacity={0.7}
              >
                <View style={[styles.strip, isActive && styles.activeStrip]} />
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  };
  
  export default VerticalImageSlider;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#eee',
    },
    scrollContainer: {
      width: containerWidth,
      height: containerHeight,
      overflow: 'hidden', // Prevent overflow outside the container
      backgroundColor: '#eee', // Match the background color
    },
    slide: {
      width: containerWidth,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#eee',
    },
    image: {
      width: containerWidth,  // Set image width to fit the container
      height: containerHeight, // Set image height to fit the container
      resizeMode: 'cover', // Ensure the image covers the container properly
    },
    paginationContainer: {
      position: 'absolute',
      right: 10,
      top: containerHeight / 2 - 50, // Align the pagination in the vertical center
      justifyContent: 'center',
      alignItems: 'center',
    },
    strip: {
      width: 2, // Narrow width for a thin strip
      height: 4, // Set the height of the strip
      backgroundColor: '#999',
      marginVertical: 10,
 // Optional for rounded corners
    },
    activeStrip: {
      backgroundColor: '#000',
      height: 20, 
    },
  });