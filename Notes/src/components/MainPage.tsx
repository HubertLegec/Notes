import * as React from 'react';
import CatalogsView from './CatalogsView';
import NoteListView from './NoteListView';
import Catalog from "../model/Catalog";
import * as _ from 'lodash';
import Note from "../model/Note";
import DataStorage, {storage} from "../model/DataStorage";

interface MainPageProps {
}

interface MainPageState {
    selectedCatalog:number,
    selectedNote:number,
    catalogs: [Catalog]
}

export default class MainPage extends React.Component<MainPageProps, MainPageState> {
    private storage: DataStorage;

    constructor(props:MainPageProps) {
        super(props);
        this.storage = storage;
        this.state = {
            selectedCatalog: undefined,
            selectedNote: undefined,
            catalogs: storage.catalogs
        };
    }

    onNoteClick(id:number) {
        this.setState(_.assign({}, this.state, {selectedNote: id}));
    }

    onCatalogClick(id:number) {
        this.setState(_.assign({}, this.state, {selectedCatalog: id}));
    }

    addCatalog(catalog:Catalog) {
        storage.addCatalog(catalog);
        this.setState(_.assign({}, this.state, {catalogs: storage.catalogs}));
        console.log('add catalog', catalog);
    }

    removeCatalog(id:number) {
        storage.deleteCatalog(id);
        this.setState(_.assign({}, this.state, {catalogs: storage.catalogs}));
        console.log('delete catalog', id);
    }

    deleteNote(id:number) {
        storage.deleteNote(id, this.state.selectedCatalog);
        console.log('delete note', id);
    }

    render() {
        const catalogs = this.state.catalogs;
        const selectedCatalog = this.state.selectedCatalog;
        const notes = _.chain(catalogs)
            .filter((c:Catalog) => c.id === selectedCatalog)
            .map((c:Catalog) => c.notes)
            .head() as [Note];
        return <div className="main-page">
            <CatalogsView
                catalogs={catalogs}
                selectedCatalog={selectedCatalog}
                addCatalog={this.addCatalog.bind(this)}
                removeCatalog={this.removeCatalog.bind(this)}
                onCatalogClick={this.onCatalogClick.bind(this)}/>
            <NoteListView
                notes={notes}
                onClick={this.onNoteClick.bind(this)}
                onDelete={this.deleteNote.bind(this)}/>
        </div>
    }
}