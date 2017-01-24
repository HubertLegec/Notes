import * as React from 'react';
import * as ReactDOM from 'react-dom';
import AppRoutes from "./components/AppRoutes";
import {Provider} from 'react-redux';
import './scss/style.scss';
import {store} from './components/store';


ReactDOM.render(
    <Provider store={store}><AppRoutes /></Provider>,
    document.getElementById("root")
);