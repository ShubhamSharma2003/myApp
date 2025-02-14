import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "@expo/vector-icons/Ionicons";
import { useNavigation, useNavigationState } from "@react-navigation/native";
import HeartIcon from "../../../assets/icons/heartIcon.svg"

export default function Header() {
    const navigation = useNavigation();
    const routeIndex = useNavigationState((state) => state.index);
    const currentRoute = useNavigationState((state) => state.routes[routeIndex]?.name);

    return (
        <View style={styles.headerContainer}>
            <View style={styles.topRow}>
                <Text style={styles.tabTitle}>{currentRoute}</Text>
                <View style={styles.rightIcons}>
                    <Icon name="notifications-outline" size={24} style={styles.icon} />
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
        backgroundColor: "#FFF",
        paddingTop: 10,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#f0f0f0",
    },
    topRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingBottom: 10,
    },
    tabTitle: {
        fontSize: 18,
        fontWeight: "bold",
        fontFamily: 'adihausdin_bold',  
    },
    rightIcons: {
        flexDirection: "row",
        alignItems: "center",
    },
    icon: {
        marginHorizontal: 8,
    },
});