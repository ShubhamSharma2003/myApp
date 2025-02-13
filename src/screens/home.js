import React from 'react';
import { View, ScrollView, StyleSheet, SafeAreaView, StatusBar, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/universal/header.js';
import CategoryNav from '../components/universal/CategoryNav';
import PromotionalBanner from '../components/universal/PromotionalBanner';
import SponsorsSection from '../components/universal/SponsorsSection';
import CallToAction from '../components/universal/CallToAction';
import ImageCarousel from '../components/universal/ImageCarousel';
import ProductCarousel from '../components/universal/ProductCarousel';

export default function Home() {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollView}>
                    <Header />
                    <CategoryNav />
                    <PromotionalBanner />
                    <SponsorsSection />
                    <ImageCarousel />
                    <ProductCarousel />
                    <CallToAction />
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: Platform.OS === 'android' ? 1 : 0, // ✅ Uses smaller padding
    },
    container: {
        flex: 1,
    },
    scrollView: {
        flexGrow: 1,
    },
});
