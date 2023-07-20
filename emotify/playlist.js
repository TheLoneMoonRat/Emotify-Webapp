function get_track_ids (trackList) {
    const track_ids = trackList[0];
    const iterations = Math.min(100, trackList.length);
    for (let j = 1; j < iterations; j++) {
        track_ids = track_ids + "," + trackList[j];
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
        if (playlistJson[j].energy > 0.7) {
            playlist.push(top_song_ids[j]);
        }    
    }
    return playlist;
}

function acousticPlaylist(playlistJson, top_song_ids) {
    const playlist = [];
    const iterations = Math.min(100, playlistJson.length);

    for (let j = 0; j < iterations; j++) {
        if (playlistJson[j].energy > 0.7) {
            playlist.push(top_song_ids[j]);
        }    
    }
    return playlist;
    
}

function singPlaylist (playlistJson, top_song_ids) {
    const playlist = [];
    const iterations = Math.min(100, playlistJson.length);

    for (let j = 0; j < iterations; j++) {
        if (playlistJson[j].energy > 0.7) {
            playlist.push(top_song_ids[j]);
        }    
    }
    return playlist;
}

function happyList (playlistJson, top_song_ids) {
    const playlist = [];
    const iterations = Math.min(100, playlistJson.length);

    for (let j = 0; j < iterations; j++) {
        if (playlistJson[j].energy > 0.7) {
            playlist.push(top_song_ids[j]);
        }    
    }
    return playlist;
    
}

function sadList (playlistJson, top_song_ids) {
    const playlist = [];
    const iterations = Math.min(100, playlistJson.length);

    for (let j = 0; j < iterations; j++) {
        if (playlistJson[j].energy > 0.7) {
            playlist.push(top_song_ids[j]);
        }    
    }
    return playlist;
}

function slowTempo (playlistJson, top_song_ids) {
    const playlist = [];
    const iterations = Math.min(100, playlistJson.length);

    for (let j = 0; j < iterations; j++) {
        if (playlistJson[j].energy > 0.7) {
            playlist.push(top_song_ids[j]);
        }    
    }
    return playlist;
}

function fastTempo (playlistJson, top_song_ids) {
    const playlist = [];
    const iterations = Math.min(100, playlistJson.length);

    for (let j = 0; j < iterations; j++) {
        if (playlistJson[j].energy > 0.7) {
            playlist.push(top_song_ids[j]);
        }    
    }
    return playlist;
}