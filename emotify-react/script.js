const clientId = "2926559360aa4aa6a6200b9828a0dd00"; // Replace with your client ID
const params = new URLSearchParams(window.location.search);
const code = params.get("code");
let accessToken;
let songList;
let profile;
let user_id;
let top_song_id_uri;

if (!code) {
    redirectToAuthCodeFlow(clientId);
} else {
    (async () => {
        try {
            accessToken = await getAccessToken(clientId, code);
            profile = await fetchProfile(accessToken);
            songList = await fetchTopSongs(accessToken);
            // const likedSongs = await fetchLikedSongs(accessToken);
            user_id = populateUI(profile);
            top_song_id_uri = populateTopSongs(songList.items);
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
                // const likedSongs = await fetchLikedSongs(accessToken);
                const playlistId = await createPlaylist(accessToken, user_id, "Top dance Playlist", "All the happy songs in your top 50");
                // const playlistIdTop = await createPlaylist(accessToken, user_id, "Top 50 Songs", "Your statistically most played songs");
                // const playlistIdLiked = await createPlaylist(accessToken, user_id, "50 Liked Songs", "50 of your liked songs");
                // const top_liked_id_uri = populateLikedSongs(likedSongs.items);
                const id_string = get_track_ids(top_song_id_uri[0]);
                const the_goods = await getFeatures(accessToken, id_string);
                const playlist_indexes = choosePlaylist(type, the_goods, top_song_id_uri[1]);
                // populatePlaylist(accessToken, playlistIdTop, top_song_id_uri[1]);
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
