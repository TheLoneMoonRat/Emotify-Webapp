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

async function createPlaylist (token, userId) {
    fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        method: "POST", 
        body: JSON.stringify({
            name: "NathanLog",
            description: "coolio bro",
            public: false
        }),     
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });
}

async function getPlaylistId (token, user_id) {
    const result = await fetch(`https://api.spotify.com/v1/users/${user_id}/playlists`, {
        method: "GET", headers: { Authorization: `Bearer ${token}` }
    });

    return await result.json();
}