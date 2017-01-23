import * as React from 'react';
import CatalogsView from './CatalogsView';
import NoteListView from './NoteListView';

interface MainPageProps {

}

interface MainPageState {

}

export default class MainPage extends React.Component<MainPageProps, MainPageState> {
    render() {
        return <div className="main-page">
            <CatalogsView/>
            <NoteListView/>
        </div>
    }
}