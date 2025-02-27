import React, { useEffect, useState } from "react";
import { ScrollView, TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { fetchProducts } from "../../../api/shopifyApi";

const FilterScroll = ({ filters = [], onSelect = () => {} }) => {
  const navigation = useNavigation();
  const route = useRoute();
  const [extractedTags, setExtractedTags] = useState([]); 
  const [allProducts, setAllProducts] = useState([]); 
  const [activeTag, setActiveTag] = useState(null); 

  // Get active filters from route params (if any)
  const selectedVariants = route.params?.selectedVariants || [];
  const priceRange = route.params?.priceRange || null;
  const sortBy = route.params?.sortBy || "";

  // ✅ Sort Labels Mapping
  const sortLabels = {
    lowToHigh: "Price: Low to High",
    highToLow: "Price: High to Low",
  };

  // ✅ Mapping extracted tags to user-friendly text
  const tagLabelMap = {
    "bestsellers-gadgets": "Best Sellers",
    "female health monitor": "Female Health Monitor",
  };

  // ✅ Fetch product data and extract `extractedTags`
  useEffect(() => {
    const getFilters = async () => {
      const products = await fetchProducts();
      if (!products) return;

      console.log("🛍 Products Fetched:", products.length);
      setAllProducts(products);

      // ✅ Extract unique filterTags from all products
      const uniqueTags = [
        ...new Set(products.flatMap(product => (product.filterTags ? product.filterTags : [])))
      ];
      setExtractedTags(uniqueTags);

      console.log("✅ Extracted Filter Tags:", uniqueTags);
    };

    getFilters();
  }, []);

  // ✅ Handle tag selection (toggle active state)
  const handleTagSelect = (tag) => {
    console.log("🔍 Selected Tag:", tag);

    if (typeof onSelect !== "function") {
      console.error("❌ onSelect is not a valid function");
      return;
    }

    if (activeTag === tag) {
      setActiveTag(null);
      onSelect(allProducts);
      return;
    }

    setActiveTag(tag); // ✅ Set selected tag as active

    const filteredProducts = allProducts.filter(product => product.filterTags.includes(tag));

    console.log("✅ Filtered Products:", filteredProducts.length);
    onSelect(filteredProducts);
  };

  // ✅ Merge all filters (from props + extractedTags + selectedVariants)
  const allFilters = [...new Set([...filters, ...extractedTags, ...selectedVariants])];

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
        {allFilters.map((filter, index) => {
          const displayText = tagLabelMap[filter] || filter; // ✅ Show mapped name if available, else show original tag

          return (
            <TouchableOpacity 
              key={index} 
              style={[
                styles.filterButton, 
                (activeTag === filter || selectedVariants.includes(filter)) && styles.activeFilter 
              ]} 
              onPress={() => handleTagSelect(filter)}
            >
              <Text style={[
                styles.filterText, 
                (activeTag === filter || selectedVariants.includes(filter)) && styles.activeFilterText 
              ]}>
                {displayText}
              </Text>
            </TouchableOpacity>
          );
        })}

        {/* Sorting Filters */}
        {sortBy && (
          <TouchableOpacity 
            style={[styles.filterButton, styles.activeFilter]} 
            onPress={() => navigation.navigate("FilterScreen", { selectedVariants, priceRange, sortBy })}
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
    fontSize: 12,
    color: "gray",
  },
  activeFilterText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default FilterScroll;
