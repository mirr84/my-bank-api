import React from 'react';
import ReactDOM from 'react-dom';

import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import {HashRouter as Router} from 'react-router-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './store/reducers/index';
import axios from "axios";
import {getStorage} from "./store/utils/getStorage";
import {LocaleProvider} from 'antd';
import ruRU from 'antd/lib/locale-provider/ru_RU';
import 'moment/locale/ru';

import App from './app/App';

import './index.css';

const store = createStore(reducer);
export default store;
store.subscribe(() => getStorage().storage.setItem('store', JSON.stringify(store.getState())));

axios.interceptors.request.use(
    (config) => {
        config.headers.token = store.getState().authReducer.token;
        return Promise.resolve(config);
    }
);

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <LocaleProvider locale={ruRU}>
                <App/>
            </LocaleProvider>
        </Router>
    </Provider>,
    document.getElementById('root')
);

