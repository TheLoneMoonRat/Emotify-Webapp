import React, {useState} from 'react';
import { generateThePlaylist } from './script';

function DropDown () {  
    const [selectedValue, setSelectedValue] = useState('');
    function generatePlaylist () {
        generateThePlaylist(selectedValue);
    }
    function handleChange (event) {
        setSelectedValue(event.target.value);
    };
    const temp = (
        <div>
            <button onClick={generatePlaylist}>{"Generate Playlist"}</button>
            <p>Please choose a playlist type</p>
            <select value = {selectedValue} onChange={handleChange}>
                <option value="">--Please choose an option--</option>
                <option value="Danceable">Dance Playlist</option>
                <option value="Acoustic">Acoustic Playlist</option>
                <option value="Singeable">Singing Playlist</option>
                <option value="Happy">Happy Playlist</option>
                <option value="Sad">Sad Playlist</option>
                <option value="Study">Study Playlist</option>
            </select>
        </div>
    );
    return temp;
}

export default DropDown;