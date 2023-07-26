function choosePlaylist (type, itemOne, itemTwo) {
    switch (type) {
        case "danceable":
            return (dancePlaylist(itemOne, itemTwo));
        case "acoustic":
            return (acousticPlaylist(itemOne, itemTwo));
        case "singeable":
            return (singPlaylist(itemOne, itemTwo));
        case "happy":
            return (enthusiasticPlaylist(itemOne, itemTwo));
        case "sad":
            return (unenthusiasticPlaylist(itemOne, itemTwo));
        case "instrumental":
            return (studyPlaylist(itemOne, itemTwo));
    }
}

function get_track_ids (trackList) {
    var track_ids = trackList[0];
    const iterations = Math.min(100, trackList.length);
    for (let j = 1; j < iterations; j++) {
        track_ids = track_ids.concat("%2C", trackList[j]);
    }
    return track_ids;
}

function dancePlaylist (playlistJson, top_song_ids) {
    const playlist = [];
    const iterations = Math.min(100, playlistJson.length);

    for (let j = 0; j < iterations; j++) {
        if (playlistJson[j].danceability > 0.5) {
            if (playlistJson[j].energy > 0.5) {
                if (playlistJson[j].tempo > 128) {
                    playlist.push(top_song_ids[j]);
                }
            }
        }    
    }
    return playlist;
}

function acousticPlaylist(playlistJson, top_song_ids) {
    const playlist = [];
    const iterations = Math.min(100, playlistJson.length);

    for (let j = 0; j < iterations; j++) {
        if (playlistJson[j].acousticness > 0.7) {
            playlist.push(top_song_ids[j]);
        }    
    }
    return playlist;
    
}

function enthusiasticPlaylist (playlistJson, top_song_ids) {
    const playlist = [];
    const iterations = Math.min(100, playlistJson.length);

    for (let j = 0; j < iterations; j++) {
        if (playlistJson[j].energy > 0.65) {
            if (playlistJson[j].valence > 0.65) {
                playlist.push(top_song_ids[j]);
            }
        }
    }
    return playlist;
}

function unenthusiasticPlaylist (playlistJson, top_song_ids) {
    const playlist = [];
    const iterations = Math.min(100, playlistJson.length);

    for (let j = 0; j < iterations; j++) {
        if (playlistJson[j].energy < 0.35) {
            if (playlistJson[j].valence < 0.35) {
                playlist.push(top_song_ids[j]);
            }
        }
    }
    return playlist;
}

function singPlaylist (playlistJson, top_song_ids) {
    const playlist = [];
    const iterations = Math.min(100, playlistJson.length);

    for (let j = 0; j < iterations; j++) {
        if (playlistJson[j].speechiness > 0.1) {
            playlist.push(top_song_ids[j]);
        }    
    }
    return playlist;
}

function studyPlaylist (playlistJson, top_song_ids) {
    const playlist = [];
    const iterations = Math.min(100, playlistJson.length);
    for (let j = 0; j < iterations; j++) {
        if (playlistJson[j].instrumentalness > 0.3) {
            if (playlistJson[j].energy > 0.3) {
                playlist.push(top_song_ids[j]);
            }
        }
    }
    return playlist;
}