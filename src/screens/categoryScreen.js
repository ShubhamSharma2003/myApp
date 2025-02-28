import React from "react";
import { View, ScrollView, SafeAreaView, StyleSheet } from "react-native";
import Header from "../components/universal/header";
import SearchBar from "../components/universal/SearchBar";
import CategoryBanner from "../components/ShopComponents/CategoryBanner";
import CategoryList from "../components/ShopComponents/CategoryList";
import PromoTiles from "../components/ShopComponents/PromoTiles";
import ShopProductTiles from "../components/ShopComponents/ShopProductTile";

export default function CategoryScreen() {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            {/* Sticky Header + Search Bar */}
            <View style={styles.stickyHeader}>
                <Header />
                <SearchBar />
            </View>

            {/* Scrollable Content */}
            <ScrollView style={styles.scrollView} nestedScrollEnabled={true}>
                <CategoryBanner />
                <CategoryList />
                <PromoTiles />
                <ShopProductTiles categoryHandle="smart-watches"/>
                <ShopProductTiles categoryHandle="anc-earbuds"/>
                <ShopProductTiles categoryHandle="accessories"/>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    stickyHeader: {
        backgroundColor: "#FFF",
        zIndex: 1000,
    },
    scrollView: {
        flex: 1,
    },
});

