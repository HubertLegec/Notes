import * as React from 'react';
import Note from "../model/Note";
import * as _ from 'lodash';
import {connect} from "react-redux";
import {push} from 'react-router-redux';
import Catalog from "../model/Catalog";

interface NoteViewDataProps {
    selectedCategory: number
    note: Note
}

interface NoteViewEventProps {
    onSave: (note: Note) => void
    onCancel: () => void
}

type NoteViewProps = NoteViewDataProps & NoteViewEventProps;

interface NoteViewState {
    title: string,
    content: string,
    date: Date,
    id: number
}

class NoteViewUI extends React.Component<NoteViewProps, NoteViewState> {

    constructor(props: NoteViewProps) {
        super(props);
        let title = "";
        let content = "";
        let date = new Date();
        let id = undefined;
        if (props.note != undefined) {
            title = props.note.title;
            content = props.note.content;
            date = props.note.date;
            id = props.note.noteId;
        }
        this.state = {
            title,
            content,
            date,
            id
        };
    }

    private setTitle(e: any) {
        let newTitle = e.target.value;
        this.setState(_.assign({}, this.state, {title: newTitle}));
    }

    private setContent(e: any) {
        let newContent = e.target.value;
        this.setState(_.assign({}, this.state, {content: newContent}));
    }

    private onSave() {
        let note = new Note();
        note.title = this.state.title;
        note.content = this.state.content;
        note.date = this.state.date;
        note.noteId = this.state.id;
        this.setState(_.assign({}, this.state, {id: undefined, title: "", content: "", date: undefined}));
        this.props.onSave(note);
    }

    private onCancel() {
        this.setState(_.assign({}, this.state, {id: undefined, title: "", content: "", date: undefined}));
        this.props.onCancel();
    }

    render() {
        return <div className="note-view col-sm-12">
            <div className="note-view-header">
                <button className="cancel-button" onClick={() => this.onCancel()}>Anuluj</button>
                <button onClick={() => this.onSave()}
                        disabled={_.isEmpty(this.state.title) || _.isEmpty(this.state.content)}>Zapisz
                </button>
            </div>
            <div className="title-row">
                <div className="col-sm-2 title-name">Tytuł</div>
                <input className="col-sm-10" type="text" value={this.state.title}
                       onChange={this.setTitle.bind(this)}/>
            </div>
            <div className="content-row">
                <textarea className="note-content" value={this.state.content} onChange={this.setContent.bind(this)}/>
            </div>
        </div>
    }
}

function mapStateToProps(state: any): NoteViewDataProps {
    const note = _(state.catalogs.catalogs)
        .map((c: Catalog) => c.notes)
        .flatten()
        .filter((n: Note) => n.noteId == state.catalogs.selectedNote)
        .head() as Note;
    return {
        selectedCategory: state.catalogs.selectedCatalog,
        note
    }
}

function mapDispatchToProps(dispatch: any): NoteViewEventProps {
    return {
        onSave(note: Note) {
            dispatch({
                type: "SAVE_NOTE",
                note
            });
            dispatch(push('/'))
        },
        onCancel() {
            dispatch({
                type: "SELECT_NOTE"
            });
            dispatch(push('/'))
        }
    }
}

export const NoteView = connect(
    mapStateToProps,
    mapDispatchToProps
)(NoteViewUI);