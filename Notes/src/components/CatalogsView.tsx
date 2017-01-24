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
        this.props.addCatalog(catalog);
    }

    private setNewCatalogName(e:any) {
        const newName = e.target.value;
        this.setState(_.assign({}, this.state, {newCatalogName: newName}));
    }

    render() {
        const {catalogs=[] as [Catalog]} = this.props;
        return <div className="catalog-container">
            <div className="add-catalog">
                <input type="text" onChange={(e) => this.setNewCatalogName(e)} />
                <button onClick={() => this.onAddCatalog()}>Dodaj</button>
            </div>
            <table className="catalog-table">
                <thead>
                    <tr>
                        <th>Katalogi</th>
                        <th/>
                    </tr>
                </thead>
                <tbody>
                {catalogs.map((catalog, idx) =>
                    <tr onClick={() => this.props.onCatalogClick(catalog.id)}>
                        <td>{catalog.name}</td>
                        <td onClick={() => this.props.removeCatalog(catalog.id)}>remove</td>
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
