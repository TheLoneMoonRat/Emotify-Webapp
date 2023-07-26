import React from 'react';
import ReactDOM from 'react-dom/client';

import MyComponent from './App';
import DropDown from './DropDown';
// ReactDOM.render(<MyComponent />, document.getElementById('app'));

ReactDOM.createRoot(document.getElementById('root')).render(<MyComponent/>);
ReactDOM.createRoot(document.getElementById('teeth')).render(<DropDown/>);