import {ImageBackground, StyleSheet, Text, View} from "react-native";


const AlbumCoverBig = ({ position, plays, artist }) => {

    return (
        <View style={styles.albumCoverContainer}>
            <ImageBackground
                source={{ uri: artist.images[0].url }}
                resizeMode={"cover"}
                style={styles.imgBackground}
            >
                <View style={styles.content}>
                    <View style={styles.infoTop}>
                        <Text style={styles.albumOverlay}>#{ position }</Text>
                        <Text style={styles.albumOverlay}>{ plays }x</Text>
                    </View>
                    <Text style={[styles.albumOverlay, styles.artistOverlay]}>{ artist.name }</Text>
                </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    albumCoverContainer: {
        aspectRatio: 1,
        height: 135,
        borderRadius: 15,
        overflow: "hidden",
    },
    imgBackground: {
        flex: 1
    },
    content: {
        flex: 1,
        justifyContent: "space-between",
        padding: 10
    },
    infoTop: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    albumOverlay: {
        color: "white",
        fontWeight: "600",
        fontSize: 20,
        shadowColor: "black",
        shadowOpacity: 30,
        shadowRadius: 5,
        shadowOffset: {width: 0, height: 2}
    },
    artistOverlay: {
        fontSize: 15
    }
})

export default AlbumCoverBig