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

async function createPlaylist(token, userId) {
    const response = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        method: "POST",
        body: JSON.stringify({
            name: "My Favourites",
            description: "coolio bro",
            public: false
        }),
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });

    const data = await response.json();
    return data.id; // Return the created playlist ID
}

async function getPlaylistId (token, userId) {
    const result = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        method: "GET", headers: { Authorization: `Bearer ${token}` }
    });

    const data = await result.json();
    return data.items;
}