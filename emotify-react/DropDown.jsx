import { redirectAuth } from './script';
import { generateThePlaylist } from './script';
import React, {useState} from 'react';

function DropDown () {  
    const [selectedValue, setSelectedValue] = useState('');
    function generatePlaylist () {
        generateThePlaylist(selectedValue);
    }
    function handleChange (event) {
        setSelectedValue(event.target.value);
    };
    function redirectToAuth () {
        redirectAuth(); 
        // loggedIn();
    }
    const temp = (
        <div>
            <div id="avatar" class="avatar"></div>
            <button onClick={redirectToAuth} className="login">{"Log in with Spotify"}</button>
            <button onClick={generatePlaylist}>{"Generate Playlist"}</button>
            <select value = {selectedValue} onChange={handleChange}>
                <option value="">--Please choose a playlist type--</option>
                <option value="Danceable">Dance Playlist</option>
                <option value="Acoustic">Acoustic Playlist</option>
                <option value="Singeable">Singing Playlist</option>
                <option value="Happy">Happy Playlist</option>
                <option value="Sad">Sad Playlist</option>
                <option value="Study">Study Playlist</option>
            </select>
            
            <li>User ID: <span id="id"></span></li>
            <li>Email: <span id="email"></span></li>
        </div>
    );
    return temp;
}

export default DropDown;