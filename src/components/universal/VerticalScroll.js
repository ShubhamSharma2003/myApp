import React, { useState, useRef } from 'react';
import { View, ScrollView, Image, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';

const containerHeight = 480;
const containerWidth = Dimensions.get('window').width;


const VerticalImageSlider = ({ images = [] }) => {
  const scrollViewRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

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
          {images.map((item) => (
            <View key={item.id} style={styles.slide}>
              <Image source={{ uri: item.url }} style={styles.image} />
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={styles.paginationContainer}>
        {images.map((_, index) => (
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
