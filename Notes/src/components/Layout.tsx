import * as React from 'react'
import {Link} from 'react-router'
import {connect} from "react-redux";
import {GlobalState} from "./store";
import {} from 'fetcj'

interface LayoutDataProps {

}

interface LayoutActionProps {
    onComponentMount: () => void
}

type LayoutProps = LayoutDataProps & LayoutActionProps;

class LayoutUI extends React.Component<LayoutProps, {}> {
    componentDidMount() {
        this.props.onComponentMount();
    }

    render() {
        return <div className="appContainer">
            <header>
                <Link to="/">
                    Notes
                </Link>
            </header>
            <div className="app-content row">{this.props.children}</div>
            <footer>
                Notes ReactJS - Projekt NTR Hubert Legęć
            </footer>
        </div>
    }
}

function mapStateToProps(state:GlobalState) : LayoutDataProps {
    return state;
}

function mapDispatchToProps(dispatch:any) : LayoutActionProps {
    return {
        onComponentMount() {
            fetch('catalogs')
                .then((response:any) => response.json())
                .then((data:any) => {
                    dispatch({
                        type: 'SET_CATALOGS',
                        catalogs: data
                    })
            });
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LayoutUI);