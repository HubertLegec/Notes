import * as React from 'react';
import {CatalogsView} from './CatalogsView';
import {NoteListView} from './NoteListView';


export default class MainPage extends React.Component<{}, {}> {

    render() {
        return <div className="main-page">
            <CatalogsView />
            <NoteListView />
        </div>
    }
}