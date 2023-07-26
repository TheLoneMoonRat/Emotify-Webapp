import React from 'react';
import { redirectAuth } from './script';

function MyComponent () {  
    function redirectToAuth () {
        redirectAuth(); 
    }
    const temp = (
        <div>
            <button onClick={redirectToAuth}>{"Log back in"}</button>
        </div>
    );
    return temp;
}

export default MyComponent;