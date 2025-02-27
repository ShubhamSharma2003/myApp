import React from "react";
import { ScrollView, TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

const FilterScroll = ({ filters = [], onSelect }) => {
  const navigation = useNavigation();
  const route = useRoute();

  // Get active filters from route params (if any)
  const selectedVariants = route.params?.selectedVariants || [];
  const priceRange = route.params?.priceRange || null;
  const sortBy = route.params?.sortBy || "";

  // Sort Labels Mapping
  const sortLabels = {
    lowToHigh: "Price: Low to High",
    highToLow: "Price: High to Low",
  };

  // Merge selected variants into filters to ensure they are displayed
  const allFilters = [...new Set([...filters, ...selectedVariants])];

  return (
    <View style={styles.container}>
      {/* Filter Icon */}
      <TouchableOpacity 
        style={styles.filterIcon} 
        onPress={() => navigation.navigate("FilterScreen", { selectedVariants, priceRange, sortBy })} 
      >
        <Ionicons name="options-outline" size={24} color="black" />
      </TouchableOpacity>

      {/* Scrollable Filter Buttons */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
        {/* Variant Filters */}
        {allFilters.map((filter, index) => (
          <TouchableOpacity 
            key={index} 
            style={[styles.filterButton, selectedVariants.includes(filter) && styles.activeFilter]} 
            onPress={() => {
              // Navigate to FilterScreen when an active filter is pressed
              if (selectedVariants.includes(filter)) {
                navigation.navigate("FilterScreen", { selectedVariants, priceRange, sortBy });
              } else {
                onSelect(filter);
              }
            }}
          >
            <Text style={[styles.filterText, selectedVariants.includes(filter) && styles.activeFilterText]}>
              {filter}
            </Text>
          </TouchableOpacity>
        ))}

        {/* Sorting Filters */}
        {sortBy && (
          <TouchableOpacity 
            style={[styles.filterButton, styles.activeFilter]} 
            onPress={() => navigation.navigate("FilterScreen", { selectedVariants, priceRange, sortBy })} // Navigate to filter screen
          >
            <Text style={[styles.filterText, styles.activeFilterText]}>
              {sortLabels[sortBy]}
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 50,
    paddingHorizontal: 10,
  },
  filterIcon: {
    padding: 10,
    marginRight: 5,
  },
  scrollContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  filterButton: {
    borderWidth: 0.9,
    borderColor: "gray",
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  activeFilter: {
    backgroundColor: "black",
  },
  filterText: {
    fontSize: 10,
    color: "gray",
  },
  activeFilterText: {
    color: "white",
  },
});

export default FilterScroll;
