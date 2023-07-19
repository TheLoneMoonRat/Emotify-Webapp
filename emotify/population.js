
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
    return profile.id;
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
        track_names.push(items[j].track.name);
        popularities.push(items[j].track.popularity);
        finalPop = finalPop + parseInt(items[j].track.popularity);
    }
    for (let i = 0; i < 15; i++) {
        document.getElementById(`f${i + 1}`).innerText = track_names[i] + " Popularity: " + popularities[i];
    }
    document.getElementById("genre").innerText = Math.round(finalPop / items.length); 
}

function populatePlaylist (playlist_id, addList) {
    // for (let j = 0; j < addList.length; j++) {
        fetch(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks`, {
            method: "POST", 
            body: JSON.stringify({
                uris: [
                    addList
                ],
                position: 0
            }),     
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });
    // }
}