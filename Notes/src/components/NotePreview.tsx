import * as React from 'react';
import Note from "../model/Note";


interface NotePreviewProps {
    note: Note,
    onClick: (noteId:number) => void,
    onDelete: (noteId:number) => void
}

interface NotePreviewState {

}

export default class NotePreview extends React.Component<NotePreviewProps, NotePreviewState> {
    render() {
        const {note, onClick, onDelete} = this.props;
        return <tr onClick={() => onClick(note.id)}>
            <td>{note.title}</td>
            <td>{note.date}</td>
            <td onClick={() => onDelete(note.id)}>remove</td>
        </tr>
    }
}
