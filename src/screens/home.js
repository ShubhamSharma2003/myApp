import React from 'react';
import { View, ScrollView, StyleSheet, SafeAreaView, StatusBar, Platform } from 'react-native';
import SearchBar from '../components/universal/SearchBar';
import CategoryNav from '../components/universal/CategoryNav';
import PromotionalBanner from '../components/universal/PromotionalBanner';
import SponsorsSection from '../components/universal/SponsorsSection';
import CallToAction from '../components/universal/CallToAction';
import ImageCarousel from '../components/universal/ImageCarousel';
import ProductCarousel from '../components/universal/ProductCarousel';
import Header from '../components/universal/header';
import ImageCardList from '../components/universal/ImageCardList';
import ProductGrid from '../components/universal/ProductGrid';
import NewArrivalsGrid from '../components/universal/NewArrivalsGrid';
import SuggestedProducts from '../components/universal/SuggestedProducts';
import HybridList from '../components/universal/HybridList';
import TopProductsCarousel from '../components/universal/TopProductCarousel';
import ProductTile from '../components/universal/ProductTile'
import CardStackCarousal from '../components/universal/CardStackCarousal';
import ProductList from '../components/universal/ProductList';

export default function Home() {
    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
            <ScrollView contentContainerStyle={styles.scrollView} showsVerticalScrollIndicator={false}>
            <View style={{ flex: 1 }}> 
                <Header />
                {/* <ProductList /> */}
                {/* <SearchBar /> */}
                {/* <CategoryNav /> */}
                {/* <PromotionalBanner /> */}
                <ProductGrid />
                <TopProductsCarousel />
                <ImageCardList />
                <NewArrivalsGrid />
                <ProductTile />
                <HybridList />
                <SuggestedProducts />
                {/* <SponsorsSection /> */}
                {/* <ImageCarousel /> */}
                {/* <CardStackCarousal /> */}
                {/* <ProductCarousel /> */}
                {/* <CallToAction /> */}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        // flex: 1,
        backgroundColor: '#fff',
    },

});
