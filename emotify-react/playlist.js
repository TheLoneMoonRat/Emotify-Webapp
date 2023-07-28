function choosePlaylist (type, itemOne, itemTwo) {
    let playlist = [];
    switch (type) {
        case "Danceable":
            playlist = (dancePlaylist(itemOne, itemTwo));
            break;
        case "Acoustic":
            playlist = (acousticPlaylist(itemOne, itemTwo));
            break;
        case "Singeable":
            playlist = (singPlaylist(itemOne, itemTwo));
            break;
        case "Happy":
            playlist = (enthusiasticPlaylist(itemOne, itemTwo));
            break;
        case "Sad":
            playlist = (unenthusiasticPlaylist(itemOne, itemTwo));
            break;
        case "Study":
            playlist = (studyPlaylist(itemOne, itemTwo));
            break;
    }
    const z = 0;
    return playlist;
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
        if (playlistJson[j].instrumentalness > 0.2) {
            if (playlistJson[j].energy > 0.2) {
                playlist.push(top_song_ids[j]);
            }
        }
    }
    return playlist;
}