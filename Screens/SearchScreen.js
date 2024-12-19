import React, { useState } from "react";
import {
    View,
    TextInput,
    FlatList,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ActivityIndicator,
} from "react-native";

const SearchScreen = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);

    const handleSearch = async () => {
        if (!searchQuery.trim()) return;
        setLoading(true);
        setSearched(true);
        try {
            const response = await fetch(
                `https://api.tvmaze.com/search/shows?q=${searchQuery}`
            );
            const data = await response.json();
            setSearchResults(data);
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };

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
            <View style={styles.searchBar}>
                <TextInput
                    style={styles.input}
                    placeholder="Search movies..."
                    placeholderTextColor="#888"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    onSubmitEditing={handleSearch}
                />
            </View>

            {loading ? (
                <ActivityIndicator
                    size="large"
                    color="#e50914"
                />
            ) : searched && searchResults.length === 0 ? (
                <Text style={styles.noResults}>No matches found</Text>
            ) : searched && searchQuery.trim() === "" ? (
                <Text style={styles.noResults}>Your search goes here</Text>
            ) : (
                <FlatList
                    data={searchResults}
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
    },
    searchBar: {
        backgroundColor: "#333",
        padding: 10,
        margin: 15,
        borderRadius: 8,
    },
    input: {
        color: "#fff",
        fontSize: 16,
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
    },
    summary: {
        color: "#ccc",
        fontSize: 14,
        lineHeight: 20,
        paddingTop: 5,
    },
    noResults: {
        color: "#fff",
        fontSize: 18,
        textAlign: "center",
        marginTop: 20,
    },
});

export default SearchScreen;
