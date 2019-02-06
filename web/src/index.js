import "babel-polyfill";
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './screens/App';
import registerServiceWorker from './registerServiceWorker';

import ReactGA from 'react-ga';

import store from './stores.js'

import "./assets/css/style.css";

if(process.env.REACT_APP_GOOGLE_ANALYTICS_TAG != null && process.env.REACT_APP_GOOGLE_ANALYTICS_TAG.length > 0){
    ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_TAG, {
        debug: (process.env.REACT_APP_MODE == "local")
    });
}

ReactDOM.render((
    <Provider store={store}>
        <App />
    </Provider>
), document.getElementById('root'));
registerServiceWorker();
