import SpotifyWebApi from "spotify-web-api-js";
import {pastDaysSinceDateInMs} from "../composables";


let token = null;
let headers: Object = null;
let spotify = new SpotifyWebApi()

export const setAccessToken = (accessToken: String) => {
    token = accessToken
    headers = { Authorization: `Bearer ${token}` }
    spotify.setAccessToken(accessToken)
}

export const getMe = () => {
    return (
        spotify.getMe()
            .then((result) => {
                return result
            })
    )
}

export const getTopTrack = (time_range: string) => {
    return (
    spotify.getMyTopTracks({limit: 1, time_range: time_range})
        .then((result) => {
            return result.items[0]
        })
        .catch((error) => {
            console.log("getTopTrack had an issue, error message: \n", error)
        })
    )
}

export const getTopArtists = (time_range: string) => {
    return (
        spotify.getMyTopArtists({time_range: time_range})
            .then((result) => {
                return result
            })
            .catch((error) => {
                console.log("getTopArtist had an issue, error message: \n", error)
            })
    )
}

export const getRecentlyPlayed = (after: number) => {
    return (
        spotify.getMyRecentlyPlayedTracks({after: after, limit: 50})
            .then((result) => {
                return result
            })
            .catch((error) => {
                console.log("getRecentlyPlayedPastDay had an issue, error message: \n", error)
            })
    )
}