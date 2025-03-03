import React from "react";
import { 
  View, ScrollView, SafeAreaView, Text, Dimensions, StyleSheet 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Header from "../components/universal/header";
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get("window");

export default function AccountScreen() {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1 }} nestedScrollEnabled={true}>
                <Header />

                <LinearGradient 
                    colors={["#000000", "#1E1E1E"]} 
                    style={styles.container}
                >
                    <View style={styles.content}>
                        <Text style={styles.title}>Hello Noisemaker,</Text>
                        <Text style={styles.subtitle}>Welcome to the Club</Text>

                        <Ionicons name="megaphone-outline" size={80} color="#FFD700" style={styles.icon} />

                        <Text style={styles.description}>
                            Stay tuned for the latest updates, exclusive content, and special perks for NM Club members.
                        </Text>

                        <View style={styles.divider} />

                        <Text style={styles.footerText}>We’re thrilled to have you here!</Text>
                    </View>
                </LinearGradient>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: width,
        height: height,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
        paddingTop: 50,
    },
    content: {
        alignItems: "center",
    },
    title: {
        fontSize: 36,
        fontWeight: "bold",
        color: "#FFFFFF",
        marginBottom: 5,
        textTransform: "uppercase",
    },
    subtitle: {
        fontSize: 26,
        fontWeight: "700",
        color: "#FFD700",
        marginBottom: 20,
        textTransform: "uppercase",
    },
    description: {
        fontSize: 18,
        color: "#DDDDDD",
        textAlign: "center",
        marginBottom: 30,
        paddingHorizontal: 15,
        lineHeight: 26,
    },
    icon: {
        marginBottom: 20,
    },
    divider: {
        width: 100,
        height: 2,
        backgroundColor: "#FFD700",
        marginVertical: 20,
    },
    footerText: {
        fontSize: 20,
        fontWeight: "600",
        color: "#FFFFFF",
    },
});

