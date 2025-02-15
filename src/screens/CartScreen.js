import React from "react";
import { View, ScrollView, SafeAreaView, Text, Dimensions } from 'react-native';
import Header from "../components/universal/header";
import CategoryNav from "../components/universal/CategoryNav";
import ProductCarousel from "../components/universal/ProductCarousel";
import ProductMini from "../components/universal/productmini";
import { LinearGradient } from 'expo-linear-gradient';
import styles from '../../styles/mainStyle';

const { width } = Dimensions.get("window"); // Get device width



export default function CartScreen() {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1 }} nestedScrollEnabled={true}>

                <Header />
                
            </ScrollView>
        </SafeAreaView>
    );
}

const CartStyles = {

};
