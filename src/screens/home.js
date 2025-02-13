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

export default function Home() {
    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
            <ScrollView contentContainerStyle={styles.scrollView} showsVerticalScrollIndicator={false}>
                <Header />
                <SearchBar />
                <CategoryNav />
                <PromotionalBanner />
                <SponsorsSection />
                <ImageCarousel />
                <ProductCarousel />
                <CallToAction />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollView: {
        flexGrow: 1,
        paddingTop: 10,
    },
});
