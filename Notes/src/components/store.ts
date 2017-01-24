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
            return _.assign({}, state, {selectedCatalog: action.catalog});
        case 'ADD_CATALOG':
            const id = findNewCatalogId(state.catalogs);
            const catalog = action.catalog;
            catalog.id = id;
            return _.assign({}, state, {catalogs: _.concat(state.catalogs, catalog)});
        case 'REMOVE_CATALOG':
            const updatedCatalogs = _.filter(state.catalogs, (c:Catalog) => c.id != action.catalog);
            return _.assign({}, state, {catalogs: updatedCatalogs});
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

function addNote(note:Note, catalogId:number): boolean {
    const catalog = _.find(this._catalogs, (c:Catalog) => c.id === catalogId);
    if (catalog == undefined) {
        return false;
    }
    note.id = this.findNewNoteId();
    catalog.addNote(note);
}

function deleteNote(noteId:number, catalogId:number) {
    const catalog = _.find(this._catalogs, (c:Catalog) => c.id === catalogId);
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
        .map((n:Note) => n.id)
        .value();
    const maxId = _.max(ids);
    return maxId == undefined ? 0 : maxId + 1;
}