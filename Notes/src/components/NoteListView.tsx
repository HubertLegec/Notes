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
    categorySelected: boolean
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

        return categorySelected ?
            <div className="note-list">
                <div className="note-list-header">
                    <div>Filtruj</div>
                    <input type="text" onChange={(e) => this.onFilterChange(e)}/>
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
                    {visibleNotes.map((note, idx) =>
                        <NotePreview key={idx} note={note} onClick={onClick} onDelete={() => onDelete(note.noteId)}/>
                    )}
                    </tbody>
                </table>
            </div> :
            <div className="note-list-placeholder">
                <div>Zaznacz katalog</div>
            </div>
    }
}

function mapStateToProps(state: any): NoteListViewDataProps {
    const catalog = _.find(state.catalogs.catalogs, (c:Catalog) => c.id === state.catalogs.selectedCatalog);
    console.log('catalog', catalog, state.catalogs.selectedCatalog);
    return {
        notes: catalog ? catalog.notes : [] as [Note],
        categorySelected: _.isFinite(state.catalogs.selectedCatalog)
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