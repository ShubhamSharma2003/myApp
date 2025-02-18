import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation, useNavigationState } from "@react-navigation/native";
import HeartIcon from "../../../assets/icons/heartIcon.svg";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function ProductHeader() {
    const navigation = useNavigation();
    const routeIndex = useNavigationState((state) => state.index);
    const currentRoute = useNavigationState((state) => state.routes[routeIndex]?.name);

    const handleBackPress = () => {
        navigation.goBack(); 
    };

    return (
        <View style={styles.headerContainer}>
            <View style={styles.topRow}>
                <TouchableOpacity onPress={handleBackPress} style={styles.icon}>
                <Ionicons name="return-down-back" size={24} color="black" />
                </TouchableOpacity>

                <View style={styles.rightIcons}>
                    <Ionicons name="share-social-outline" size={24} color="black" />
                    <HeartIcon width={24} height={24} />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        backgroundColor: "#eaf0f0",
        paddingTop: 10,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#f0f0f0",
    },
    topRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingBottom: 5,
    },
    rightIcons: {
        flexDirection: "row",
        gap: 10,
        paddingRight: 10,
        alignItems: "center",
    },
    icon: {
        marginHorizontal: 8,
    },
});
