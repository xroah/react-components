import React from "react"
import { NavLink, Outlet } from "react-router-dom"
import BackToTop from "r-components/back-to-top"
import Button from "r-components/basics/button"

export default function Examples() {
    return (
        <div className="examples-wrapper">
            <div className="examples-list">
                <NavLink to="/components/alert">Alert</NavLink>
                <NavLink to="/components/Collapse">Collapse</NavLink>
                <NavLink to="/components/loading">Loading</NavLink>
                <NavLink to="/components/modal">Modal</NavLink>
                <NavLink to="/components/offcanvas">OffCanvas</NavLink>
                <NavLink to="/components/popover">Popover</NavLink>
                <NavLink to="/components/popup">Popup</NavLink>
                <NavLink to="/components/toast">Toast</NavLink>
                <NavLink to="/components/tooltip">Tooltip</NavLink>
            </div>
            <div className="example-details">
                <Outlet />
            </div>
            <BackToTop>
                <Button variant="secondary">Top</Button>
            </BackToTop>
        </div>
    )
}