import Note from "./Note";
import * as _ from 'lodash';


export default class Catalog {
    private _name: string;
    private _notes: [Note] = [] as [Note];


    get name(): string {
        return this._name;
    }

    get notes(): [Note] {
        return this._notes;
    }


    set name(value: string) {
        this._name = value;
    }

    addNote(note: Note) {
        this._notes.push(note);
    }

    removeNote(noteId: number) {
        _.remove(this._notes, (n:Note) => n.id == noteId);
    }
}

