

export default class Note {
    private _id: number;
    private _title: string;
    private _date: Date;
    private _content: string;


    get title(): string {
        return this._title;
    }

    set title(value: string) {
        this._title = value;
    }

    get content(): string {
        return this._content;
    }

    set content(value: string) {
        this._content = value;
    }

    get date(): Date {
        return this._date;
    }

    set date(value: Date) {
        this._date = value;
    }


    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }
}