import * as React from 'react'
import {Link} from 'react-router'


export default class Layout extends React.Component<{}, {}> {
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