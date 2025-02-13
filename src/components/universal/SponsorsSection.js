import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

export default function SponsorsSection() {
    return (
        <View style={styles.container}>
            <View style={styles.sponsorsContainer}>
                <View style={styles.sponsorItem}>
                    {/* <Text style={styles.sponsorLabel}>Title Sponsor</Text> */}
                    <Image 
                        source={{ uri: 'https://crunchytech.com/wp-content/uploads/2023/12/Bose-logo.png' }}
                        style={styles.sponsorLogo}
                    />
                    <Text style={styles.sponsorName}>Sound by Bose</Text>
                </View>
                
                <View style={styles.sponsorItem}>
                    {/* <Text style={styles.sponsorLabel}>Associate Sponsor</Text> */}
                    <Image 
                        source={{ uri: 'https://crunchytech.com/wp-content/uploads/2023/12/Bose-logo.png' }}
                        style={styles.sponsorLogo}
                    />
                    <Text style={styles.sponsorName}>Sound by Bose</Text>
                </View>
            </View>

            <View style={styles.offerBanner}>
                <Image 
                    source={{ uri: 'https://seekvectors.com/files/download/hdfc-bank-logo-04.png' }}
                    style={styles.bankLogo}
                />
                <View style={styles.offerContent}>
                    <Text style={styles.offerText}>
                        10% instant discount on HDFC Bank credit & debit cards
                    </Text>
                    <Text style={styles.offerTerms}>T&C Apply</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        paddingRight: 16,
        paddingLeft: 16,
        paddingBottom: 10,
    },
    sponsorsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    sponsorItem: {
        alignItems: 'center',
    },
    sponsorLabel: {
        fontSize: 12,
        color: '#666',
        marginBottom: 8,
    },
    sponsorLogo: {
        width: 140,
        height: 60,
        resizeMode: 'contain',
        marginBottom: 0,
    },
    sponsorName: {
        fontSize: 14,
        fontWeight: '600',
    },
    offerBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFE4E4',
        padding: 12,
        borderRadius: 8,
    },
    bankLogo: {
        width: 40,
        height: 40,
        marginRight: 12,
    },
    offerContent: {
        flex: 1,
    },
    offerText: {
        fontSize: 14,
        color: '#333',
        fontWeight: '600',
    },
    offerTerms: {
        fontSize: 12,
        color: '#666',
        marginTop: 2,
    },
});