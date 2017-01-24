import * as React from 'react';
import Note from "../model/Note";
import * as _ from 'lodash';
import {Link} from "react-router";
import {connect} from "react-redux";
import {push} from 'react-router-redux';
import Catalog from "../model/Catalog";

interface NoteViewDataProps {
    selectedCategory: number
    note: Note
}

interface NoteViewEventProps {
    onSave: (note: Note) => void
}

type NoteViewProps = NoteViewDataProps & NoteViewEventProps;

interface NoteViewState {
    title: string,
    content: string,
    date: Date
}

class NoteViewUI extends React.Component<NoteViewProps, NoteViewState> {

    constructor(props: NoteViewProps) {
        super(props);
        let title = "";
        let content = "";
        let date = new Date();
        if (props.note != undefined) {
            title = props.note.title;
            content = props.note.content;
            date = props.note.date;
        }
        this.state = {
            title,
            content,
            date
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
        this.props.onSave(note);
    }

    render() {
        return <div className="note-view">
            <div className="note-view-header">
                <button><Link to="/">Anuluj</Link></button>
                <button onClick={() => this.onSave()}>Zapisz</button>
            </div>
            <input type="text" value={this.state.title} onChange={this.setTitle.bind(this)}/>
            <textarea value={this.state.content} onChange={this.setContent.bind(this)}/>
        </div>
    }
}

function mapStateToProps(state: any): NoteViewDataProps {
    const note = _(state.catalogs.catalogs)
        .map((c:Catalog) => c.notes)
        .flatten()
        .filter((n:Note) => n.noteId == state.catalogs.selectedNote)
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
        }
    }
}

export const NoteView = connect(
    mapStateToProps,
    mapDispatchToProps
)(NoteViewUI);