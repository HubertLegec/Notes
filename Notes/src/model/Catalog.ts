import Note from "./Note";
import * as _ from 'lodash';


export default class Catalog {
    public id: number;
    public name: string;
    public notes: [Note] = [] as [Note];

}

