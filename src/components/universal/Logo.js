import React from "react";
import { View, Image, StyleSheet } from 'react-native';

export default function Logo() {
    return (
        <View style={styles.logoContainer}>
            <Image 
                source={{ uri: 'https://cdn.shopify.com/s/files/1/0997/6284/files/logo-mob.png' }} 
                style={styles.logoImage} 
                resizeMode="contain"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    logoContainer: {
        padding: 8,
    },
    logoImage: {
        width: 100,  // Adjust based on your design
        height: 40,  // Adjust based on your design
    },
});
