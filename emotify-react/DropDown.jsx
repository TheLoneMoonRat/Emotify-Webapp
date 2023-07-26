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
                <option value="danceable">Dance Playlist</option>
                <option value="acoustic">Acoustic Playlist</option>
                <option value="singeable">Singing Playlist</option>
                <option value="happy">Happy Playlist</option>
                <option value="sad">Sad Playlist</option>
                <option value="instrumental">Study Playlist</option>
            </select>
        </div>
    );
    return temp;
}

export default DropDown;