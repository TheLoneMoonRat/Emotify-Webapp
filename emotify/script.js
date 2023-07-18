const clientId = "2926559360aa4aa6a6200b9828a0dd00"; // Replace with your client ID
const params = new URLSearchParams(window.location.search);
const code = params.get("code");


if (!code) {
    redirectToAuthCodeFlow(clientId);
} else {
    const accessToken = await getAccessToken(clientId, code);
    const profile = await fetchProfile(accessToken);
    const songList = await fetchTopSongs(accessToken);
    const likedSongs = await fetchLikedSongs(accessToken);
    populateUI(profile);
    populateTopSongs(songList.items);
    // populateLikedSongs(likedSongs.items);
}

export async function redirectToAuthCodeFlow(clientId) {
    const verifier = generateCodeVerifier(128);
    const challenge = await generateCodeChallenge(verifier);

    localStorage.setItem("verifier", verifier);

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("response_type", "code");
    params.append("redirect_uri", "http://localhost:5173/callback");
    params.append("scope", "user-read-private user-read-email user-top-read user-library-read");
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


async function fetchProfile(token) {
    const result = await fetch("https://api.spotify.com/v1/me", {
        method: "GET", headers: { Authorization: `Bearer ${token}` }
    });
   
    return await result.json();
}

async function fetchTopSongs(token) {
    const result = await fetch("https://api.spotify.com/v1/me/top/tracks", {
        method: "GET", headers: { Authorization: `Bearer ${token}` }
    });

    return await result.json();
}

async function fetchLikedSongs(token) {
    const result = await fetch("https://api.spotify.com/v1/me/tracks", {
        method: "GET", headers: { Authorization: `Bearer ${token}` }
    });

    return await result.json();
}

function populateUI(profile) {
    document.getElementById("displayName").innerText = profile.display_name;
    if (profile.images[0]) {
        const profileImage = new Image(200, 200);
        profileImage.src = profile.images[0].url;
        document.getElementById("avatar").appendChild(profileImage);
        document.getElementById("imgUrl").innerText = profile.images[0].url;
    }
    document.getElementById("id").innerText = profile.id;
    document.getElementById("email").innerText = profile.email;
    document.getElementById("uri").innerText = profile.uri;
    document.getElementById("uri").setAttribute("href", profile.external_urls.spotify);
    document.getElementById("url").innerText = profile.href;
    document.getElementById("url").setAttribute("href", profile.href);
}

function populateTopSongs (items) {
    const track_names = [];
    const popularities = [];
    var finalPop = 0;
    for (let j = 0; j < 15; j++) {
        track_names.push(items[j].name);
        popularities.push(items[j].popularity);
        finalPop = finalPop + parseInt(items[j].popularity);
    }
    for (let i = 0; i < 15; i++) {
        document.getElementById(`f${i + 1}`).innerText = track_names[i] + " Popularity: " + popularities[i];
    }
    document.getElementById("genre").innerText = Math.round(finalPop / items.length);
}

function populateLikedSongs (items) {
    const track_names = [];
    const popularities = [];
    var finalPop = 0;
    for (let j = 0; j < 15; j++) {
        track_names.push(items[j].name);
        popularities.push(items[j].popularity);
        finalPop = finalPop + parseInt(items[j].popularity);
    }
    for (let i = 0; i < 15; i++) {
        document.getElementById(`f${i + 1}`).innerText = track_names[i] + " Popularity: " + popularities[i];
    }
    document.getElementById("genre").innerText = Math.round(finalPop / items.length); 
}