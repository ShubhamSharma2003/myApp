import React, { useState } from "react";
import { ScrollView, TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

const FilterScroll = ({ filters = [], onSelect = () => {} }) => {
  const navigation = useNavigation();
  const route = useRoute();
  const [activeFilter, setActiveFilter] = useState(null);
  const [selectedTags, setSelectedTags] = useState(route.params?.selectedTags || []);
  const extractedTags = route.params?.tags || [];

  const selectedVariants = route.params?.selectedVariants || [];
  const priceRange = route.params?.priceRange || null;
  const sortBy = route.params?.sortBy || "";

  const sortLabels = {
    lowToHigh: "Price: Low to High",
    highToLow: "Price: High to Low",
  };

  const handleTagSelect = (tag) => {
    // Always navigate to the filter screen when clicking an active filter
    if (selectedVariants.includes(tag) || selectedTags.includes(tag) || sortBy === tag) {
        navigation.navigate("FilterScreen", { selectedVariants, selectedTags, priceRange, sortBy });
        return;
    }

    // Open filter screen for "Filter by Tags" or "Color Variants"
    if (tag === "Filter by Tags" || tag === "Color Variants") {
        navigation.navigate("FilterScreen", { selectedVariants, selectedTags, priceRange, sortBy });
        return;
    }


    const updatedTags = selectedTags.includes(tag)
        ? selectedTags.filter((t) => t !== tag)
        : [...selectedTags, tag];

    setSelectedTags(updatedTags);
    onSelect(updatedTags);
};


  // Merge all filters and add placeholder if no tags are selected
  const allFilters = [...new Set([...filters, ...selectedVariants, ...selectedTags])];

  // Placeholder if no tags are selected
  const displayFilters = allFilters.length > 0 ? allFilters : ["Filter by Tags", "Color Variants"];

  return (
    <View style={styles.container}>
      {/* Filter Icon */}
      <TouchableOpacity 
        style={styles.filterIcon} 
        onPress={() => navigation.navigate("FilterScreen", { selectedVariants, selectedTags, priceRange, sortBy })} 
      >
        <Ionicons name="options-outline" size={24} color="black" />
      </TouchableOpacity>

      {/* Scrollable Filter Buttons */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
        {displayFilters.map((filter, index) => (
          <TouchableOpacity 
            key={index} 
            style={[
              styles.filterButton, 
              (activeFilter === filter || selectedVariants.includes(filter) || selectedTags.includes(filter)) && styles.activeFilter
            ]} 
            onPress={() => handleTagSelect(filter)}
          >
            <Text style={[
              styles.filterText, 
              (activeFilter === filter || selectedVariants.includes(filter) || selectedTags.includes(filter)) && styles.activeFilterText
            ]}>
              {filter}
            </Text>
          </TouchableOpacity>
        ))}

        {/* Sorting Filters */}
        {sortBy && (
          <TouchableOpacity 
            style={[styles.filterButton, styles.activeFilter]} 
            onPress={() => navigation.navigate("FilterScreen", { selectedVariants, selectedTags, priceRange, sortBy })}
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
    marginTop: 50,
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
    fontSize: 12,
    color: "gray",
  },
  activeFilterText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default FilterScroll;
