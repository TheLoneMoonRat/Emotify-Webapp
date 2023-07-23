async function fetchProfile(token) {
    const result = await fetch("https://api.spotify.com/v1/me", {
        method: "GET", headers: { Authorization: `Bearer ${token}` }
    });
   
    return await result.json();
}

async function fetchTopSongs(token) {
    const result = await fetch("https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=50&offset=0", {
        method: "GET", headers: { Authorization: `Bearer ${token}` }
    });

    return await result.json();
}

async function fetchLikedSongs(token) {
    const result = await fetch("https://api.spotify.com/v1/me/tracks?time_range=long_term&limit=50&offset=0", {
        method: "GET", headers: { Authorization: `Bearer ${token}` }
    });

    return await result.json();
}

async function createPlaylist(token, userId, playlistName, playlistDescription) {
    const response = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        method: "POST",
        body: JSON.stringify({
            name: playlistName,
            description: playlistDescription,
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

// async function getPlaylistId (token, userId) {
//     const result = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
//         method: "GET", headers: { Authorization: `Bearer ${token}` }
//     });

//     const data = await result.json();
//     return data.items;
// }

// async function getFeatures (token, idse) {
//     const result = await fetch(`https://api.spotify.com/v1/audio_features?ids=${idse}`, {
//         method: "GET", headers: { Authorization: `Bearer ${token}` }
//     });

//     return await result.json();
// }

async function getFeatures(accessToken, trackIds) {
    try {
        const response = await fetch(`https://api.spotify.com/v1/audio-features?ids=${trackIds}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();
        const working = data.audio_features;
        return working;
    } catch (error) {
        console.error("Error:", error);
        return null; // Return an appropriate value when there's an error
    }
}