import React from 'react';
import { Dimensions, View, Text, ScrollView } from 'react-native';
import styles from '../../styles/mainStyle';
import ProductMini from '../components/universal/productmini';
import Header from '../components/universal/header';
import ImgCarousel from '../components/universal/ImageCarousel';

const { width } = Dimensions.get('window');

const premiumProducts = [
    {
        id: '1',
        name: 'Airwave Max 5',
        description: 'Adaptive ANC | 80H Playtime',
        originalPrice: '₹5,999',
        discount: '16%',
        salePrice: '₹4,499',
        image: 'https://cdn.shopify.com/s/files/1/0997/6284/files/Artboard_10.webp?v=1738306745',
        rating: 4.5,
        reviews: 12,
    },
    {
        id: '2',
        name: 'NoiseFit Diva 2',
        description: 'Amoled Display | Sleek Dial',
        originalPrice: '₹6,999',
        discount: '35%',
        salePrice: '₹4,499',
        image: 'https://cdn.shopify.com/s/files/1/0997/6284/files/Artboard_34.webp?v=1738306745',
        rating: 4.8,
        reviews: 89,
    },
    {
        id: '3',
        name: 'NoiseFit Diva 3',
        description: 'AMOLED | 7-Day Battery',
        originalPrice: '₹5,999',
        discount: '20%',
        salePrice: '₹4,799',
        image: 'https://cdn.shopify.com/s/files/1/0997/6284/files/Artboard_20.webp?v=1738306745',
        rating: 4.6,
        reviews: 78,
    },
    {
        id: '4',
        name: 'Noise Air Buds Pro',
        description: 'Hybrid ANC | 45H Playtime',
        originalPrice: '₹4,999',
        discount: '25%',
        salePrice: '₹3,749',
        image: 'https://cdn.shopify.com/s/files/1/0997/6284/files/Artboard_12.webp?v=1738306745',
        rating: 4.7,
        reviews: 134,
    },
    {
        id: '5',
        name: 'Noise ColorFit Pro 4',
        description: '1.85" Display | 150+ Watch Faces',
        originalPrice: '₹3,999',
        discount: '15%',
        salePrice: '₹3,399',
        image: 'https://cdn.shopify.com/s/files/1/0997/6284/files/Artboard_30.webp?v=1738306745',
        rating: 4.5,
        reviews: 200,
    },
    {
        id: '6',
        name: 'NoiseFit Twist',
        description: 'Round Dial | 1.4" TFT Display',
        originalPrice: '₹2,999',
        discount: '30%',
        salePrice: '₹2,099',
        image: 'https://cdn.shopify.com/s/files/1/0997/6284/files/Artboard_15.webp?v=1738306745',
        rating: 4.4,
        reviews: 90,
    },
];

export default function PremiumProductsScreen(props) {
    return (
        <ScrollView>
            <Header /> 
            <ImgCarousel />
            
            {/* 🔥 Premium Products Section */}
            <View style={[styles.fl1, styles.pdlt20, styles.pdtp20]}>  
                <Text style={[styles.f28, styles.b, { color: '#FF3366' }]}>Shop Premium</Text>
                <Text style={[styles.f18]}>Exclusive collections for you</Text>
            </View>

            {/* ✅ Two Items Per Row */}
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingHorizontal: 10, marginTop: 20 }}>
                {premiumProducts.map((data) => (
                    <View key={data.id} style={{ width: width / 2.2, marginBottom: 20 }}> 
                        <ProductMini
                            width="100%"  
                            height={280}
                            productTitleStyle={props.productTitleStyle}
                            productimgheight={120}
                            productimgresizemode={"contain"}
                            product={data}
                        />
                    </View>
                ))}
            </View>
        </ScrollView>
    );
}
