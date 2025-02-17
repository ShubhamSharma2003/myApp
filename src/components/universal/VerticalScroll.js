import React, { useState, useRef } from 'react';
import { View, ScrollView, Image, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';

// Fixed dimensions for the image slider
const containerHeight = 480;
const containerWidth = Dimensions.get('window').width; // Or use a fixed width if preferred

// Example images – replace with your product images
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

  // Update current index based on scroll offset
  const onScroll = (e) => {
    const yOffset = e.nativeEvent.contentOffset.y;
    const newIndex = Math.round(yOffset / containerHeight);
    setCurrentIndex(newIndex);
  };

  // Allow tapping a strip to scroll to a specific image
  const scrollToIndex = (index) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: 0,
        y: index * containerHeight,
        animated: true,
      });
    }
  };

  return (
    <View style={styles.container}>
      {/* The vertical slider */}
      <View style={styles.scrollContainer}>
        <ScrollView
          ref={scrollViewRef}
          pagingEnabled
          nestedScrollEnabled={true} // Enable nested scrolling here
          showsVerticalScrollIndicator={false}
          onScroll={onScroll}
          scrollEventThrottle={16}
        >
          {images.map((item) => (
            <View key={item.id} style={styles.slide}>
              <Image source={{ uri: item.url }} style={styles.image} />
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Pagination strips */}
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
  },
  scrollContainer: {
    width: containerWidth,
    height: containerHeight,
    overflow: 'hidden',

  },
  slide: {
    width: containerWidth,
    height: containerHeight,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
  },
  image: {
    width: 400,
    height: 400,
    resizeMode: 'cover',
  },
  paginationContainer: {
    position: 'absolute',
    right: 10,
    top: containerHeight / 2 - 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  strip: {
    width: 2,
    height: 4,
    backgroundColor: '#999',
    marginVertical: 10,
  },
  activeStrip: {
    backgroundColor: '#000',
    height: 20,
  },
});
