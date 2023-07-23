function get_track_ids (trackList) {
    var track_ids = trackList[0];
    const iterations = Math.min(100, trackList.length);
    for (let j = 1; j < iterations; j++) {
        track_ids = track_ids.concat("%2C", trackList[j]);
    }
    return track_ids;
}

function energyPlaylist (playlistJson, top_song_ids) {
    const playlist = [];
    const iterations = Math.min(100, playlistJson.length);

    for (let j = 0; j < iterations; j++) {
        if (playlistJson[j].energy > 0.7) {
            playlist.push(top_song_ids[j]);
        }    
    }
    return playlist;
}

function dancePlaylist (playlistJson, top_song_ids) {
    const playlist = [];
    const iterations = Math.min(100, playlistJson.length);

    for (let j = 0; j < iterations; j++) {
        if (playlistJson[j].danceability > 0.7) {
            playlist.push(top_song_ids[j]);
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

function singPlaylist (playlistJson, top_song_ids) {
    const playlist = [];
    const iterations = Math.min(100, playlistJson.length);

    for (let j = 0; j < iterations; j++) {
        if (playlistJson[j].speechiness > 0.7) {
            playlist.push(top_song_ids[j]);
        }    
    }
    return playlist;
}

function happyList (playlistJson, top_song_ids) {
    const playlist = [];
    const iterations = Math.min(100, playlistJson.length);

    for (let j = 0; j < iterations; j++) {
        if (playlistJson[j].valence > 0.7) {
            playlist.push(top_song_ids[j]);
        }    
    }
    return playlist;
    
}

function sadList (playlistJson, top_song_ids) {
    const playlist = [];
    const iterations = Math.min(100, playlistJson.length);

    for (let j = 0; j < iterations; j++) {
        if (playlistJson[j].valence < 0.3) {
            playlist.push(top_song_ids[j]);
        }    
    }
    return playlist;
}

function slowTempo (playlistJson, top_song_ids) {
    const playlist = [];
    const iterations = Math.min(100, playlistJson.length);

    for (let j = 0; j < iterations; j++) {
        if (playlistJson[j].tempo < 90) {
            playlist.push(top_song_ids[j]);
        }    
    }
    return playlist;
}

function fastTempo (playlistJson, top_song_ids) {
    const playlist = [];
    const iterations = Math.min(100, playlistJson.length);

    for (let j = 0; j < iterations; j++) {
        if (playlistJson[j].tempo > 140) {
            playlist.push(top_song_ids[j]);
        }    
    }
    return playlist;
}