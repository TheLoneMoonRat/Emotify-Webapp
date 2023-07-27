function populateUI(profile) {
    if (profile.display_name != null) {
        document.getElementById("displayName").innerText = "Logged in as " + profile.display_name;
    } else {
        document.getElementById("displayName").innerText = "Not Currently Logged in";
    }
    if (profile.images[0]) {
        const profileImage = new Image(200, 200);
        profileImage.src = profile.images[0].url;
        document.getElementById("avatar").appendChild(profileImage);
        // document.getElementById("imgUrl").innerText = profile.images[0].url;
    }
    // document.getElementById("id").innerText = profile.id;
    // document.getElementById("email").innerText = profile.email;
    // document.getElementById("uri").innerText = profile.uri;
    // document.getElementById("uri").setAttribute("href", profile.external_urls.spotify);
    // document.getElementById("url").innerText = profile.href;
    // document.getElementById("url").setAttribute("href", profile.href);
    return profile.id;
}

function populateTopSongs (items) {
    const id_uri =[];
    const track_ids = [];
    const track_uri = [];
    // const track_names = [];
    // const popularities = [];
    const iterations = Math.min(100, items.length);
    // var finalPop = 0;

    for (let j = 0; j < iterations; j++) {
        // track_names.push(items[j].name);
        // popularities.push(items[j].popularity);
        track_ids.push(items[j].id);
        track_uri.push(items[j].uri);
        // finalPop = finalPop + parseInt(items[j].popularity);
    }
    // for (let i = 0; i < 15; i++) {
    //     document.getElementById(`f${i + 1}`).innerText = track_names[i] + " Popularity: " + popularities[i];
    // }
    // document.getElementById("genre").innerText = Math.round(finalPop / items.length);
    id_uri.push(track_ids);
    id_uri.push(track_uri);
    return id_uri;
}

function findPlaylistTracks (items) {
    const id_uri =[];
    const track_ids = [];
    const track_uri = [];
    const track_names = [];
    const popularities = [];
    var finalPop = 0;
    const iterations = Math.min(100, items.length);

    for (let j = 0; j < iterations; j++) {
        track_names.push(items[j].name);
        popularities.push(items[j].popularity);
        track_ids.push(items[j].id);
        track_uri.push(items[j].uri);
        finalPop = finalPop + parseInt(items[j].track.popularity);
    }
    for (let i = 0; i < 15; i++) {
        document.getElementById(`f${i + 1}`).innerText = track_names[i] + " Popularity: " + popularities[i];
    }
    document.getElementById("genre").innerText = Math.round(finalPop / items.length); 
    id_uri.push(track_ids);
    id_uri.push(track_uri);
    return id_uri;
}

function populateLikedSongs (items) {
    const id_uri =[];
    const track_ids = [];
    const track_uri = [];
    // const track_names = [];
    // const popularities = [];
    // var finalPop = 0;
    const iterations = Math.min(100, items.length);

    for (let j = 0; j < iterations; j++) {
        // track_names.log(items[j].track.name);
        // popularities.push(items[j].track.popularity);
        track_ids.push(items[j].track.id);
        track_uri.push(items[j].track.uri);
        // finalPop = finalPop + parseInt(items[j].track.popularity);
    }
    // for (let i = 0; i < 15; i++) {
    //     document.getElementById(`f${i + 1}`).innerText = track_names[i] + " Popularity: " + popularities[i];
    // }
    // document.getElementById("genre").innerText = Math.round(finalPop / items.length); 
    id_uri.push(track_ids);
    id_uri.push(track_uri);
    return id_uri;
}

function populatePlaylist (token, playlist_id, addList) {

    fetch(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks`, {
        method: "POST", 
        body: JSON.stringify({
            uris: addList,
            position: 0
        }),     
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });
}