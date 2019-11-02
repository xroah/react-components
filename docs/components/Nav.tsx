import * as React from "react";
import {NavLink} from "react-router-dom";
import {ROUTES} from "../routes";

export default class Nav extends React.Component {

    render() {
        return (
            <aside className="col-md-3">
                <ul className="nav nav-pills flex-column">
                    {
                        ROUTES.map(
                            item => (
                                <li className="nav-item" key={item.path}>
                                    <NavLink
                                        className="nav-link"
                                        to={item.path}>{item.name}</NavLink>
                                </li>
                            )
                        )
                    }
                </ul>
            </aside>
        );
    }

}