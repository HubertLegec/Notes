import * as React from 'react';
import Note from "../model/Note";


interface NotePreviewProps {
    note: Note,
    onClick: (id:number) => void,
    onDelete: (id:number) => void
}

export default class NotePreview extends React.Component<NotePreviewProps, {}> {
    render() {
        const {note, onClick, onDelete} = this.props;
        return <tr onClick={() => onClick(note.noteId)}>
            <td>{note.title}</td>
            <td>{note.date.toISOString().split('T')[0]}</td>
            <td onClick={() => onDelete(note.noteId)}>remove</td>
        </tr>
    }
}
