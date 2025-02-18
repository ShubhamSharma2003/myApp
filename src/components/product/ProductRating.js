import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const ReviewRatings = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>RATINGS & REVIEWS</Text>

      <View style={styles.mainStats}>
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>4.7</Text>
          <View style={styles.stars}>
            {[...Array(5)].map((_, i) => (
              <FontAwesome key={i} name="star" size={15} color="black" />
            ))}
          </View>
          <Text style={styles.reviewCount}>614 REVIEWS</Text>
        </View>
        <View style={styles.recommendationContainer}>
          <Text style={styles.recommendation}>94%</Text>
          <Text style={styles.subText}>of customers {"\n"}recommend this product</Text>

        </View>
      </View>

      <RatingBlock label="SIZE" leftLabel="Too small" rightLabel="Too large" position={0.5} />
      <RatingBlock label="WIDTH" leftLabel="Too narrow" rightLabel="Too wide" position={0.2} />
      <RatingBar label="COMFORT" leftLabel="Uncomfortable" rightLabel="Comfortable" progress={0.8} />
      <RatingBar label="QUALITY" leftLabel="Poor" rightLabel="Perfect" progress={0.95} />
    </View>
  );
};

const RatingBlock = ({ label, leftLabel, rightLabel, position }) => {
  return (
    <View style={styles.ratingBlockContainer}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.barContainer}>
        <View style={[styles.block, { left: `${position * 100}%` }]} />
      </View>
      <View style={styles.barLabels}>
        <Text>{leftLabel}</Text>
        <Text>{rightLabel}</Text>
      </View>
    </View>
  );
};

const RatingBar = ({ label, leftLabel, rightLabel, progress }) => {
  return (
    <View style={styles.ratingBarContainer}>
      <Text style={styles.label}>{label}</Text>
      <View style={ratingBarStyles.bar}>
        <View style={[ratingBarStyles.progress, { width: `${progress * 100}%` }]} />
      </View>
      <View style={styles.barLabels}>
        <Text>{leftLabel}</Text>
        <Text>{rightLabel}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "white",
  },
  header: {
    fontSize: 23,
    fontWeight: "bold",

  },
  mainStats: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ratingContainer: {
    alignItems: "center",
  },
  rating: {
    paddingTop:20,
    fontSize: 50,
  },
  stars: {
    gap: 2,
    flexDirection: "row",
    marginVertical: 8,
  },
  reviewCount: {
    // paddingTop: 20,
    textDecorationLine: "underline",
  },
  recommendationContainer: {
    alignItems: "center",
  },
  recommendation: {
    fontSize: 50,
  },
  subText: {
    fontSize: 13,
    textAlign: "center",
  },
  ratingBlockContainer: {
    marginTop: 10,
    paddingBottom:10,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  barContainer: {
    height: 1,
    backgroundColor: "#ccc",
    position: "relative",
  },
  block: {
    width: 60,
    height: 4,
    backgroundColor: "black",
    position: "absolute",
  },
  barLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  ratingBarContainer: {
    marginTop: 10,
    marginBottom: 10, 
  },
});

const ratingBarStyles = StyleSheet.create({
  barLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  bar: {
    height: 4,
    backgroundColor: "#ccc",
    overflow: "hidden",
  },
  progress: {
    height: "100%",
    backgroundColor: "black",
  },
});


export default ReviewRatings;
