const clientId = "2926559360aa4aa6a6200b9828a0dd00";
const params = new URLSearchParams(window.location.search);
const code = params.get("code");
let accessToken;
let songList;
let playlistList;
let profile;
let user_id;
let top_song_id_uri;
let likedSongs;
let liked_song_id_uri;

if (!code) {
    redirectToAuthCodeFlow(clientId);
} else {
    (async () => {
        try {
            playlistList = await getPlaylistId(accessToken);
            accessToken = await getAccessToken(clientId, code);
            profile = await fetchProfile(accessToken, user_id);
            songList = await fetchTopSongs(accessToken, user_id);
            likedSongs = await fetchLikedSongs(accessToken, user_id);
            user_id = populateUI(profile);
            top_song_id_uri = populateTopSongs(songList.items);
            liked_song_id_uri = populateLikedSongs(likedSongs.items);
        } catch (error) {
            console.error("Error:", error);
        }
    })();
}


export function redirectAuth () {
    redirectToAuthCodeFlow(clientId);
}

export async function generateThePlaylist (type) {
    if (!code) {
        redirectToAuthCodeFlow(clientId);
    } else {
        (async () => {
            try {
                const playlistId = await createPlaylist(accessToken, user_id, `${type} Playlist`, `Playlist of ${type} songs in your top 50`);
                const string_id = get_track_ids(liked_song_id_uri[0]);
                const id_string = get_track_ids(top_song_id_uri[0]);
                const goods_the = await getFeatures(accessToken, string_id);
                const the_goods = await getFeatures(accessToken, id_string);
                const indexes_playlist = choosePlaylist(type, goods_the, liked_song_id_uri[1]);
                const playlist_indexes = choosePlaylist(type, the_goods, top_song_id_uri[1]);
                if (Array.isArray(indexes_playlist) && indexes_playlist.length > 0 && playlist_indexes.length < 100) {
                    for (var i = 0; i < indexes_playlist.length; i++) {
                        if (playlist_indexes.includes(indexes_playlist[i])) {
                            
                        } else {
                            playlist_indexes.push(indexes_playlist[i]);
                        }
                    }
                    console.log("ALERT ONE");
                } else {
                    console.log("ALERT TWO");
                }
                // if (Array.isArray(playlist_indexes) && playlist_indexes.length > 0 && playlist_indexes.length < 100) {
                //     var j = 0;
                //     while (playlist_indexes.length < 100) {
                //         console.log(j);
                //         console.log(playlistList[j].id);
                //         const currentPlaylist = playlistList[j].id;
                //         const currentPlaylistSongs = await getTracks(accessToken, currentPlaylist);
                //         console.log(currentPlaylistSongs[0].track.name);
                //         const currentPlaylist_id_uri = populateLikedSongs(currentPlaylistSongs);
                //         const string_of_id = get_track_ids(currentPlaylist_id_uri[0]);
                //         const indices = choosePlaylist(type, string_of_id, currentPlaylist_id_uri[1]);
                //         if (Array.isArray(indices) && indices.length > 0 && playlist_indexes.length < 100) {
                //             for (var q = 0; q < indices.length; q++) {
                //                 if (playlist_indexes.includes(indices[i])) {
                                    
                //                 } else {
                //                     playlist_indexes.push(indices[i]);
                //                 }
                //             }
                //         }
                //         j++;
                //     }
                //     console.log("ALERT THREE");
                // } else {
                //     console.log("ALERT FOUR");
                // }
                populatePlaylist(accessToken, playlistId, playlist_indexes);
            } catch (error) {
                console.error("Error:", error);
            }
        })();
    }
}

export async function redirectToAuthCodeFlow(clientId) {
    const verifier = generateCodeVerifier(128);
    const challenge = await generateCodeChallenge(verifier);

    localStorage.setItem("verifier", verifier);

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("response_type", "code");
    params.append("redirect_uri", "http://localhost:5173/callback");
    params.append("scope", "user-read-private user-read-email user-top-read user-library-read playlist-modify-public playlist-modify-private playlist-read-collaborative playlist-read-private");
    params.append("code_challenge_method", "S256");
    params.append("code_challenge", challenge);

    document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

function generateCodeVerifier(length) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

async function generateCodeChallenge(codeVerifier) {
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}

export async function getAccessToken(clientId, code) {
    const verifier = localStorage.getItem("verifier");

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", "http://localhost:5173/callback");
    params.append("code_verifier", verifier);

    const result = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params
    });

    const { access_token } = await result.json();
    return access_token;
}
