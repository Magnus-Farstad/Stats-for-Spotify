import axios from "axios";
import SpotifyWebApi from "spotify-web-api-js";


let token = null;
let headers: Object = null;
let spotify = new SpotifyWebApi()

export const setHeader = (newToken: String) => {
    token = newToken
    headers = { Authorization: `Bearer ${token}` }
}