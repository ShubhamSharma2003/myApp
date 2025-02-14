import React, { useRef } from "react";
import { Pressable, StyleSheet, Animated } from "react-native";

const PremiumTouchable = React.memo(({ onPress, children, style }) => {
    const scaleValue = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        Animated.spring(scaleValue, {
            toValue: 0.95,
            speed: 15,  // Faster response
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scaleValue, {
            toValue: 1,
            speed: 15, 
            useNativeDriver: true,
        }).start(() => {
            if (onPress) onPress();
        });
    };

    return (
        <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut} style={{ width: "100%" }}>
            <Animated.View style={[styles.button, style, { transform: [{ scale: scaleValue }] }]}>
                {children}
            </Animated.View>
        </Pressable>
    );
});

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#f3f3f3", 
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
});

export default PremiumTouchable;
