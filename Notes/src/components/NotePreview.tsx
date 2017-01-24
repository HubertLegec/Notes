import * as React from 'react';
import Note from "../model/Note";
import * as moment from 'moment';


interface NotePreviewProps {
    note: Note,
    onClick: (id:number) => void,
    onDelete: (id:number) => void
}

export default class NotePreview extends React.Component<NotePreviewProps, {}> {
    render() {
        const {note, onClick, onDelete} = this.props;
        return <tr onClick={() => onClick(note.noteId)}>
            <td className="sm-col-8">{note.title}</td>
            <td className="sm-col-2">{moment(note.date).format('DD/MM/YYYY HH:mm')}</td>
            <td className="sm-col-2 glyphicon glyphicon-trash" onClick={(e) => {
                e.stopPropagation();
                onDelete(note.noteId);
            }} />
        </tr>
    }
}
