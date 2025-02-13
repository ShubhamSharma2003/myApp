import React from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native'; // ✅ Import useNavigation
import Logo from './Logo';

export default function Header() {
    const navigation = useNavigation(); // ✅ Get navigation object

    return (
        <View style={styles.headerContainer}>
            {/* Top Row */}
            <View style={styles.topRow}>
                <Logo />
                <View style={styles.rightIcons}>
                    <Icon name="notifications-outline" size={24} style={styles.icon} />
                    <Icon name="heart-outline" size={24} style={styles.icon} />
                    
                </View>
            </View>
            
            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <View style={styles.searchBar}>
                    <TextInput 
                        placeholder="Search for products here..."
                        style={styles.searchInput}
                    />
                    <View style={styles.searchActions}>
                        <Icon name="mic-outline" size={20} color="#666" style={styles.icon} />
                        <Icon name="camera-outline" size={20} color="#666" style={styles.icon} />
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: '#FFF',
        paddingTop: 10,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
    },
    rightIcons: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        marginHorizontal: 8,
    },
    searchContainer: {
        marginBottom: 12,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 25,
    },
    searchInput: {
        flex: 1,
        marginLeft: 10,
        fontSize: 16,
    },
    searchActions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});