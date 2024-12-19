import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import ParallaxScrollView from "../ParallaxScrollView";

const DetailsScreen = ({ route, navigation }) => {
    const { movie } = route.params;
    const { name, image, summary } = movie;

    return (
        <View style={{ flex: 1, backgroundColor: "#000" }}>
            <ParallaxScrollView
                headerImage={
                    <Image
                        source={{
                            uri:
                                image?.original ||
                                "https://via.placeholder.com/150",
                        }}
                        style={styles.headerImage}
                    />
                }
                headerBackgroundColor="#141414"
            >
                <View style={styles.contentContainer}>
                    <Text style={styles.title}>{name}</Text>
                    <Text style={styles.summary}>
                        {summary
                            ? summary.replace(/<\/?[^>]+(>|$)/g, "")
                            : "No summary available."}
                    </Text>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.goBack();
                        }}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Go Back</Text>
                    </TouchableOpacity>
                </View>
            </ParallaxScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    headerImage: {
        width: "100%",
        height: 250,
        resizeMode: "cover",
    },
    contentContainer: {
        flex: 1,
        padding: 20,
        backgroundColor: "#222",
    },
    title: {
        color: "#fff",
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 10,
    },
    summary: {
        color: "#ccc",
        fontSize: 16,
    },
    button: {
        backgroundColor: "#e50914",
        padding: 5,
        paddingVertical: 12,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 150,
        marginTop: 20,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
});

export default DetailsScreen;
