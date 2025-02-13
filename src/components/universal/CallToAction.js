import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CTACard = ({ title, subtitle, icon, backgroundColor }) => (
    <TouchableOpacity style={[styles.card, { backgroundColor }]}>
        <Ionicons name={icon} size={24} color="#FF3366" />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
    </TouchableOpacity>
);

export default function CallToAction() {
    return (
        <View style={styles.container}>
            <Text style={styles.sectionTitle}>Featured Benefits</Text>
            <View style={styles.cardContainer}>
                <CTACard
                    title="Supersaver"
                    subtitle="Up to 70% off"
                    icon="pricetag-outline"
                    backgroundColor="#FFE4E9"
                />
                <CTACard
                    title="What's Free"
                    subtitle="Exclusive offers"
                    icon="gift-outline"
                    backgroundColor="#E4F4FF"
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 10,
        paddingLeft: 16,
        paddingRight: 16,
        backgroundColor: '#fff',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 12,
        color: '#333',
    },
    cardContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    card: {
        flex: 0.48,
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        marginTop: 8,
        color: '#333',
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
});