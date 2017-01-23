import * as React from 'react'
import {Link} from 'react-router'

interface LayoutProps {

}

interface LayoutState {

}

export default class Layout extends React.Component<LayoutProps, LayoutState> {
    render() {
        return <div className="appContainer">
            <header>
                <Link to="/">
                    Notes
                </Link>
            </header>
            <div className="app-content">{this.props.children}</div>
            <footer>
                Notes ReactJS - NTR Project Hubert Legec
            </footer>
        </div>
    }
}