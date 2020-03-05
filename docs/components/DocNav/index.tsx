import * as React from "react";
import { NavLink } from "react-router-dom";
import routes from "../../routes";
import { Nav } from "reap-ui";

interface Props {
    onItemClick?: (evt: React.MouseEvent<HTMLElement>) => void;
}

export default (props: Props) => {
    const {
        onItemClick
    } = props;
    const handleClick = (evt: React.MouseEvent<HTMLElement>) => {
        onItemClick && onItemClick(evt);
    };

    return (
        <aside className="aside-nav">
            <Nav variant="pill" vertical>
                {
                    routes.map(
                        item => (
                            <Nav.Item key={item.path}>
                                <NavLink
                                    onClick={handleClick}
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