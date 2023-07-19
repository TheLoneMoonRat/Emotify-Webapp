async function findPlaylistID (playlists, target) {
    try {
        let j = 0;
        while (true) {
            if (playlists[j].name == target) {
                return await playlists[j].id;
            }
            j++;
        }
    }
    catch (error) {
        console.error(error);
    }
}