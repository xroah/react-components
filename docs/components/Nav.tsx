import * as React from "react";
import {NavLink} from "react-router-dom";

export default class Nav extends React.Component {

    render() {
        return (
            <aside className="col-md-3">
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <NavLink to="/components/alert">Alert</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/components/Button">Button</NavLink>
                    </li>
                </ul>
            </aside>
        );
    }

}