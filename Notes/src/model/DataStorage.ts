import Catalog from "./Catalog";
import * as _ from 'lodash';
import Note from "./Note";

export default class DataStorage {
    private _catalogs: [Catalog] = [] as [Catalog];


    get catalogs(): [Catalog] {
        return this._catalogs;
    }

    addCatalog(catalog:Catalog) {
        catalog.id = this.findNewCatalogId();
        this._catalogs.push(catalog);
    }

    deleteCatalog(id:number) {
        _.remove(this._catalogs, (c:Catalog) => c.id === id);
    }

    addNote(note:Note, catalogId:number): boolean {
        const catalog = _.find(this._catalogs, (c:Catalog) => c.id === catalogId);
        if (catalog == undefined) {
            return false;
        }
        note.id = this.findNewNoteId();
        catalog.addNote(note);
    }

    deleteNote(noteId:number, catalogId:number) {
        const catalog = _.find(this._catalogs, (c:Catalog) => c.id === catalogId);
        catalog.removeNote(noteId);
    }

    private findNewCatalogId():number {
        const ids = _.map(this._catalogs, (c:Catalog) => c.id);
        const maxId = _.max(ids);
        return maxId == undefined ? 0 : maxId + 1;
    }

    private findNewNoteId():number {
        const ids = _.chain(this._catalogs)
            .map((c:Catalog) => c.notes)
            .flatten()
            .map((n:Note) => n.id)
            .value();
        const maxId = _.max(ids);
        return maxId == undefined ? 0 : maxId + 1;
    }

};

export const storage = new DataStorage();

