import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import reducers from './reducers';
import rootSaga from './sagas';

import App from './components/App';

import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://rem-rest-api.herokuapp.com/api';

// axios.create({
// 	baseURL: 'http://rem-rest-api.herokuapp.com/api',
// 	withCredentials: true
// });

// create createSagaMiddleware instance
const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware];


let store;

const getStore = () => {
	if (process.env.NODE_ENV === 'development') {
		store = createStore(reducers, composeWithDevTools(applyMiddleware(...middleware)));
		// call sagaMiddleware with run method to run rootSaga
		sagaMiddleware.run(rootSaga);
	} else {
		store = createStore(reducers, applyMiddleware(...middleware));
		// call sagaMiddleware with run method to run rootSaga
		sagaMiddleware.run(rootSaga);
	}
};

getStore();



ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);

// create users.js in /actions
// create exportable Types {} - getuserrequest getuserssucess
// create actions fort the above types
// create userReducer
// create index.js inside /reducers then combineReducers
// create store within the main index.js