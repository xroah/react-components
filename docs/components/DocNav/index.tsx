import * as React from "react";
import { NavLink } from "react-router-dom";
import routes from "../../routes";
import { Nav } from "reap-ui";

export default function DocNav() {
    return (
        <aside>
            <Nav variant="pill" vertical>
                {
                    routes.map(
                        item => (
                            <Nav.Item key={item.path}>
                                <NavLink
                                    className="nav-link"
                                    to={item.path}>
                                    {item.name}
                                </NavLink>
                            </Nav.Item>
                        )
                    )
                }
            </Nav>
        </aside>
    );
}