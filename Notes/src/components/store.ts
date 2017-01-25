import {createStore, combineReducers, compose, applyMiddleware, Middleware} from 'redux';
import {syncHistoryWithStore, routerMiddleware} from 'react-router-redux';
import {hashHistory} from 'react-router';
import thunkMiddleware from 'redux-thunk';
import Catalog from "../model/Catalog";
import * as _ from 'lodash';
import Note from "../model/Note";
import {routerReducer} from 'react-router-redux';

export interface GlobalState {
    catalogs: [Catalog],
    selectedCatalog:number,
    selectedNote:number
}

const initialNoteState: GlobalState = {
    catalogs: [] as [Catalog],
    selectedCatalog: undefined,
    selectedNote: undefined
};

const catalogReducer = function (state = initialNoteState, action:any) {
    switch (action.type) {
        case 'SELECT_NOTE':
            return _.assign({}, state, {selectedNote: action.note});
        case 'SELECT_CATALOG':
            const selectedCat = action.catalog === state.selectedCatalog ? undefined : action.catalog;
            return _.assign({}, state, {selectedCatalog: selectedCat});
        case 'ADD_CATALOG':
            const id = findNewCatalogId(state.catalogs);
            const catalog = action.catalog;
            catalog.id = id;
            saveCatalogInDb(catalog);
            return _.assign({}, state, {catalogs: _.concat(state.catalogs, catalog)});
        case 'REMOVE_CATALOG':
            const selectedCatalog = action.catalog === state.selectedCatalog ? undefined : state.selectedCatalog;
            const updatedCatalogs = _.filter(state.catalogs, (c:Catalog) => c.id != action.catalog);
            return _.assign({}, state, {catalogs: updatedCatalogs, selectedCatalog});
        case 'SAVE_NOTE':
            const catalogs = state.catalogs;
            saveNote(action.note, state.selectedCatalog, catalogs);
            return _.assign({}, state, {catalogs});
        case 'REMOVE_NOTE':
            const cat = state.catalogs;
            deleteNote(action.note, state.selectedCatalog, cat);
            return _.assign({}, state, {catalogs: cat});
        case 'SET_CATALOGS':
            return _.assign({}, state, {catalogs: action.catalogs, selectedCatalog: undefined, selectedNote: undefined});
    }
    return state;
};

const reducer = combineReducers({
    routing: routerReducer,
    catalogs: catalogReducer
});

const historyType = hashHistory;
export const store = createStore(reducer, compose(
    applyMiddleware(
        thunkMiddleware,
        routerMiddleware(historyType) as Middleware
    ),
    (window as any)['devToolsExtension'] ? (window as any)['devToolsExtension']() : (f:any) => f
));

export const history = syncHistoryWithStore(historyType, store);



function deleteNote(noteId:number, catalogId:number, catalogs: [Catalog]) {
    const catalog = _.find(catalogs, (c:Catalog) => c.id === catalogId);
    catalog.removeNote(noteId);
}

function findNewCatalogId(catalogs:[Catalog]):number {
    const ids = _.map(catalogs, (c:Catalog) => c.id);
    const maxId = _.max(ids);
    return maxId == undefined ? 0 : maxId + 1;
}

function findNewNoteId(catalogs: [Catalog]):number {
    const ids = _.chain(catalogs)
        .map((c:Catalog) => c.notes)
        .flatten()
        .map((n:Note) => n.noteId)
        .value();
    const maxId = _.max(ids);
    return _.isFinite(maxId) ? maxId + 1 : 0;
}
function saveNote(note: Note, catalogId:number, catalogs: [Catalog]): boolean {
    const catalog = _.find(catalogs, (c:Catalog) => c.id === catalogId);
    if (catalog == undefined) {
        return false;
    }
    if (_.isFinite(note.noteId)) {
        const oldNote = _.find(catalog.notes, (n:Note) => n.noteId == note.noteId);
        oldNote.title = note.title;
        oldNote.content = note.content;
        oldNote.date = note.date;
    } else {
        note.noteId = findNewNoteId(catalogs);
        catalog.addNote(note);
    }
}

function saveCatalogInDb(catalog:Catalog) {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    fetch('catalog', {
        method: 'POST',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default',
        body: JSON.stringify(catalog)
    } as any);
}
