import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Image} from "expo-image";
import React, {useEffect} from 'react';
import {ResponseType, useAuthRequest} from "expo-auth-session";
import {bgBlack, spotifyGreen} from "../colors";
import {setAccessToken} from "../service/ApiService";

const discovery = {
    authorizationEndpoint: "https://accounts.spotify.com/authorize",
    tokenEndpoint: "https://accounts.spotify.com/api/token",
};


const LoginScreen = ({ navigation }) => {
    const [request, response, promptAsync] = useAuthRequest(
        {
            responseType: ResponseType.Token,
            clientId: "9f2b5df1f31849b49efc0f1fdf76aa1e",
            scopes: [
                "user-read-currently-playing",
                "user-read-recently-played",
                "user-read-playback-state",
                "user-top-read",
                "user-modify-playback-state",
                "streaming",
                "user-read-email",
                "user-read-private",
            ],
            // In order to follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
            // this must be set to false
            usePKCE: false,
            redirectUri: "exp://192.168.10.105:19000",
        },
        discovery
    );

    const login = () => {
        promptAsync()
    }

    useEffect(() => {
        if (response?.type === "success") {
            const { access_token } = response.params;
            setAccessToken(access_token)
            navigation.replace("Home")
        }
    }, [response]);

    // useEffect(() => {
    //     if (token) {
    //         axios("https://api.spotify.com/v1/me/top/tracks?time_range=short_term", {
    //             method: "GET",
    //             headers: {
    //                 Accept: "application/json",
    //                 "Content-Type": "application/json",
    //                 Authorization: "Bearer " + token,
    //             },
    //         })
    //             .then((response) => {
    //                 console.log(response)
    //             })
    //             .catch((error) => {
    //                 console.log("error", error.message);
    //             });
    //     }
    // }, []);

    return (
        <View style={styles.loginContainer}>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>Stats for</Text>
                <Image style={styles.titleImage} source={require("../assets/Spotify_Logo_RGB_Green.png")} />
            </View>
            <Text style={styles.slogan}>A nice slogan to catch users attention</Text>
            <TouchableOpacity onPress={() => login()}>
                <View style={styles.loginButton}>
                    <Text style={styles.loginText}>Login with</Text>
                    <Image style={styles.loginImage} source={require("../assets/Spotify_Logo_RGB_White.png")} />
                </View>
            </TouchableOpacity>
            <View style={{ height: 100 }} />
        </View>
    );
}

const styles = StyleSheet.create({
    loginContainer: {
        flex: 1,
        backgroundColor: bgBlack,
        alignItems: "center",
        paddingTop: 190
    },
    titleContainer: {
        flexDirection: "row",
        gap: 6,
        marginBottom: 80
    },
    titleText: {
        paddingTop: 3,
        fontSize: 24,
        color: "white",
        fontWeight: "600"
    },
    titleImage: {
        resizeMode: "contain",
        height: 37,
        width: 121,
    },
    slogan: {
        color: "white",
        fontWeight: "500",
        fontSize: 16,
        marginBottom: 260
    },
    loginButton: {
        flexDirection: "row",
        backgroundColor: spotifyGreen,
        paddingVertical: 15,
        paddingHorizontal: 50,
        borderRadius: 30,
        gap: 6
    },
    loginText: {
        color: "white",
        fontWeight: "600",
        fontSize: 16
    },
    loginImage: {
        resizeMode: "contain",
        height: 19,
        width: 64,
    }
})

export default LoginScreen