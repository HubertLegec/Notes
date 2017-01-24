import * as React from 'react';
import Note from "../model/Note";
import NotePreview from "./NotePreview";
import * as _ from 'lodash';
import Catalog from "../model/Catalog";
import {connect} from "react-redux";
import {Link} from "react-router";
import {push} from 'react-router-redux';

interface NoteListViewDataProps {
    notes: [Note]
    categorySelected: boolean,
    notesSize: number
}

interface NoteListEventProps {
    onClick: (noteId: number) => void,
    onDelete: (noteId: number) => void
}

type NoteListViewProps = NoteListViewDataProps & NoteListEventProps;

interface NoteListViewState {
    filter: string
}

export class NoteListViewUI extends React.Component<NoteListViewProps, NoteListViewState> {

    constructor(props: NoteListViewProps) {
        super(props);
        this.state = {
            filter: ""
        };
    }

    onFilterChange(e: any) {
        const newVal = e.target.value;
        this.setState(_.assign({}, this.state, {filter: newVal}));
    }

    render() {
        const {onClick, onDelete, categorySelected, notes} = this.props;
        const visibleNotes = _.filter(
            notes,
            (n: Note) => _.includes(_.toLower(n.title), _.toLower(this.state.filter))
        );
        console.log('notesIn', notes, visibleNotes);
        return categorySelected ?
            <div className="note-list col-sm-8">
                <div className="note-list-header row">
                    <div className="col-sm-2">Filtruj</div>
                    <input className="col-sm-6" type="text" onChange={(e) => this.onFilterChange(e)}/>
                    <div className="col-sm-4 add-note-container">
                        <button><Link to="note">Dodaj</Link></button>
                    </div>
                </div>
                <table className="table table-stripped table-hover">
                    <thead>
                    <tr>
                        <th className="col-sm-8">Tytuł</th>
                        <th className="col-sm-3">Data</th>
                        <th className="col-sm-1"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {visibleNotes.map((note, idx) =>
                        <NotePreview key={idx} note={note} onClick={onClick} onDelete={() => onDelete(note.noteId)}/>
                    )}
                    </tbody>
                </table>
            </div> :
            <div className="note-list-placeholder col-sm-8">
                <div>Zaznacz katalog</div>
            </div>
    }
}

function mapStateToProps(state: any): NoteListViewDataProps {
    const catalog = _.find(state.catalogs.catalogs, (c: Catalog) => c.id === state.catalogs.selectedCatalog);
    const notes = _.get(catalog, ['notes'], [] as [Note]);
    return {
        notes,
        categorySelected: _.isFinite(state.catalogs.selectedCatalog),
        notesSize: notes.length
    };
}

function mapDispatchToProps(dispatch: any): NoteListEventProps {
    return {
        onClick(id: number) {
            dispatch({
                type: "SELECT_NOTE",
                note: id
            });
            dispatch(push('note'))
        },
        onDelete(id: number) {
            dispatch({
                type: "REMOVE_NOTE",
                note: id
            });
        }
    }
}

export const NoteListView = connect(
    mapStateToProps,
    mapDispatchToProps
)(NoteListViewUI);