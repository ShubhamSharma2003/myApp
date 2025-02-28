import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import HeartIcon from "../../../assets/icons/heartIcon.svg";
import Ionicons from "@expo/vector-icons/Ionicons";

const ProductHeader = ({ handle, style }) => {
    const navigation = useNavigation();

    const handleBackPress = () => {
        navigation.navigate("Home");
    };

    return (
        <View style={[styles.headerContainer, style]}>
            <View style={styles.topRow}>
                {/* Back button with handle name */}
                <TouchableOpacity onPress={handleBackPress} style={styles.leftContainer}>
                    <Ionicons name="return-down-back" size={24} color="black" />
                    <Text style={styles.handleText}>{handle}</Text>
                </TouchableOpacity>

                {/* Right icons */}
                <View style={styles.rightIcons}>
                    <Ionicons name="share-social-outline" size={24} color="black" />
                    <HeartIcon width={24} height={24} />
                </View>
            </View>
        </View>
    );
};

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
    leftContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    handleText: {
        marginLeft: 8,
        fontSize: 16,
        fontWeight: "bold",
        color: "black",
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

export default ProductHeader;
