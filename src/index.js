
import './index.css';
import reportWebVitals from './reportWebVitals';
import store from './redux/state';

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

//store.storeText, store.addPost, store.sendMessage

let rerenderApp = (state) => {
  ReactDOM.render(

    <React.StrictMode>
      <BrowserRouter>
        <App state={state}
          storeText={store.storeText.bind(store)}
          addPost={store.addPost.bind(store)}
          sendMessage={store.sendMessage.bind(store)} />
      </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')

  );

}

rerenderApp(store.getState());

store.subscribe(rerenderApp);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
