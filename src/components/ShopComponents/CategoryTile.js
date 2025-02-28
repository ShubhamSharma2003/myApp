import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

const CategoryTile = ({ title, icon }) => {
    return (
        <TouchableOpacity style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 15,
            borderBottomWidth: 1,
            borderColor: "#e0e0e0"
        }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <FontAwesome5 name={icon} size={20} style={{ marginRight: 10 }} />
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>{title}</Text>
            </View>
            <FontAwesome5 name="chevron-right" size={16} color="gray" />
        </TouchableOpacity>
    );
};

export default CategoryTile;
