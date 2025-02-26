import React, { useState, useEffect } from "react";
import { ScrollView, TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const FilterScroll = ({ filters = [], onSelect }) => {
  const navigation = useNavigation(); // Access navigation

  return (
    <View style={styles.container}>
      {/* Filter Icon */}
      <TouchableOpacity style={styles.filterIcon} onPress={() => navigation.navigate("FilterScreen")}>
        <Ionicons name="options-outline" size={24} color="black" />
      </TouchableOpacity>

      {/* Scrollable Filter Buttons */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
        {filters.map((filter, index) => (
          <TouchableOpacity key={index} style={styles.filterButton} onPress={() => onSelect(filter)}>
            <Text style={styles.filterText}>{filter}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};


// Example usage of the component
const FilterScreen = () => {
  const [filters, setFilters] = useState([]);

  // Simulating API call to fetch filters
  useEffect(() => {
    setTimeout(() => {
      setFilters(["BESTSELLERS", "NEW LAUNCH", "THE NOISE CHOICE", "CURATED STEALS"]);
    }, 1000);
  }, []);

  const handleFilterSelect = (filter) => {
    console.log("Selected Filter:", filter);
  };

  return <FilterScroll filters={filters} onSelect={handleFilterSelect} />;
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
  filterText: {
    fontSize: 10,
    color: "gray",
  },
});

export default FilterScreen;
