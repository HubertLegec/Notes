import * as React from 'react';
import Note from "../model/Note";
import NotePreview from "./NotePreview";

interface NoteListViewProps {
    notes: [Note]
    onClick: (noteId:number) => void,
    onDelete: (noteId:number) => void
}

interface NoteListViewState {

}

export default class NoteListView extends React.Component<NoteListViewProps, NoteListViewState> {

    render() {
        const {notes, onClick, onDelete} = this.props;
        return <div className="note-list">
            <table>
                <thead>
                <tr>
                    <th>Tytul</th>
                    <th>Data utworzenia</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {notes.map((note, idx) =>
                    <NotePreview note={note} onClick={onClick} onDelete={onDelete} />
                )}
                </tbody>
            </table>
        </div>
    }
}