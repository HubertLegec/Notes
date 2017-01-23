import * as React from 'react';
import {Route, IndexRoute, Router, hashHistory} from 'react-router'
import Layout from "./Layout";
import DataStorage from "../model/DataStorage";
import MainPage from "./MainPage";
import NoteView from "./NoteView";

const dataStorage = new DataStorage();

const routes = <Route path="/" component={Layout}>
    <IndexRoute component={MainPage}/>
    <Route path="note/:id" component={NoteView}/>
</Route>;

export default class AppRoutes extends React.Component<{}, {}> {
    render() {
        return <Router history={hashHistory} routes={routes} onUpdate={() => window.scrollTo(0, 0)} />
    }
}
