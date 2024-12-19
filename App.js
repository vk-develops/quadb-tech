import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as SplashScreen from "expo-splash-screen";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import HomeScreen from "./Screens/HomeScreen";
import SearchScreen from "./Screens/SearchScreen";
import OnboardingScreen from "./Screens/OnboardingScreen";
import DetailsScreen from "./Screens/DetailsScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => (
    <Stack.Navigator>
        <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{
                headerShown: true,
                headerStyle: {
                    backgroundColor: "#141414",
                },
                headerTintColor: "#fff",
                title: "Home",
            }}
        />
        <Stack.Screen
            name="DetailsScreen"
            component={DetailsScreen}
            options={{ headerShown: false }}
        />
    </Stack.Navigator>
);

const SearchStack = () => (
    <Stack.Navigator>
        <Stack.Screen
            name="SearchScreen"
            component={SearchScreen}
            options={{
                headerShown: true,
                headerStyle: {
                    backgroundColor: "#141414",
                },
                headerTintColor: "#fff",
                title: "Search",
            }}
        />
        <Stack.Screen
            name="DetailsScreen"
            component={DetailsScreen}
            options={{ headerShown: false }}
        />
    </Stack.Navigator>
);

const BottomTabs = () => (
    <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarStyle: styles.tabBar,
            tabBarActiveTintColor: "#e50914",
            tabBarInactiveTintColor: "#ffffff",
            headerShown: false,
            tabBarIcon: ({ color, size }) => {
                let iconName;
                if (route.name === "Home") {
                    iconName = "home-outline";
                } else if (route.name === "Search") {
                    iconName = "search-outline";
                }
                return (
                    <Ionicons
                        name={iconName}
                        size={size}
                        color={color}
                    />
                );
            },
        })}
    >
        <Tab.Screen
            name="Home"
            component={HomeStack}
        />
        <Tab.Screen
            name="Search"
            component={SearchStack}
        />
    </Tab.Navigator>
);

export default function App() {
    SplashScreen.preventAutoHideAsync();
    setTimeout(SplashScreen.hideAsync, 3000);

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen
                    name="Onboarding"
                    component={OnboardingScreen}
                />
                <Stack.Screen
                    name="Main"
                    component={BottomTabs}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: "#141414",
        padding: 15,
        alignItems: "center",
    },
    headerTitle: {
        color: "#e50914",
        fontSize: 20,
        fontWeight: "bold",
    },
    tabBar: {
        backgroundColor: "#141414",
        borderTopWidth: 0,
    },
});
