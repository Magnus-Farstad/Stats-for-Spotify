import {StyleSheet, Text, View} from "react-native";
import {Image} from "expo-image";
import {spotifyGray} from "../colors";


const RecentlyPlayedComponent = ({ trackObject }) => {
    const track = trackObject.track
    const playedAt = new Date(trackObject.played_at).toString().slice(15, 24)

    const artistsBuilder = () => {
        let artists = track.artists[0].name

        for (let i = 1; i < track.artists.length; i++) {
            artists += ", " + track.artists[i].name
        }
        return artists
    }

    return (
        <View style={styles.recentlyContainer}>
            <View style={styles.track}>
                <Image style={styles.img} source={track.album.images[0]?.url}/>
                <View style={styles.trackDetails}>
                    <Text numberOfLines={1} style={styles.trackTitle}>{ track.name }</Text>
                    <Text numberOfLines={1} style={styles.trackArtist}>{ artistsBuilder() }</Text>
                </View>
            </View>
            <View style={styles.playedAtContainer}>
                <Image style={styles.recentlyIcon} source={require("../assets/recently.png")}/>
                <Text style={styles.playedAtText}>{ playedAt }</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    recentlyContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 10,
        paddingHorizontal: 15,
        paddingVertical: 7
    },
    track: {
        flexDirection: "row",
        gap: 10,
        maxWidth: "65%"
    },
    img: {
        aspectRatio: 1,
        height: 50,
        resizeMode: "contain"
    },
    trackDetails: {
        justifyContent: "center",
        width: "100%",
        gap: 2
    },
    trackTitle: {
        color: "white",
        fontWeight: "500",
        fontSize: 16
    },
    trackArtist: {
        color: spotifyGray,
        fontWeight: "400",
        fontSize: 12
    },
    playedAtContainer: {
        justifyContent: "center",
        alignItems: "flex-end",
        gap: 2
    },
    recentlyIcon: {
        aspectRatio: 1,
        height: 16,
        tintColor: spotifyGray
    },
    playedAtText: {
        color: "white",
        fontSize: 12
    }
})

export default RecentlyPlayedComponent