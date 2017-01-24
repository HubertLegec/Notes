import * as React from 'react';
import {Route, IndexRoute, Router} from 'react-router'
import Layout from "./Layout";
import MainPage from "./MainPage";
import {NoteView} from "./NoteView";
import {history} from './store';


const routes = <Route path="/" component={Layout}>
    <IndexRoute component={MainPage}/>
    <Route path="note" component={NoteView}/>
</Route>;

export default class AppRoutes extends React.Component<{}, {}> {
    render() {
        return <Router history={history} routes={routes} onUpdate={() => window.scrollTo(0, 0)}/>
    }
};
