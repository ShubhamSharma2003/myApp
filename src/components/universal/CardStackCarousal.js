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
import { EvilIcons } from '@expo/vector-icons';

const DATA = [
  {
    title: 'Noise Master Buds',
    location: 'Sound by bose',
    poster:
      'https://cdn.shopify.com/s/files/1/0997/6284/files/Slice_10Master_buds_D.webp?v=1739372267',
  },
  {
    title: 'Sound By BOSE',
    location: 'Out of the World Sound',
    poster:
      'https://cdn.shopify.com/s/files/1/0997/6284/files/Slice_9Master_buds_M.webp?v=1739372267',
  },
  {
    title: 'Made for Everyone',
    location: 'Rugged and Strong',
    poster:
      'https://cdn.shopify.com/s/files/1/0997/6284/files/14_0b91786b-3c78-4287-bc3a-9f6740edb912.webp?v=1738511548',
  },
  {
    title: 'All weather Proof',
    location: 'Realtime Tracking',
    poster:
      'https://cdn.shopify.com/s/files/1/0997/6284/files/Cadet_UI_Mobile_09.jpg?v=1738242039',
  },
  {
    title: 'DIVA by NOISE',
    location: 'Beautiful & Eligant',
    poster:
      'https://cdn.shopify.com/s/files/1/0997/6284/files/shine_by_noise_phone.png?v=1738316567',
  },
  {
    title: '24HR Connectivity',
    location: 'Long lasting battery',
    poster:
      'https://cdn.shopify.com/s/files/1/0997/6284/files/1_392315a4-3f47-4b34-b2fb-c81a8c80885d.png?v=1738242524',
  },
];

const OVERFLOW_HEIGHT = 70;
const SPACING = 10;
const VISIBLE_ITEMS = 3;
const ITEM_WIDTH = width * 0.8;
const ITEM_HEIGHT = ITEM_WIDTH * 1.7;

const OverflowItems = ({ scrollX, data }) => {
  const translateY = scrollX.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [OVERFLOW_HEIGHT, 0, -OVERFLOW_HEIGHT],
  });
  return (
    <View style={{ height: OVERFLOW_HEIGHT, overflow: 'hidden' }}>
      <Animated.View style={{ transform: [{ translateY }] }}>
        {data.map((item, index) => {
          return (
            <Animated.View key={index} style={styles.itemContainer}>
              <Text style={[styles.title]} numberOfLines={1}>
                {item.title}
              </Text>
              <View style={styles.itemContainerRow}>
                <Text style={[styles.location]}>
                  {/* <EvilIcons
                    name='location'
                    size={16}
                    color='black'
                    style={{ marginRight: 5 }}
                  /> */}
                  {item.location}
                </Text>
              </View>
            </Animated.View>
          );
        })}
      </Animated.View>
    </View>
  );
};

export default function CardStackCarousal() {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const scrollXAnimated = React.useRef(new Animated.Value(0)).current;
  const [index, setIndex] = React.useState(0);
  const [data, setData] = React.useState(DATA);

  const setAnimatedIndex = React.useCallback((i) => {
    setIndex(i);
    scrollX.setValue(i);
  }, []);

  // interconnected animations aka reactive animations :D
  React.useEffect(() => {
    Animated.spring(scrollXAnimated, {
      toValue: scrollX,
      useNativeDriver: true,
    }).start();
  });

  // React.useEffect(() => {
  //   if (index === data.length - VISIBLE_ITEMS - 2) {
  //     console.log('fetch more')
  //     const newData = [...data, ...data];

  //     setData(newData);
  //   }
  // }, [index]);

  return (
    <FlingGestureHandler
      direction={Directions.LEFT}
      onHandlerStateChange={(e) => {
        if (e.nativeEvent.state === State.END) {
          if (index === data.length - 1) {
            // setAnimatedIndex(0)
            return;
          }
          setAnimatedIndex(index + 1);
        }
      }}
    >
      <FlingGestureHandler
        direction={Directions.RIGHT}
        onHandlerStateChange={(e) => {
          if (e.nativeEvent.state === State.END) {
            if (index === 0) {
              // setAnimatedIndex(data.length - 1)
              return;
            }
            setAnimatedIndex(index - 1);
          }
        }}
      >
        <SafeAreaView style={styles.container}>
          <StatusBar hidden />
          <OverflowItems scrollX={scrollXAnimated} data={data} />
          <FlatList
            data={data}
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

                // I want each item to have a higher zIndex than the previous one,
                // in reversed order due to the FlatList being inverted
                { zIndex: data.length - index },
              ];

              // OverflowableView for Android...
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
    padding:20,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
    // height: 100,p
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: -1,
  },
  location: {
    fontSize: 16,
  },
  date: {
    fontSize: 12,
  },
  itemContainer: {
    height: OVERFLOW_HEIGHT,
    padding: SPACING,
  },
  itemContainerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
