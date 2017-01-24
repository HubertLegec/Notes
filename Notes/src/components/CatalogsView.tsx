import * as React from 'react';
import Catalog from "../model/Catalog";
import * as _ from 'lodash';
import {connect} from "react-redux";

interface CatalogsViewDataProps {
    catalogs: [Catalog]
    selectedCatalog: number,
}

interface CatalogsViewEventProps {
    onCatalogClick: (id:number) => void,
    addCatalog: (catalog: Catalog) => void,
    removeCatalog: (id:number) => void
}

type CatalogsViewProps = CatalogsViewDataProps & CatalogsViewEventProps;

interface CatalogsViewState {
    newCatalogName: string
}


class CatalogsViewUI extends React.Component<CatalogsViewProps, CatalogsViewState> {

    constructor(props:CatalogsViewProps) {
        super(props);
        this.state = {
            newCatalogName: ""
        };
    }

    private onAddCatalog(){
        let catalog = new Catalog();
        catalog.name = this.state.newCatalogName;
        this.setState(_.assign({}, this.state, {newCatalogName: ""}));
        this.props.addCatalog(catalog);
    }

    private setNewCatalogName(e:any) {
        const newName = e.target.value;
        this.setState(_.assign({}, this.state, {newCatalogName: newName}));
    }

    render() {
        const {catalogs=[] as [Catalog]} = this.props;
        return <div className="catalog-container col-sm-4">
            <div className="add-catalog row">
                <input value={this.state.newCatalogName} className="col-sm-8" type="text" onChange={(e) => this.setNewCatalogName(e)} />
                <button className="add-cat-button col-sm-3" onClick={() => this.onAddCatalog()} disabled={_.isEmpty(this.state.newCatalogName)}>Dodaj</button>
            </div>
            <table className="catalog-table table table-stripped table-hover">
                <thead>
                    <tr>
                        <th>Katalogi</th>
                        <th/>
                    </tr>
                </thead>
                <tbody>
                {catalogs.map((catalog, idx) =>
                    <tr key={idx} onClick={() => this.props.onCatalogClick(catalog.id)}>
                        <td className="col-sm-11">{catalog.name}</td>
                        <td className="col-sm-1 glyphicon glyphicon-trash" onClick={(e) => {
                            e.stopPropagation();
                            this.props.removeCatalog(catalog.id);}} />
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    }
}

function mapStateToProps(state:any) : CatalogsViewDataProps {
    return {
        catalogs: state.catalogs.catalogs,
        selectedCatalog: state.catalogs.selectedCatalog
    }
}

function mapDispatchToProps(dispatch:any) : CatalogsViewEventProps {
    return {
        onCatalogClick(id:number) {
            dispatch({
               type: "SELECT_CATALOG",
                catalog: id
            });
        },
        removeCatalog(id:number) {
            dispatch({
               type: "REMOVE_CATALOG",
                catalog: id
            });
        },
        addCatalog(catalog:Catalog) {
            dispatch({
               type: "ADD_CATALOG",
                catalog
            });
        }
    };
}

export const CatalogsView = connect(
    mapStateToProps,
    mapDispatchToProps
)(CatalogsViewUI);
