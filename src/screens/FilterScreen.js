import React, { useState, useRef } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';

const FilterScreen = ({ navigation }) => {
    const [sortOption, setSortOption] = useState('lowToHigh');
    const [discounts, setDiscounts] = useState([]);
    const [priceRange, setPriceRange] = useState(5000);
    const [displayType, setDisplayType] = useState([]);
    const [dialShape, setDialShape] = useState([]);
    const [colors, setColors] = useState([]);
    const [preferredFeatures, setPreferredFeatures] = useState([]);

    const priceRef = useRef(priceRange); 

    // Toggle Selection Logic for Chips
    const toggleSelection = (item, list, setList) => {
        setList(list.includes(item) ? list.filter(i => i !== item) : [...list, item]);
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
                    <Ionicons name="close-outline" size={28} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Filters</Text>
                <TouchableOpacity onPress={() => {
                    setSortOption("lowToHigh");
                    setDiscounts([]);
                    setPriceRange(5000);
                    setDisplayType([]);
                    setDialShape([]);
                    setColors([]);
                    setPreferredFeatures([]);
                }}>
                    <Text style={styles.clearText}>Clear All</Text>
                </TouchableOpacity>
            </View>

            {/* Scrollable Filter Options */}
            <ScrollView style={styles.scrollContainer}>
                <Text style={styles.heading}>Sort by</Text>
                {['lowToHigh', 'highToLow', 'newest', 'topSellers'].map((option, index) => (
                    <TouchableOpacity key={index} style={styles.radioOption} onPress={() => setSortOption(option)}>
                        <Ionicons name={sortOption === option ? "radio-button-on" : "radio-button-off"} size={20} color="black" />
                        <Text style={styles.radioText}>
                            {option === 'lowToHigh' ? 'Price (Low to High)' :
                                option === 'highToLow' ? 'Price (High to Low)' :
                                    option === 'newest' ? 'Newest First' : 'Top Sellers'}
                        </Text>
                    </TouchableOpacity>
                ))}

                {/* <Text style={styles.heading}>Discount</Text>
                <View style={styles.chipContainer}>
                    {['Up to 20%', '20-30%', '30-40%', '40% or More'].map((discount, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[styles.chip, discounts.includes(discount) && styles.chipSelected]}
                            onPress={() => toggleSelection(discount, discounts, setDiscounts)}
                        >
                            <Text style={[styles.chipText, discounts.includes(discount) && styles.chipTextSelected]}>{discount}</Text>
                        </TouchableOpacity>
                    ))}
                </View> */}

                <Text style={styles.heading}>Price Range</Text>
                <Slider
                    style={styles.slider}
                    minimumValue={1000}
                    maximumValue={10000}
                    step={500}
                    value={priceRange}
                    onValueChange={(value) => (priceRef.current = value)} // Updates ref while sliding
                    onSlidingComplete={() => setPriceRange(priceRef.current)} // Updates state after sliding stops
                />
                <Text style={styles.sliderText}>Up to ₹{priceRange}</Text>

                {/* <Text style={styles.heading}>Display Type</Text>
                <View style={styles.chipContainer}>
                    {['AMOLED', 'LCD'].map((type, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[styles.chip, displayType.includes(type) && styles.chipSelected]}
                            onPress={() => toggleSelection(type, displayType, setDisplayType)}
                        >
                            <Text style={[styles.chipText, displayType.includes(type) && styles.chipTextSelected]}>{type}</Text>
                        </TouchableOpacity>
                    ))}
                </View> */}

                {/* <Text style={styles.heading}>Dial Shape</Text>
                <View style={styles.chipContainer}>
                    {['Round', 'Square'].map((shape, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[styles.chip, dialShape.includes(shape) && styles.chipSelected]}
                            onPress={() => toggleSelection(shape, dialShape, setDialShape)}
                        >
                            <Text style={[styles.chipText, dialShape.includes(shape) && styles.chipTextSelected]}>{shape}</Text>
                        </TouchableOpacity>
                    ))}
                </View> */}

                <Text style={styles.heading}>Colors</Text>
                <View style={styles.chipContainer}>
                    {['Black', 'Silver', 'Gold', 'Blue'].map((color, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[styles.chip, colors.includes(color) && styles.chipSelected]}
                            onPress={() => toggleSelection(color, colors, setColors)}
                        >
                            <Text style={[styles.chipText, colors.includes(color) && styles.chipTextSelected]}>{color}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>

            {/* Apply Button */}
            <TouchableOpacity style={styles.applyButton} onPress={() => navigation.goBack()}>
                <Text style={styles.applyButtonText}>Apply Filters</Text>
            </TouchableOpacity>
        </View>
    );
};

// Styles
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    headerTitle: { fontSize: 16, fontWeight: "bold" },
    clearText: { fontSize: 14, color: "#000" },
    scrollContainer: { padding: 15 },
    heading: { fontSize: 14, fontWeight: "bold" },
    radioOption: { flexDirection: "row", alignItems: "center", marginVertical: 5 },
    radioText: { marginLeft: 8, fontSize: 14 },
    chipContainer: { flexDirection: "row", flexWrap: "wrap", marginVertical: 10 },
    chip: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: "#ccc",
        margin: 4,
    },
    chipSelected: { backgroundColor: "black" },
    chipText: { color: "black" },
    chipTextSelected: { color: "white" },
    slider: { width: "100%", height: 40 },
    sliderText: { textAlign: "center", marginBottom: 10,  },
    applyButton: {  position: 'absolute', 
        bottom: 0, 
        left: 20,
        right: 20,
        marginBottom:10,
        backgroundColor: 'black',
        padding: 15,
        alignItems: 'center', },
    applyButtonText: { color: "white", fontSize: 16, fontWeight: "bold" },
});

export default FilterScreen;
