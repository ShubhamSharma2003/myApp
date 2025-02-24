import React, { useState, useRef, useEffect } from 'react';
import { View, ScrollView, Image, Dimensions, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';

const containerHeight = 480;
const containerWidth = Dimensions.get('window').width;

const VerticalImageSlider = ({ images = [], selectedVariant }) => {
  const scrollViewRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadingImages, setLoadingImages] = useState(images.map(() => true));

  const formattedImages = images?.map((item, index) => ({
    id: index.toString(),
    url: item.url || 'https://via.placeholder.com/400',
  }));

  useEffect(() => {
    setCurrentIndex(0);
    setLoadingImages(images.map(() => true)); // Reset loading state on variant change
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: 0,
        y: 0,
        animated: true,
      });
    }
  }, [selectedVariant]);

  const onScroll = (e) => {
    const yOffset = e.nativeEvent.contentOffset.y;
    const newIndex = Math.round(yOffset / containerHeight);
    setCurrentIndex(newIndex);
  };

  const scrollToIndex = (index) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: 0,
        y: index * containerHeight,
        animated: true,
      });
    }
  };

  const handleImageLoad = (index) => {
    setLoadingImages((prev) => {
      const newLoading = [...prev];
      newLoading[index] = false;
      return newLoading;
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.scrollContainer}>
        <ScrollView
          ref={scrollViewRef}
          pagingEnabled
          nestedScrollEnabled
          showsVerticalScrollIndicator={false}
          onScroll={onScroll}
          scrollEventThrottle={16}
        >
          {formattedImages.map((item, index) => (
            <View key={item.id} style={styles.slide}>
              {loadingImages[index] && (
                <View style={styles.placeholder}>
                  <ActivityIndicator size="large" color="#999" />
                </View>
              )}
              <Image
                source={{ uri: item.url }}
                style={[styles.image, loadingImages[index] && { opacity: 0 }]}
                onLoad={() => handleImageLoad(index)}
              />
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={styles.paginationContainer}>
        {formattedImages.map((_, index) => (
          <TouchableOpacity key={index} onPress={() => scrollToIndex(index)} activeOpacity={0.7}>
            <View style={[styles.strip, index === currentIndex && styles.activeStrip]} />
          </TouchableOpacity>
        ))}
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
    backgroundColor: '#eaf0f0',
  },
  image: {
    width: 400,
    height: 400,
    resizeMode: 'cover',
  },
  placeholder: {
    position: 'absolute',
    width: 400,
    height: 400,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ddd',
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
