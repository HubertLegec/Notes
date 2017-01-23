import * as React from 'react';
import Note from "../model/Note";
import * as _ from 'lodash';
import DataStorage, {storage} from "../model/DataStorage";

interface NoteViewProps {
}

interface NoteViewState {
    title: string,
    content: string,
    date: Date,
    storage:DataStorage
}

export default class NoteView extends React.Component<NoteViewProps, NoteViewState> {

    constructor(props:NoteViewProps) {
        super(props);
        this.state = {
            title: "",
            content: "",
            date: new Date(),
            storage
        };
    }

    private setTitle(e:any) {
        let newTitle = e.target.value;
        this.setState(_.assign({}, this.state, {title: newTitle}));
    }

    private setContent(e:any) {
        let newContent = e.target.value;
        this.setState(_.assign({}, this.state, {content: newContent}));
    }

    private onSave() {
        let note = new Note();
        note.title = this.state.title;
        note.content = this.state.content;
        note.date = this.state.date;
        const storage = this.state.storage;
        storage.addNote(note, 1);
        this.setState(_.assign({}, this.state, {storage}))
    }

    private onAbort() {
        window.location.href = "/";
    }

    render() {
        return <div className="note-view">
            <input type="text" value={this.state.title} onChange={this.setTitle} />
            <textarea value={this.state.content} onChange={this.setContent} />
        </div>
    }
}
