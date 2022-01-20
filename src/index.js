
import './index.css';
import reportWebVitals from './reportWebVitals';
import state, { functions } from './redux/state';

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

let rerenderApp = (props) => {


  ReactDOM.render(

    <React.StrictMode>
      <BrowserRouter>
        <App state={props.state}
          functions={props.functions} />
      </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')

  );

}

rerenderApp({state, functions});

functions.subscribe (rerenderApp);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
