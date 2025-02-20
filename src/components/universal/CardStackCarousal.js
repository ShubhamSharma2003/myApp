import * as React from 'react';
import {
  StatusBar,
  Image,
  FlatList,
  Dimensions,
  Animated,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {
  State,
  FlingGestureHandler,
  Directions,
} from 'react-native-gesture-handler';

const { width } = Dimensions.get('screen');
const OVERFLOW_HEIGHT = 70;
const SPACING = 10;
const VISIBLE_ITEMS = 3;
const ITEM_WIDTH = width * 0.8;
const ITEM_HEIGHT = ITEM_WIDTH * 1.5;

const DATA = [
  {
    title: 'Noise Master Buds',
    location: 'Sound by Bose',
    poster:
      'https://cdn.shopify.com/s/files/1/0997/6284/files/Slice_10Master_buds_D.webp?v=1739372267',
  },
  {
    title: 'Sound By BOSE',
    location: 'Out of the World Sound',
    poster:
      'https://www.gonoise.com/cdn/shop/files/Slice_2_pro6max_M.webp?v=1737567340',
  },
  {
    title: 'All Weather Proof',
    location: 'Realtime Tracking',
    poster:
      'https://www.gonoise.com/cdn/shop/files/Slice_17_pro6max_M.webp?v=1737567341',
  },
  {
    title: 'DIVA by NOISE',
    location: 'Beautiful & Elegant',
    poster:
      'https://www.gonoise.com/cdn/shop/files/Slice_11_pro6max_M.webp?v=1737567341',
  },
  {
    title: '24HR Connectivity',
    location: 'Long-lasting battery',
    poster:
      'https://cdn.shopify.com/s/files/1/0997/6284/files/Slice_3_1.png?v=1739870104',
  },
];

const OverflowItems = ({ scrollX, data }) => {
  const translateY = scrollX.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [OVERFLOW_HEIGHT, 0, -OVERFLOW_HEIGHT],
  });

  return (
    <View style={{ height: OVERFLOW_HEIGHT, overflow: 'hidden' }}>
      <Animated.View style={{ transform: [{ translateY }] }}>
        {data.map((item, index) => (
          <Animated.View key={index} style={styles.itemContainer}>
            <Text style={styles.title} numberOfLines={1}>
              {item.title}
            </Text>
            <View style={styles.itemContainerRow}>
              <Text style={styles.location}>{item.location}</Text>
            </View>
          </Animated.View>
        ))}
      </Animated.View>
    </View>
  );
};

export default function CardStackCarousal() {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const scrollXAnimated = React.useRef(new Animated.Value(0)).current;
  const [index, setIndex] = React.useState(0);

  const setAnimatedIndex = React.useCallback(
    (i) => {
      const newIndex = (i + DATA.length) % DATA.length; // Loop logic
      setIndex(newIndex);
      scrollX.setValue(newIndex);
    },
    [scrollX]
  );

  React.useEffect(() => {
    Animated.spring(scrollXAnimated, {
      toValue: scrollX,
      useNativeDriver: true,
    }).start();
  });

  return (
    <FlingGestureHandler
      direction={Directions.LEFT}
      onHandlerStateChange={(e) => {
        if (e.nativeEvent.state === State.END) {
          setAnimatedIndex(index + 1);
        }
      }}
    >
      <FlingGestureHandler
        direction={Directions.RIGHT}
        onHandlerStateChange={(e) => {
          if (e.nativeEvent.state === State.END) {
            setAnimatedIndex(index - 1);
          }
        }}
      >
        <SafeAreaView style={styles.container}>
          <StatusBar hidden />
          <OverflowItems scrollX={scrollXAnimated} data={DATA} />
          <FlatList
            data={DATA}
            keyExtractor={(_, index) => String(index)}
            scrollEnabled={false}
            inverted
            renderToHardwareTextureAndroid
            removeClippedSubviews={false}
            contentContainerStyle={{
              flex: 1,
              justifyContent: 'center',
              padding: SPACING * 2,
            }}
            CellRendererComponent={({ children, index, style, ...props }) => {
              const cellStyle = [
                style,
                { zIndex: DATA.length - index },
              ];
              return (
                <View style={cellStyle} index={index} {...props}>
                  {children}
                </View>
              );
            }}
            renderItem={({ item, index }) => {
              const inputRange = [index - 1, index, index + 1];
              const translateX = scrollXAnimated.interpolate({
                inputRange,
                outputRange: [50, 0, -100],
              });
              const opacity = scrollXAnimated.interpolate({
                inputRange,
                outputRange: [1 - 1 / VISIBLE_ITEMS, 1, 0],
              });
              const scale = scrollXAnimated.interpolate({
                inputRange,
                outputRange: [0.8, 1, 1.3],
              });

              return (
                <Animated.View
                  style={{
                    position: 'absolute',
                    width: ITEM_WIDTH,
                    top: -ITEM_HEIGHT / 2,
                    borderRadius: 10,
                    overflow: 'hidden',
                    transform: [{ translateX }, { scale }],
                    opacity,
                  }}
                >
                  <Image
                    source={{ uri: item.poster }}
                    style={{ width: ITEM_WIDTH, height: ITEM_HEIGHT }}
                  />
                </Animated.View>
              );
            }}
          />
        </SafeAreaView>
      </FlingGestureHandler>
    </FlingGestureHandler>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: -1,
    paddingLeft: 10,
  },
  location: {
    fontSize: 16,
    paddingLeft: 10,
  },
  itemContainer: {
    height: OVERFLOW_HEIGHT,
    padding: SPACING,
  },
  itemContainerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 20,
    alignItems: 'center',
  },
});
