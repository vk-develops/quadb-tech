import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";

const HomeScreen = ({ navigation }) => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetch(
                "https://api.tvmaze.com/search/shows?q=all"
            );
            const result = await response.json();
            setMovies(result);
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const renderMovie = ({ item }) => (
        <TouchableOpacity
            style={styles.movieContainer}
            onPress={() =>
                navigation.navigate("DetailsScreen", { movie: item.show })
            }
        >
            <Image
                source={{
                    uri:
                        item.show.image?.medium ||
                        "https://via.placeholder.com/150",
                }}
                style={styles.thumbnail}
            />
            <View style={styles.movieInfo}>
                <Text style={styles.title}>{item.show.name}</Text>
                <Text
                    style={styles.summary}
                    numberOfLines={3}
                >
                    {item.show.summary
                        ? item.show.summary.replace(/<\/?[^>]+(>|$)/g, "")
                        : "No summary available."}
                </Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.searchBar}
                onPress={() => navigation.navigate("Search")}
            >
                <Text style={styles.searchText}>Search movies...</Text>
            </TouchableOpacity>
            {loading ? (
                <ActivityIndicator
                    size="large"
                    color="#e50914"
                    style={styles.loader}
                />
            ) : (
                <FlatList
                    data={movies}
                    keyExtractor={(item) => item.show.id.toString()}
                    renderItem={renderMovie}
                    contentContainerStyle={styles.listContent}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#141414",
        paddingTop: 20,
    },
    searchBar: {
        backgroundColor: "#333",
        padding: 10,
        marginHorizontal: 15,
        marginBottom: 15,
        borderRadius: 8,
    },
    searchText: {
        color: "#888",
        fontSize: 16,
    },
    loader: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    listContent: {
        paddingHorizontal: 10,
    },
    movieContainer: {
        flexDirection: "row",
        marginBottom: 15,
        backgroundColor: "#222",
        borderRadius: 10,
        overflow: "hidden",
    },
    thumbnail: {
        width: 100,
        height: 150,
    },
    movieInfo: {
        flex: 1,
        padding: 10,
    },
    title: {
        color: "#e50914",
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 5,
    },
    summary: {
        color: "#ccc",
        fontSize: 14,
        lineHeight: 20,
    },
});

export default HomeScreen;
