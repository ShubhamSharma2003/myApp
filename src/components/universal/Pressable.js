// components/PremiumTouchable.js
import React from "react";
import { Pressable, StyleSheet, Animated } from "react-native";

const PremiumTouchable = ({ onPress, children, style }) => {
    const scaleValue = new Animated.Value(1);

    const handlePressIn = () => {
        Animated.spring(scaleValue, {
            toValue: 0.95,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scaleValue, {
            toValue: 1,
            friction: 4,
            useNativeDriver: true,
        }).start(() => {
            onPress && onPress();
        });
    };

    return (
        <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut} style={{ width: "100%" }}>
            <Animated.View style={[styles.button, style, { transform: [{ scale: scaleValue }] }]}>
                {children}
            </Animated.View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#EDE7F6", 
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
});

export default PremiumTouchable;
