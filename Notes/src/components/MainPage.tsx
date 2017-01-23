import * as React from 'react';
import CatalogsView from './CatalogsView';
import NoteListView from './NoteListView';
import Catalog from "../model/Catalog";
import * as _ from 'lodash';
import Note from "../model/Note";

interface MainPageProps {
    catalogs: [Catalog],
    selectedCatalog:number,
    addCatalog: (catalog:Catalog) => void,
    removeCatalog: (id:number) => void,
    onCatalogClick: (id:number) => void,
    onNoteClick: (id:number) => void,
    onDeleteNote: (id:number) => void
}

interface MainPageState {

}

export default class MainPage extends React.Component<MainPageProps, MainPageState> {
    render() {
        const {catalogs, selectedCatalog, addCatalog, removeCatalog, onCatalogClick, onNoteClick, onDeleteNote} = this.props;
        const notes = _.chain(catalogs)
            .filter((c:Catalog) => c.id === selectedCatalog)
            .map((c:Catalog) => c.notes)
            .head() as [Note];
        return <div className="main-page">
            <CatalogsView
                catalogs={catalogs}
                selectedCatalog={selectedCatalog}
                addCatalog={addCatalog}
                removeCatalog={removeCatalog}
                onCatalogClick={onCatalogClick}/>
            <NoteListView
                notes={notes}
                onClick={onNoteClick}
                onDelete={onDeleteNote}/>
        </div>
    }
}