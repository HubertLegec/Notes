import * as React from 'react';
import Note from "../model/Note";
import NotePreview from "./NotePreview";
import * as _ from 'lodash';
import Catalog from "../model/Catalog";
import {connect} from "react-redux";
import {Link} from "react-router";

interface NoteListViewDataProps {
    notes: [Note]
}

interface NoteListEventProps {
    onClick: (noteId:number) => void,
    onDelete: (noteId:number) => void
}

type NoteListViewProps = NoteListViewDataProps & NoteListEventProps;

interface NoteListViewState {

}

export class NoteListViewUI extends React.Component<NoteListViewProps, NoteListViewState> {

    render() {
        const {notes, onClick, onDelete} = this.props;
        return <div className="note-list">
            <div className="note-list-header">
                <div>Filtruj</div>
                <input type="text" />
                <div>
                    <button><Link to="note">Dodaj</Link></button>
                </div>
            </div>
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

function mapStateToProps(state:any) : NoteListViewDataProps {
    const notes = _.chain(state.catalogs.catalogs)
        .filter((c:Catalog) => c.id == state.catalogs.selectedCatalog)
        .map((c:Catalog) => c.notes)
        .head() as [Note];
    return {
        notes
    };
}

function mapDispatchToProps(dispatch:any) : NoteListEventProps {
    return {
        onClick(id:number) {
            dispatch({
                action: "SELECT_NOTE",
                note: id
            });
        },
        onDelete(id:number) {
            dispatch({
                action: "REMOVE_NOTE",
                note: id
            });
        }
    }
}

export const NoteListView = connect(
    mapStateToProps,
    mapDispatchToProps
)(NoteListViewUI);