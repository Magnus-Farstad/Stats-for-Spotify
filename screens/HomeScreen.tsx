import {
    Button,
    FlatList,
    ImageBackground,
    RefreshControl,
    SafeAreaView,
    StyleSheet,
    Text,
    View
} from "react-native";
import {bgBlack, logoGreen, spotifyGreen} from "../colors";
import {Image} from "expo-image";
import {useEffect, useState} from "react";
import {getMe, getRecentlyPlayed, getTopArtists, getTopTrack} from "../service/ApiService";
import {BlurView} from "expo-blur";
import AlbumCoverBig from "../components/albumCovers/AlbumCoverBig";
import RecentlyPlayedComponent from "../components/RecentlyPlayedComponent";
import {minutesListened, pastDaysSinceDateInMs} from "../composables";
import recentlyPlayedComponent from "../components/RecentlyPlayedComponent";
import ToggledList from "../components/ToggledList";


const HomeScreen = () => {
    const [user, setUser] = useState()
    const [topTrack, setTopTrack] = useState({short: null, medium: null, long: null})
    const [activeTopTrack, setActiveTopTrack] = useState()
    const [topArtists, setTopArtists] = useState({short: null, medium: null, long: null})
    const [activeTopArtists, setActiveTopArtists] = useState()
    const [recentlyPlayed, setRecentlyPlayed] = useState([])
    const [recentlyPlayedPast4Weeks, setRecentlyPlayedPast4Weeks] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [clickedId, setClickedId] = useState(0)

    const getData = () => {
        setIsLoading(true)
        const pastDay = pastDaysSinceDateInMs(1)
        const past4Weeks = pastDaysSinceDateInMs(28)
        setRecentlyPlayed([])
        setRecentlyPlayedPast4Weeks([])
        getUser()
        getMyTopTrack()
        getMyTopArtists()
        getMyRecentlyPlayedTracksPastDay(pastDay)
        getMyRecentlyPlayedTracksPast4Weeks(past4Weeks)
            .then(() => setIsLoading(false))
    }

    const getUser = async () => {
        const me: any = await getMe()
        setUser(me)
    }

    const getMyTopTrack = async () => {
        const myTopTrack: any = await getTopTrack("short_term")
        const myTopTrack6Months = await getTopTrack("medium_term")
        const myTopTrackLifetime = await getTopTrack("long_term")
        setTopTrack({short: myTopTrack, medium: myTopTrack6Months, long: myTopTrackLifetime})
        console.log(topTrack)
    }

    const getMyTopArtists = async () => {
        const myTopArtists: any = await getTopArtists("short_term")
        const myTopArtists6Months: any = await getTopArtists("medium_term")
        const myTopArtistsLifetime: any = await getTopArtists("long_term")
        setTopArtists({short: myTopArtists.items,
            medium: myTopArtists6Months.items,
            long: myTopArtistsLifetime.items})
    }

    const getMyRecentlyPlayedTracksPastDay = async (after: number) => {
        const myRecentlyPlayedPastDay: any = await getRecentlyPlayed(after)
        if (myRecentlyPlayedPastDay.next && myRecentlyPlayedPastDay.items.length === myRecentlyPlayedPastDay.limit) {
            await getMyRecentlyPlayedTracksPastDay(myRecentlyPlayedPastDay.cursors.after)
        }
        setRecentlyPlayed(prevTracks => [...prevTracks, ...myRecentlyPlayedPastDay.items])
    }

    const getMyRecentlyPlayedTracksPast4Weeks = async (after: number) => {
        const myRecentlyPlayed: any = await getRecentlyPlayed(after)
        if (myRecentlyPlayed.next && myRecentlyPlayed.items.length === myRecentlyPlayed.limit) {
            await getMyRecentlyPlayedTracksPast4Weeks(myRecentlyPlayed.cursors.after)
        }
        setRecentlyPlayedPast4Weeks(prevTracks => [...prevTracks, ...myRecentlyPlayed.items])
    }

    const setActiveItems = (index) => {
        switch (index) {
            case 0:
                setActiveTopTrack(topTrack?.short)
                setActiveTopArtists(topArtists.short)
                setClickedId(0)
                console.log(0)
                break
            case 1:
                setActiveTopTrack(topTrack?.medium)
                setActiveTopArtists(topArtists.medium)
                setClickedId(1)
                console.log(1)
                break
            case 2:
                setActiveTopTrack(topTrack?.long)
                setActiveTopArtists(topArtists.long)
                setClickedId(2)
                console.log(2)
                break
        }
    }

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        setActiveItems(0)
    }, [topTrack, topArtists])

    return (
        <SafeAreaView style={styles.homeContainer}>
            <View style={styles.header}>
                <View style={styles.user}>
                    <Image style={styles.headerImage} source={user ? user.images[0].url : null}></Image>
                    <Text style={styles.headerText}>Overview</Text>
                </View>
                <ToggledList
                    buttons={["4 weeks", "6 months", "lifetime"]}
                    onPress={(id) => setActiveItems(id)}
                    clickedId={clickedId}
                />
            </View>
            <FlatList
                refreshControl={<RefreshControl
                    colors={["white"]}
                    tintColor={"white"}
                    refreshing={isLoading}
                    onRefresh={()=>{
                        getData()}}
                />}
                ListHeaderComponent={
                <View>
                    <View style={styles.mainStatContainer}>
                        <Text style={styles.mainStatText}>
                            Top track
                        </Text>
                        { activeTopTrack ?
                            <View style={styles.topTrackCard}>
                                <ImageBackground
                                    source={{ uri: activeTopTrack.album.images[0].url }}
                                    resizeMode={"cover"}
                                    style={styles.imgBackground}
                                >
                                    <BlurView
                                        intensity={150}
                                        style={StyleSheet.absoluteFill}
                                    />
                                    <View style={styles.topTrackDetails}>
                                        <Text numberOfLines={1} style={styles.topTrackTitle}>
                                            { activeTopTrack.name }
                                        </Text>
                                        <Text numberOfLines={1} style={styles.topTrackArtist}>
                                            { activeTopTrack.artists[0].name }
                                        </Text>
                                    </View>
                                    <View style={styles.topTrackAlbumCover}>
                                        <Image style={styles.albumCoverImage} source={ activeTopTrack.album.images[0].url }></Image>
                                    </View>
                                </ImageBackground>
                            </View> : null}
                    </View>
                    <View style={styles.secondaryStatContainer}>
                        <Text style={styles.mainStatText}>Top Artists</Text>
                        <FlatList
                            horizontal={true}
                            data={activeTopArtists}
                            ItemSeparatorComponent={() => (<View style={{width: 10}}></View>)}
                            renderItem={({ item, index }) => (
                                <AlbumCoverBig artist={item} position={index + 1} plays={100}/>
                            )}/>
                    </View>
                    <View style={styles.recentlyPlayedContainer}>
                        <Text style={[styles.mainStatText, styles.recentlyText]}>Recently played on Spotify</Text>
                        {
                            recentlyPlayed.length !== 0 ?
                                <Text style={[styles.mainStatText, styles.minutesPlayed]}>
                                    {minutesListened(recentlyPlayed)}
                                </Text>
                                : null
                        }
                    </View>
                </View>
                }
                data={recentlyPlayed}
                renderItem={({ item }) => (
                    <RecentlyPlayedComponent trackObject={item}/>
                )} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    homeContainer: {
        flex: 1,
        backgroundColor: bgBlack
    },
    header: {
    },
    user: {
        flexDirection: "row",
        gap: 10,
        padding: 15,
        paddingTop: 30,
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
        gap: 20,
        marginBottom: 10
    },
    mainStatText: {
        fontWeight: "700",
        fontSize: 18,
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
        textAlign: "center",
        maxWidth: 180,
        color: "white",
        fontWeight: "600",
        fontSize: 18
    },
    topTrackArtist: {
        textAlign: "center",
        maxWidth: 180,
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
        marginBottom: 10
    },
    recentlyPlayedContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 15,
        paddingTop: 15

    },
    recentlyText: {
        alignSelf: "center"
    },
    minutesPlayed: {
        color: logoGreen,
        padding: 10,
        fontSize: 16,
        backgroundColor: "black",
        borderRadius: 15,
        overflow: "hidden"
    }
})

export default HomeScreen