import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import InLinkApp from './App';

//  store.storeText, store.addPost, store.sendMessage
ReactDOM.render(<InLinkApp />, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or sendMessage to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
