import SpotifyWebApi from "spotify-web-api-js";


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

export const getTopTrack = () => {
    return (
    spotify.getMyTopTracks({limit: 1, time_range: "short_term"})
        .then((result) => {
            return result.items[0]
        })
        .catch((error) => {
            console.log("getTopTrack had an issue, error message: \n", error)
        })
    )
}

export const getTopArtists = () => {
    return (
        spotify.getMyTopArtists({time_range: "short_term"})
            .then((result) => {
                return result
            })
            .catch((error) => {
                console.log("getTopArtist had an issue, error message: \n", error)
            })
    )
}

export const getRecentlyPlayedPastDay = () => {
    const day = 86400000
    const date = new Date()

    return (
        spotify.getMyRecentlyPlayedTracks({after: date.getTime() - day, limit: 50})
            .then((result) => {
                return result
            })
            .catch((error) => {
                console.log("getRecentlyPlayedPastDay had an issue, error message: \n", error)
            })
    )
}