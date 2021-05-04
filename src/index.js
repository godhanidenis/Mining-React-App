/* eslint-disable no-unused-expressions */

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';
import axios from 'axios';
import createHistory from 'history/createBrowserHistory';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import reduxThunk from 'redux-thunk';

import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';

import './index.css';

import rootReducer from './store/reducers';

import App from './App';
import * as serviceWorker from './serviceWorker';

import theme from './theme';

import './fonts/Webfonts/BraiinsSans-Regular.woff'

const history = createHistory();
const middleware = composeWithDevTools(
  applyMiddleware(reduxThunk, routerMiddleware(history)),
);

if (localStorage.token) axios.defaults.headers.common.authorization = localStorage.token;
axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.request.use((config) => {
  config.headers['Content-Type'] = 'application/json';
  return config;
});

export const store = middleware(createStore)(combineReducers({ rootReducer, routerReducer }));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConnectedRouter store={store} history={history}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router><Route component={(props) => <App {...props}/> } /></Router>
        </ThemeProvider>
      </ConnectedRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
