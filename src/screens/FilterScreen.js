import React, { useState, useEffect, useRef } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { fetchProducts } from '../../api/shopifyApi';

const FilterScreen = ({ navigation, route }) => {
    const [variantTitles, setVariantTitles] = useState([]);
    const [selectedVariants, setSelectedVariants] = useState(route.params?.selectedVariants || []);
    const [minPrice, setMinPrice] = useState(1000);
    const [maxPrice, setMaxPrice] = useState(10000);
    const [priceRange, setPriceRange] = useState(route.params?.priceRange || 10000);
    const [sortBy, setSortBy] = useState(route.params?.sortBy || '');
    const [tags, setTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState(route.params?.selectedTags || []);
    const priceRef = useRef(priceRange);

    useEffect(() => {
        const getFilters = async () => {
            const products = await fetchProducts();
            if (!products) return;

            let variants = new Set();
            let prices = [];
            let uniqueTags = new Set();

            products.forEach(product => {
                product.variants.forEach(variant => {
                    variants.add(variant.title);
                    if (variant.price) prices.push(parseFloat(variant.price));
                });
                if (product.filterTags) {
                    product.filterTags.forEach(tag => uniqueTags.add(tag));
                }
            });

            if (prices.length > 0) {
                setMinPrice(Math.min(...prices));
                setMaxPrice(Math.max(...prices));

                if (!route.params?.priceRange) {
                    setPriceRange(Math.max(...prices));
                }
            }

            setVariantTitles([...variants]);
            setTags([...uniqueTags]);
        };

        getFilters();
    }, []);

    const toggleSelection = (item, setSelected) => {
        setSelected(prev =>
            prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
        );
    };

    const handleSortSelection = (sortOption) => {
        setSortBy(prevSortBy => (prevSortBy === sortOption ? '' : sortOption));
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
                        <Ionicons name="close-outline" size={28} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Filters</Text>
                    <TouchableOpacity onPress={() => {
                        setSelectedVariants([]);
                        setSelectedTags([]);
                        setPriceRange(maxPrice);
                        setSortBy('');
                    }}>
                        <Text style={styles.clearText}>Clear All</Text>
                    </TouchableOpacity>
                </View>

                {/* Scrollable Filters */}
                <ScrollView style={styles.scrollContainer}>
                    {/* Sort By Feature */}
                    <Text style={styles.sortHeading}>Sort By</Text>
                    <View style={styles.sortContainer}>
                        <TouchableOpacity
                            style={[styles.sortOption, sortBy === 'lowToHigh' && styles.sortOptionSelected]}
                            onPress={() => handleSortSelection('lowToHigh')}
                        >
                            <Text style={[styles.sortText, sortBy === 'lowToHigh' && styles.sortTextSelected]}>
                                Price: Low to High
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.sortOption, sortBy === 'highToLow' && styles.sortOptionSelected]}
                            onPress={() => handleSortSelection('highToLow')}
                        >
                            <Text style={[styles.sortText, sortBy === 'highToLow' && styles.sortTextSelected]}>
                                Price: High to Low
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* Price Filter */}
                    <Text style={styles.heading}>Price Range</Text>
                    <Slider
                        style={styles.slider}
                        minimumValue={minPrice}
                        maximumValue={10000}
                        step={500}
                        value={priceRange}
                        onValueChange={(value) => (priceRef.current = value)}
                        onSlidingComplete={() => setPriceRange(priceRef.current)}
                        minimumTrackTintColor="black"
                        maximumTrackTintColor="#ccc"
                        thumbTintColor="black"
                    />
                    <Text style={styles.sliderText}>Up to ₹{priceRange}</Text>

                    {/* Tag Filter */}
                    <Text style={styles.heading}>Filter by Tags</Text>
                    <View style={styles.tagContainer}>
                        {tags.map((tag, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[styles.tag, selectedTags.includes(tag) && styles.tagSelected]}
                                onPress={() => toggleSelection(tag, setSelectedTags)}
                            >
                                <Text style={[styles.tagText, selectedTags.includes(tag) && styles.tagTextSelected]}>
                                    {tag}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Variant Filter */}
                    <Text style={styles.heading}>Color Variants</Text>
                    <View style={styles.chipContainer}>
                        {variantTitles.map((variant, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[styles.chip, selectedVariants.includes(variant) && styles.chipSelected]}
                                onPress={() => toggleSelection(variant, setSelectedVariants)}
                            >
                                <Text style={[styles.chipText, selectedVariants.includes(variant) && styles.chipTextSelected]}>
                                    {variant}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                </ScrollView>

                {/* Sticky Apply Filters Button */}
                <View style={styles.stickyButtonContainer}>
                    <TouchableOpacity
                        style={styles.applyButton}
                            onPress={() => navigation.navigate('CollectionScreen', { selectedVariants, selectedTags, priceRange, sortBy, tags })}                    >
                        <Text style={styles.applyButtonText}>Apply Filters</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: "#fff" },
    container: { flex: 1 },
    header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 15, borderBottomWidth: 1, borderBottomColor: "#ddd" },
    headerTitle: { fontSize: 16, fontWeight: "bold" },
    clearText: { fontSize: 14, color: "#000" },
    scrollContainer: { flex: 1, padding: 15, marginBottom: 60 },
    heading: { fontSize: 14, fontWeight: "bold", marginBottom: 10 },
    chipContainer: { flexDirection: "row", flexWrap: "wrap", marginBottom: 30 },
    chip: { paddingVertical: 6, paddingHorizontal: 12, borderWidth: 0.6, borderColor: "#ccc", margin: 4 },
    chipSelected: { backgroundColor: "black" },
    chipText: { color: "black" },
    chipTextSelected: { color: "white" },
    tagContainer: { flexDirection: "row", flexWrap: "wrap", marginBottom: 10 },
    tag: { paddingVertical: 6, paddingHorizontal: 12, borderWidth: 0.6, borderColor: "#ccc", margin: 4 },
    tagSelected: { backgroundColor: "black" },
    tagText: { color: "black" },
    tagTextSelected: { color: "white" },
    slider: { width: "100%", height: 20, marginVertical: 10 },
    sliderText: { fontSize: 16, fontWeight: "bold", textAlign: "center" },

    // Sort By styles
    sortHeading: {
        fontWeight: "bold",
        marginBottom: 5,
    },
    sortContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 5,
        paddingBottom: 10,
    },
    sortOption: { paddingVertical: 5, paddingHorizontal: 15, borderWidth: 0.6, borderColor: "#ccc" },
    sortOptionSelected: { backgroundColor: "black" },
    sortText: { fontSize: 14, color: "black" },
    sortTextSelected: { color: "white", fontWeight: "bold" },

    stickyButtonContainer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#fff",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderTopWidth: 0.6,
        borderTopColor: "#ddd",
    },
    applyButton: {
        backgroundColor: 'black',
        padding: 15,
        alignItems: 'center',
    },
    applyButtonText: { color: "white", fontSize: 16, fontWeight: "bold" },
});

export default FilterScreen;