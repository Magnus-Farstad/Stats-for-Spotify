import {FlatList, ImageBackground, SafeAreaView, StyleSheet, Text, View} from "react-native";
import {bgBlack, logoGreen, spotifyGreen} from "../colors";
import {Image} from "expo-image";
import {useEffect, useState} from "react";
import {getMe, getTopArtists, getTopTrack} from "../service/ApiService";
import {BlurView} from "expo-blur";
import AlbumCoverBig from "../components/albumCovers/AlbumCoverBig";


const HomeScreen = () => {
    const [topTrack, setTopTrack] = useState()
    const [topArtists, setTopArtists] = useState()
    const [user, setUser] = useState()

    const getMyTopTrack = async () => {
        const myTopTrack = await getTopTrack()
        setTopTrack(myTopTrack)
    }

    const getUser = async () => {
        const me = await getMe()
        setUser(me)
    }

    const getMyTopArtists = async () => {
        const myTopArtists = await getTopArtists()
        setTopArtists(myTopArtists.items)
        console.log(myTopArtists)
    }

    useEffect(() => {
        getUser()
        getMyTopTrack()
        getMyTopArtists()
    }, [])

    return (
        <SafeAreaView style={styles.homeContainer}>
            <View style={styles.header}>
                <Image style={styles.headerImage} source={user ? user.images[0].url : null}></Image>
                <Text style={styles.headerText}>Overview</Text>
            </View>
            <View style={styles.mainStatContainer}>
                <Text style={styles.mainStatText}>
                    Top <Text style={{color: spotifyGreen, fontWeight: "700"}}>Track</Text> the past 4 weeks
                </Text>
                { topTrack ?
                    <View style={styles.topTrackCard}>
                        <ImageBackground
                            source={{ uri: topTrack.album.images[0].url }}
                            resizeMode={"cover"}
                            style={styles.imgBackground}
                        >
                            <BlurView
                                intensity={150}
                                style={StyleSheet.absoluteFill}
                            />
                            <View style={styles.topTrackDetails}>
                                <Text style={styles.topTrackTitle}>{ topTrack.name }</Text>
                                <Text style={styles.topTrackArtist}>{ topTrack.artists[0].name }</Text>
                            </View>
                            <View style={styles.topTrackAlbumCover}>
                                <Image style={styles.albumCoverImage} source={ topTrack.album.images[0].url }></Image>
                            </View>
                        </ImageBackground>
                    </View> : null}
            </View>
            <View style={styles.secondaryStatContainer}>
                <Text style={styles.mainStatText}>Top Artists past 4 weeks</Text>
                <FlatList
                    horizontal={true}
                    data={topArtists}
                    ItemSeparatorComponent={() => (<View style={{width: 10}}></View>)}
                    renderItem={({ item, index }) => (
                    <AlbumCoverBig artist={item} position={index + 1} plays={100}/>
                )}/>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    homeContainer: {
        flex: 1,
        backgroundColor: bgBlack
    },
    header: {
        flexDirection: "row",
        gap: 10,
        padding: 15,
        paddingTop: 20,
        marginBottom: 30
    },
    headerImage: {
        height: 30,
        width: 30,
        borderRadius: 50,
        resizeMode: "cover"
    },
    headerText: {
        fontSize: 24,
        fontWeight: "700",
        color: "white"
    },
    mainStatContainer: {
        padding: 15,
        gap: 15,
        marginBottom: 10
    },
    mainStatText: {
        fontWeight: "600",
        fontSize: 16,
        color: "white"
    },
    topTrackCard: {
        alignSelf: "center",
        alignItems: "center",
        borderRadius: 15,
        backgroundColor: logoGreen,
        gap: 40,
        overflow: "hidden"
    },
    imgBackground: {
    },
    topTrackDetails: {
        marginTop: 15,
        marginBottom: 40,
        alignItems: "center",
        gap: 5,
    },
    topTrackTitle: {
        color: "white",
        fontWeight: "600",
        fontSize: 18
    },
    topTrackArtist: {
        color: "white",
        fontWeight: "400",
        fontSize: 14
    },
    topTrackAlbumCover: {
        aspectRatio: 1,
        height: 180,
        marginHorizontal: 40,
        marginBottom: 40
    },
    albumCoverImage: {
        width: "100%",
        height: "100%",
        resizeMode: "contain"
    },
    secondaryStatContainer: {
        padding: 15,
        gap: 15,
        marginBottom: 20
    }
})

export default HomeScreen