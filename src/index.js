import './index.css';
import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import App from './App';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/redux-store';

const InLinkApp = () => {
	return (
		<StrictMode>
			<HashRouter>
				<Provider store={store}>
					<App />
				</Provider>
			</HashRouter>
		</StrictMode>
	);
};

//  store.storeText, store.addPost, store.sendMessage
ReactDOM.render(<InLinkApp />, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or sendMessage to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
