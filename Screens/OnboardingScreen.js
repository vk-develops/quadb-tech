import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";

const OnboardingScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <Image
                source={{
                    uri: "https://img.freepik.com/premium-vector/cinema-movie-film-illustration-design-vector_607286-861.jpg?w=360",
                }}
                style={styles.image}
            />
            <Text style={styles.title}>Welcome to MovieFlix</Text>
            <Text style={styles.description}>
                Your gateway to unlimited entertainment. Stream your favorite
                movies and shows anytime!
            </Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("Main")}
            >
                <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        backgroundColor: "#141414",
    },
    image: {
        width: 220,
        height: 220,
        marginBottom: 20,
        borderRadius: 110,
        borderWidth: 2,
        borderColor: "#e50914",
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#e50914",
        marginBottom: 14,
    },
    description: {
        fontSize: 16,
        color: "#ffffff",
        textAlign: "center",
        marginBottom: 30,
        lineHeight: 24,
    },
    button: {
        backgroundColor: "#e50914",
        paddingVertical: 16,
        paddingHorizontal: 40,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    buttonText: {
        color: "#ffffff",
        fontSize: 18,
        fontWeight: "bold",
        letterSpacing: 1,
    },
});

export default OnboardingScreen;
