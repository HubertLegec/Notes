import * as React from 'react';
import Catalog from "../model/Catalog";
import * as _ from 'lodash';

interface CatalogsViewProps {
    catalogs: [Catalog]
    selectedCatalog: number,
    onCatalogClick: (id:number) => void,
    addCatalog: (catalog: Catalog) => void,
    removeCatalog: (id:number) => void
}

interface CatalogsViewState {
    newCatalogName: string
}


export default class CatalogsView extends React.Component<CatalogsViewProps, CatalogsViewState> {

    constructor(props:CatalogsViewProps) {
        super(props);
        this.state = {
            newCatalogName: ""
        };
    }

    private onRemoveCatalogClick(id: number) {
        this.props.removeCatalog(id);
    }

    private onAddCatalog(){
        let catalog = new Catalog();
        catalog.name = this.state.newCatalogName;
        this.props.addCatalog(catalog);
    }

    private setNewCatalogName(e:any) {
        const newName = e.target.value;
        this.setState(_.assign({}, this.state, {newCatalogName: newName}));
    }

    render() {
        const {catalogs} = this.props;
        return <div className="groups-container">
            <table className="groups-table">
                <thead>
                    <tr>
                        <th>Katalogi</th>
                        <th/>
                    </tr>
                </thead>
                <tbody>
                {catalogs.map((catalog, idx) =>
                    <tr>
                        <td>{catalog.name}</td>
                        <td onClick={() => this.onRemoveCatalogClick(catalog.id)}>remove</td>
                    </tr>
                )}
                </tbody>
            </table>
            <div className="add-group">
                <input type="text" onChange={this.setNewCatalogName} />
                <button onClick={() => this.onAddCatalog()}>Dodaj</button>
            </div>
        </div>
    }
}
